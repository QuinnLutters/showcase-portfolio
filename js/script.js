// Get canvas reference FIRST
const canvas = document.getElementById('halftone-canvas');
const ctx = canvas.getContext('2d');

let circles = [];
let settledCount = 0;
let animationStarted = false;
let canvasWidth = 0;
let canvasHeight = 0;

let mouseX = null;
let mouseY = null;
const HOVER_RADIUS = 80;

// --- GRID / SPATIAL INDEX ---
const GRID_CELL = 80;
let grid = {};        
let nearbySet = new Set(); 


let canvasBounds = canvas.getBoundingClientRect();

window.addEventListener("resize", () => {
    canvasBounds = canvas.getBoundingClientRect();
}); 

window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX - canvasBounds.left);
    mouseY = (e.clientY - canvasBounds.top);
});

const DOT_SCALE = 1.2;

window.addEventListener("load", () => {
    console.log("Page fully loaded");

    // Preload image first
    const preloadImg = new Image();
    preloadImg.src = "./assets/img/cutout-me.png";

    preloadImg.onload = () => {
        console.log("Animation image fully preloaded");

        // Run your processImage function with the loaded image
        processImage(preloadImg);

        // Start animation after 2s
        setTimeout(() => {
            animationStarted = true;
        }, 2000);
    };
});

function addToGrid(circle) {
    // Add circle to grid when it becomes settled
    const gx = Math.floor(circle.x / GRID_CELL);
    const gy = Math.floor(circle.y / GRID_CELL);
    const key = `${gx},${gy}`;
    if (!grid[key]) grid[key] = [];
    grid[key].push(circle);
    circle.gx = gx;
    circle.gy = gy;
    circle._gridKey = key;
}

function getNearbyCircles(x, y) {
    const gx = Math.floor(x / GRID_CELL);
    const gy = Math.floor(y / GRID_CELL);
    let result = [];
    for (let ix = -1; ix <= 1; ix++) {
        for (let iy = -1; iy <= 1; iy++) {
            const key = `${gx + ix},${gy + iy}`;
            if (grid[key]) {
                // append
                result = result.concat(grid[key]);
            }
        }
    }
    return result;
}

