import { useEffect, useRef } from 'react';

export default function HalftoneAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d', { alpha: true })!;

    let circles: any[] = [];
    let animationTime = 0;
    let animationStarted = false;
    let allFallenOff = false;
    let reentryStartTime = 0;
    let animationFrameId: number;

    const img = new Image();
    img.onload = function() {
        processImage(img);
    };
    img.src = '/src/assets/cutout-me.png';

    function processImage(img: HTMLImageElement) {
        const dpr = window.devicePixelRatio || 1;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        canvas.width = viewportWidth * dpr;
        canvas.height = viewportHeight * dpr;
        canvas.style.width = viewportWidth + 'px';
        canvas.style.height = viewportHeight + 'px';

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const scale = Math.min(
            (viewportWidth / img.width) * 1.3,
            (viewportHeight / img.height) * 1.3
        );

        const imgWidth = img.width * scale;
        const imgHeight = img.height * scale;
        const offsetX = (viewportWidth - imgWidth) / 2;
        const offsetY = (viewportHeight - imgHeight) / 2;

        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        if (!tempCtx) return;

        tempCanvas.width = imgWidth;
        tempCanvas.height = imgHeight;
        tempCtx.imageSmoothingEnabled = false;
        tempCtx.drawImage(img, 0, 0, imgWidth, imgHeight);

        const imageData = tempCtx.getImageData(0, 0, imgWidth, imgHeight);
        const pixels = imageData.data;

        const gridSize = 5;
        const cols = Math.floor(imgWidth / gridSize);
        const rows = Math.floor(imgHeight / gridSize);

        let halftoneCircles: any[] = [];

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
            const maxRadius = gridSize / 1.9;
            const radius = (brightness / 255) * maxRadius;

            if (radius > 0.5) {
                halftoneCircles.push({
                finalX,
                finalY,
                radius,
                brightness
                });
            }
            }
        }

        const startGridSize = 20;
        const startCols = Math.ceil(viewportWidth / startGridSize);
        const startRows = Math.ceil(viewportHeight / startGridSize);
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
            originalX: halftone ? halftone.finalX : viewportWidth + 200,
            originalY: halftone ? halftone.finalY : viewportHeight + 200,
            x: startX,
            y: startY,
            radius: halftone ? halftone.radius : gridSize / 2,
            startRadius: startGridSize / 3,
            currentRadius: startGridSize / 3,
            brightness: halftone ? halftone.brightness : 128,
            isPartOfHalftone: halftone !== null,
            needsBounce: halftone ? (halftone.finalY < viewportHeight - 50) : false,
            startCol,
            startRow,
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

        animate();
        setTimeout(() => {
            animationStarted = true;
        }, 1000);
    }


    function animate() {
    // Clear with transparency
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    if (animationStarted) {
        animationTime++;
    }

    if (!allFallenOff && animationStarted) {
        const allOff = circles.every(circle => circle.hasFallenOff || !circle.isPartOfHalftone);
        if (allOff) {
        allFallenOff = true;
        reentryStartTime = animationTime;
        }
    }

    circles.forEach(circle => {
        // Skip all animation logic if already settled
        if (circle.isSettled) {
        return; // Don't update position, just skip to drawing
        }

        if (animationStarted && !circle.hasStartedFalling && !allFallenOff) {
        if (animationTime * 16.67 >= circle.dropDelay) {
            circle.hasStartedFalling = true;
            circle.fallStartTime = animationTime;
            circle.vy = 15 + Math.random() * 3;
            circle.vx = 0;
        }
        }

        if (circle.hasStartedFalling && !circle.hasFallenOff) {
        circle.vy += 0.5;
        circle.y += circle.vy;
        const fallDuration = animationTime - circle.fallStartTime;
        const shrinkProgress = Math.min(fallDuration / 60, 1);
        circle.currentRadius = circle.startRadius * (1 - shrinkProgress * 0.85);
        
        if (circle.y > window.innerHeight + 100) {
            circle.hasFallenOff = true;
        }
        }

        if (allFallenOff && circle.hasFallenOff && !circle.isReentering && circle.isPartOfHalftone) {
        const reentryDelay = circle.startCol * 5;
        
        if ((animationTime - reentryStartTime) * 16.67 >= reentryDelay) {
            circle.isReentering = true;
            circle.swarmPhase = 0;
            circle.x = window.innerWidth + 150 + Math.random() * 200;
            circle.y = circle.originalY + (Math.random() - 0.5) * 300;
            circle.currentRadius = circle.radius * 3;
            circle.vx = 0;
            circle.vy = 0;
        }
        }

        if (circle.isReentering) {
        circle.swarmPhase++;
        
        const shrinkDuration = 60;
        if (circle.swarmPhase < shrinkDuration) {
            const shrinkProgress = circle.swarmPhase / shrinkDuration;
            const startSize = circle.radius * 3;
            const targetSize = circle.radius;
            circle.currentRadius = startSize - (startSize - targetSize) * shrinkProgress;
        } else {
            circle.currentRadius = circle.radius;
        }
        
        const dx = circle.originalX - circle.x;
        const dy = circle.originalY - circle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 1) {
            // Lock position exactly
            circle.x = circle.originalX;
            circle.y = circle.originalY;
            circle.currentRadius = circle.radius;
            circle.vx = 0;
            circle.vy = 0;
            circle.isSettled = true;
            circle.isReentering = false;
        } else {
            const angle = Math.atan2(dy, dx);
            const curveFactor = Math.sin(circle.swarmPhase * 0.1) * 0.3;
            const speed = Math.min(distance * 0.08, 12);
            circle.vx = Math.cos(angle + curveFactor) * speed;
            circle.vy = Math.sin(angle + curveFactor) * speed;
            circle.vx += (Math.random() - 0.5) * 0.5;
            circle.vy += (Math.random() - 0.5) * 0.5;
            circle.x += circle.vx;
            circle.y += circle.vy;
        }
        }
    });

    // Draw ALL circles
    circles.forEach(circle => {
        const shouldDraw = !circle.hasFallenOff || circle.isReentering || circle.isSettled;
        
        if (shouldDraw) {
        drawCircle(circle);
        }
    });

    animationFrameId = requestAnimationFrame(animate);
    }

        function drawCircle(circle: any) {
        // Always draw settled and re-entering circles
        if (circle.isReentering || circle.isSettled) {
            if (circle.isPartOfHalftone) {
            const grayValue = 255 - circle.brightness;
            ctx.fillStyle = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
            } else {
            ctx.fillStyle = '#000000';
            }
        } else {
            ctx.fillStyle = '#000000';
        }

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.currentRadius, 0, Math.PI * 2);
        ctx.fill();
        }

        return () => {
        cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
        ref={canvasRef}
        className="absolute top-10 inset-0 -z-10 pointer-events-none"
        />
    );
}