function processImage(img) {
    const dpr = window.devicePixelRatio || 1;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate scaled image dimensions first
    const scale = Math.min(
        (viewportWidth / img.width) * 1.5,
        (viewportHeight / img.height) * 1.5
    );
    const imgWidth = img.width * scale;
    const imgHeight = img.height * scale;

    // Make canvas large enough to contain the scaled image
    canvas.width = Math.max(viewportWidth, imgWidth) * dpr;
    canvas.height = Math.max(viewportHeight, imgHeight) * dpr;
    canvas.style.width = Math.max(viewportWidth, imgWidth) + 'px';
    canvas.style.height = Math.max(viewportHeight, imgHeight) + 'px';

    // Store canvas dimensions globally for animate() function
    canvasWidth = Math.max(viewportWidth, imgWidth);
    canvasHeight = Math.max(viewportHeight, imgHeight);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Center image within the canvas (not viewport)
    const offsetX = (canvasWidth - imgWidth) / 2;
    const offsetY = (canvasHeight - imgHeight) / 2;

    console.log(`Scaled image: ${imgWidth.toFixed(1)}×${imgHeight.toFixed(1)} at offset (${offsetX.toFixed(1)}, ${offsetY.toFixed(1)})`);

    // --- Draw to temporary canvas for halftone pixel reading ---
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = imgWidth;
    tempCanvas.height = imgHeight;

    tempCtx.imageSmoothingEnabled = false;
    tempCtx.drawImage(img, 0, 0, imgWidth, imgHeight);

    console.log({
        viewportWidth,
        viewportHeight,
        imgWidth,
        imgHeight,
        offsetX,
        offsetY,
        canvasWidth: canvas.width / dpr,
        canvasHeight: canvas.height / dpr
    });

    const imageData = tempCtx.getImageData(0, 0, imgWidth, imgHeight);
    const pixels = imageData.data;

    // gridSize controls DENSITY (number of dots)
    const gridSize = 4.5;
    const cols = Math.floor(imgWidth / gridSize);
    const rows = Math.floor(imgHeight / gridSize);

    let halftoneCircles = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = col * gridSize + gridSize / 2;
            const y = row * gridSize + gridSize / 2;

            const finalX = x + offsetX;
            const finalY = y + offsetY;

            const pixelX = Math.floor(x);
            const pixelY = Math.floor(y);
            const index = (pixelY * Math.floor(imgWidth) + pixelX) * 4;

            const r = pixels[index];
            const g = pixels[index + 1];
            const b = pixels[index + 2];
            const brightness = (r + g + b) / 3;

            // DOT_SCALE affects visual size, not density
            const maxRadius = (gridSize / 1.9) * DOT_SCALE;
            const radius = (brightness / 255) * maxRadius;

            if (radius > 0.5) {
                // Precompute grayscale fill for speed
                const grayValue = 255 - brightness;
                const fill = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
                halftoneCircles.push({
                    finalX: finalX,
                    finalY: finalY,
                    radius: radius,
                    brightness: brightness,
                    fill: fill
                });
            }
        }
    }

    console.log(`Halftone has ${halftoneCircles.length} visible circles`);

    // Rectangle starts VISIBLE on screen, then falls with wave effect
    const startGridSize = 20;
    const startCols = Math.ceil(canvasWidth / startGridSize);
    const startRows = Math.ceil(canvasHeight / startGridSize);

    const totalStartPositions = Math.max(startCols * startRows, halftoneCircles.length);

    for (let startIndex = 0; startIndex < totalStartPositions; startIndex++) {
        const startCol = startIndex % startCols;
        const startRow = Math.floor(startIndex / startCols);
        const startX = startCol * startGridSize + startGridSize / 2;
        const startY = startRow * startGridSize + startGridSize / 2;

        let halftone = null;
        if (startIndex < halftoneCircles.length) {
            halftone = halftoneCircles[startIndex];
        }

        const circle = {
            originalX: halftone ? halftone.finalX : canvasWidth + 200,
            originalY: halftone ? halftone.finalY : canvasHeight + 200,
            x: startX,
            y: startY,
            radius: halftone ? halftone.radius : (gridSize / 2) * DOT_SCALE, 
            startRadius: (startGridSize / 3) * DOT_SCALE,  
            currentRadius: (startGridSize / 3) * DOT_SCALE,  
            brightness: halftone ? halftone.brightness : 128,
            fill: halftone ? halftone.fill : '#000',
            isPartOfHalftone: halftone !== null,
            needsBounce: halftone ? (halftone.finalY < canvasHeight - 50) : false,
            startCol: startCol,
            startRow: startRow,
            // Wave effect: combine column and row for diagonal wave
            dropDelay: (startCol * 8) + (startRow * 3),
            hasStartedFalling: false,
            fallStartTime: 0,
            hasFallenOff: false,
            isReentering: false,
            vx: 0,
            vy: 0,
            settling: false,
            swarmPhase: 0,
            bounceCount: 0,
            isSettled: false
        };
        circles.push(circle);
    }

    console.log(`Created ${circles.length} circles`);

    // Start animation loop (grid is empty initially; settled circles get added dynamically)
    animate();

    setTimeout(() => {
        animationStarted = true;
    }, 1000);
}

//2 animation loop
let animationTime = 0;

function animate() {
    // Clear to transparent: reset transform, clear full device-pixel canvas, then restore transform
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    if (animationStarted) {
        animationTime++;
    }

    // Update the nearbySet only when mouse present
    nearbySet.clear();
    if (mouseX !== null && mouseY !== null) {
        const nearby = getNearbyCircles(mouseX, mouseY);
        for (const c of nearby) nearbySet.add(c);
    }

    // Main per-circle logic (unchanged behaviour for falling/swarm)
    for (let i = 0, len = circles.length; i < len; i++) {
        const circle = circles[i];

        // Phase 1: Rectangle falls down with wave effect
        if (animationStarted && !circle.hasStartedFalling) {
            if (animationTime * 16.67 >= circle.dropDelay) {
                circle.hasStartedFalling = true;
                circle.fallStartTime = animationTime;
                circle.vy = 15 + Math.random() * 3;
                circle.vx = 0;
            }
        }

        // Phase 2: Continue falling until off-screen
        if (circle.hasStartedFalling && !circle.hasFallenOff) {
            circle.vy += 0.5;
            circle.y += circle.vy;

            // Shrink as they fall
            const fallDuration = animationTime - circle.fallStartTime;
            const shrinkProgress = Math.min(fallDuration / 60, 1);
            // Scale the shrinking animation
            circle.currentRadius = circle.startRadius * (1 - shrinkProgress * 0.85);

            // Check if fallen off screen
            if (circle.y > canvasHeight + 100) {
                circle.hasFallenOff = true;
                circle.isReentering = true;
                circle.swarmPhase = 0;

                // Start from random position on the right, spread vertically
                circle.x = canvasWidth + 150 + Math.random() * 200;
                circle.y = circle.originalY + (Math.random() - 0.5) * 300;

                // Start at 3X the final target radius (already scaled)
                circle.currentRadius = circle.radius * 3;

                circle.vx = 0;
                circle.vy = 0;
            }
        }

        // Phase 3: Re-enter from right and SHRINK from 3X to target size
        if (circle.isReentering && !circle.isSettled) {
            circle.swarmPhase++;

            // Shrink from 3X to 1X during swarm
            const shrinkDuration = 60;
            if (circle.swarmPhase < shrinkDuration) {
                const shrinkProgress = circle.swarmPhase / shrinkDuration;
                const startSize = circle.radius * 3;
                const targetSize = circle.radius;
                circle.currentRadius = startSize - (startSize - targetSize) * shrinkProgress;
            } else {
                circle.currentRadius = circle.radius;
            }

            // Bird-like swarm behavior
            const dx = circle.originalX - circle.x;
            const dy = circle.originalY - circle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 1) {
                circle.x = circle.originalX;
                circle.y = circle.originalY;
                circle.currentRadius = circle.radius;
                circle.isSettled = true;
                circle.isReentering = false;

                // Add to grid index when settled (so hover can hit it later)
                addToGrid(circle);
                settledCount++;
                continue; 
            }

            // Flocking behavior: accelerate towards target with natural curves
            const angle = Math.atan2(dy, dx);
            const curveFactor = Math.sin(circle.swarmPhase * 0.1) * 0.3;

            const speed = Math.min(distance * 0.08, 12);
            circle.vx = Math.cos(angle + curveFactor) * speed;
            circle.vy = Math.sin(angle + curveFactor) * speed;

            // Add slight randomness for organic feel
            circle.vx += (Math.random() - 0.5) * 0.5;
            circle.vy += (Math.random() - 0.5) * 0.5;

            circle.x += circle.vx;
            circle.y += circle.vy;
        }

        // Draw (handles hover internally using nearbySet)
        drawCircle(circle);
    }

    requestAnimationFrame(animate);
}

function drawCircle(circle) {
    let fill = null;

    // Default color (halftone grayscale or black)
    if (circle.isPartOfHalftone) {
        // use precomputed fill when available
        fill = circle.fill || (() => {
            const grayValue = 255 - circle.brightness;
            return `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
        })();
    } else {
        fill = '#000';
    }

    // Reset size unless animation is overriding it
    let radius = circle.currentRadius;

    // --- Hover Interactivity (VERY fast: only compute when circle is near mouse) ---
    if (mouseX !== null && mouseY !== null && circle.isSettled) {
        // Only process circles that are in the nearbySet (3x3 grid cells around mouse)
        if (nearbySet.has(circle)) {
            // cheap AABB check first (within square)
            const dx = circle.x - mouseX;
            if (dx > HOVER_RADIUS || dx < -HOVER_RADIUS) {
                // too far horizontally — no hover
            } else {
                const dy = circle.y - mouseY;
                if (dy > HOVER_RADIUS || dy < -HOVER_RADIUS) {
                    // too far vertically
                } else {
                    // actual distance
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < HOVER_RADIUS) {
                        const strength = 1 - distance / HOVER_RADIUS;

                        // scale
                        radius = circle.radius * (1 + strength * 1.5);

                        // color change
                        fill = `rgb(${Math.floor(255 - strength * 200)}, 50, 50)`;
                    }
                }
            }
        }
    }

    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, radius, 0, Math.PI * 2);
    ctx.fill();
}

//3 Physics Logic (kept but unused in current animation)
function updateCircle(circle) {
    if (circle.settling) {
        moveToTarget(circle);
    }
}

function applyPhysics(circle) {
    const gravity = 1.2;
    circle.vy += gravity;

    const friction = 0.98;
    circle.vx *= friction;

    circle.x += circle.vx;
    circle.y += circle.vy;

    if (circle.needsBounce) {
        if (circle.y + circle.radius >= canvasHeight) {
            circle.y = canvasHeight - circle.radius;

            const bounceFactor = 0.6;
            circle.vy *= -bounceFactor;

            circle.bounceCount++;

            if (circle.bounceCount >= 2) {
                circle.settling = true;
            }
        }
    } else {
        if (circle.y > canvasHeight * 0.8) {
            circle.settling = true;
        }
    }

    if (circle.x - circle.radius < 0) {
        circle.x = circle.radius;
        circle.vx *= -0.7;
    }

    if (circle.x + circle.radius > canvasWidth) {
        circle.x = canvasWidth - circle.radius;
        circle.vx *= -0.7;
    }
}

//4 Settling Behavior (kept but unused in current animation)
function moveToTarget(circle) {
    const dx = circle.originalX - circle.x;
    const dy = circle.originalY - circle.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 0.5) {
        circle.x = circle.originalX;
        circle.y = circle.originalY;
        circle.isSettled = true;
        // add to grid if not already added
        if (!circle._gridKey) {
            addToGrid(circle);
            settledCount++;
        }
        return;
    }

    const easingFactor = 0.15;
    circle.x += dx * easingFactor;
    circle.y += dy * easingFactor;
}
