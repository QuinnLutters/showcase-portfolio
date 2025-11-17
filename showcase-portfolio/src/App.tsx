import './App.css';
import Silk from './components/Silk.jsx';
import Navbar from '@/components/Navbar';
import HalftoneAnimation from '@/components/HalftoneAnimation';

function App() {
  return (
    <>
      <div className="relative min-h-screen">
      {/* Grid Overlay - absolute, scrolls with page */}
      <div 
        className="absolute top-0 left-0 w-full pointer-events-none z-0 opacity-10"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 200px)',
          gridTemplateRows: 'repeat(13, 340px)',
          gap: '0px',
          justifyContent: 'center',
          transform: 'translateY(-150px)',
          height: '100%' // Matches content height exactly
        }}
      >
        {[...Array(117)].map((_, i) => (
          <div 
            key={i}
            style={{
              width: '200px',
              height: '340px',
              outline: '2px solid rgba(0, 0, 0, 0.1)',
              outlineOffset: '-1px'
            }}
          />
        ))}
      </div>

      {/* Fixed Silk Background */}
      <div className="fixed inset-0 -z-10 opacity-20">
        <Silk
          speed={5}
          scale={1}
          color="#ffffff"
          noiseIntensity={.5}
          rotation={0}
        />
      </div>
      
      {/* Halftone Animation Background */}
      <HalftoneAnimation />
      
      {/* Grain overlay */}
      <div 
        className="fixed inset-0 -z-[9] pointer-events-none opacity-100"
        style={{
          backgroundImage: 'url(/assets/OVERLAY.png)',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay'
        }}
      ></div>
      
      {/* All your content with relative positioning */}
      <div className="relative z-10">
        {/* Navbar */}
        <div className="px-[180px]">
          <Navbar />
        </div>
      
      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div>
          <h1 className="text-black text-[11.5rem] font-black leading-none mb-6 whitespace-nowrap">
            Quinn Lutters
          </h1>
          <p className="text-black text-[1.55rem] max-w-[600px] text-left">
            I'm a media designer who makes experiences where creativity and technology meet purpose
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="relative z-10 min-h-screen py-24 mt-[50px]">
        <div className="flex justify-between gap-8">
          {/* Column 1: Action Portrait */}
          <div className="flex-shrink-0 flex items-center justify-center -mt-2" style={{ width: '220px' }}>
            <div className="relative">
              <img 
                src="/assets/img/quinn-action.jpg" 
                alt="Portrait of quinn" 
                className="w-full"
              />
              {/* Grain overlay - will match image size exactly */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-50"
                style={{
                  backgroundImage: 'url(/assets/OVERLAY.png)',
                  backgroundRepeat: 'repeat',
                  mixBlendMode: 'overlay'
                }}
              ></div>
            </div>
          </div>

          {/* Column 2: Second h2 + Text Content */}
          <div className="space-y-5 flex-shrink-0">
            {/* Top h2 - sans serif, more to the left with negative margin */}
            <h2 className="text-black text-[3rem] font-black leading-tight mb-0 mt-10 -ml-50 whitespace-nowrap text-left">
              Where design
            </h2>
            <h2 className="text-regular text-[3rem] leading-tight italic mb-2 whitespace-nowrap font-serif text-left" style={{ color: '#222B59' }}>
              meets purpose
            </h2>
            <p className="text-black text-[1.1rem] leading-relaxed mb-2 text-left max-w-[530px]">
              As a designer I think that design is more than one thing, it has a purpose. Whether it helps someone, informs people or creates awareness. Design ahs the unique quality to evoke emotions. We as designer have the opportunity and toolset to shape people's emotions through our design, which is one of the most beautiful things to do.
            </p>
            
            <p className="text-black text-[1.1rem] leading-relaxed mb-2 text-left max-w-[530px]">
              As a young individual I've seen a lot and learned enough through my journey to know what matters most.
            </p>
            
            <p className="text-[1.10rem] text-left max-w-[530px]">
              <span className="italic font-serif" style={{ color: '#222B59' }} >"People ignore design that ignores people"</span> - Frank Chimero
            </p>
          </div>

          {/* Column 3: Large Skiing Competition Image */}
          <div className="flex-shrink-0 relative" style={{ width: '450px' }}>
            <img 
              src="/assets/img/quinn_comp.png" 
              alt="Quinn in action during a skiing competition" 
              className="w-full"
            />
            {/* Grain overlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-50"
              style={{
                backgroundImage: 'url(/assets/OVERLAY.png)',
                backgroundRepeat: 'repeat',
                mixBlendMode: 'overlay'
              }}
            ></div>
          </div>
        </div>

        {/* Bottom Row: Laptop Image with negative margin */}
        <div className="flex justify-center">
          <div className="flex-shrink-0 -mt-30 ml-85 relative" style={{ width: '300px' }}>
            <img 
              src="/assets/img/quinn-laptop-laugh.JPG" 
              alt="Quinn laughing with his laptop" 
              className="w-full"
            />
            {/* Grain overlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-50"
              style={{
                backgroundImage: 'url(/assets/OVERLAY.png)',
                backgroundRepeat: 'repeat',
                mixBlendMode: 'overlay'
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Work Section */}
      <div className="relative z-10 min-h-screen px-[180px] py-24">
        {/* Project Grid - 2 columns, alternating sizes */}
        <div className="space-y-16">
          {/* Row 1: Large left, Small right - SPACE BETWEEN */}
          <div className="flex justify-between items-center min-h-screen">
            {/* Large Project - 500x600 */}
            <div className="flex-shrink-0" style={{ width: '500px' }}>
              <div className="w-full mb-4 overflow-hidden" style={{ height: '600px' }}>
                <img 
                  src="/assets/img/driven-app-mockup.png" 
                  alt="Project name" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-black text-[1.3rem] mb-2 text-left">
                Look at this cool project I created it does something cool
              </p>
              <p className="text-[1.1rem] text-left" style={{ color: '#666666' }}>UX Design • User research</p>
            </div>

            {/* Small Project - 300x400 */}
            <div className="flex-shrink-0" style={{ width: '300px' }}>
              <div className="w-full mb-4 overflow-hidden" style={{ height: '400px' }}>
                <img 
                  src="/assets/img/driven-app-mockup.png" 
                  alt="Project name" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-black text-[1.3rem] mb-2 text-left">
                Look at this cool project I created it does something cool
              </p>
              <p className="text-[1.1rem] text-left" style={{ color: '#666666' }}>Web development</p>
            </div>
          </div>

          {/* Row 2: Small left, Large right - SPACE BETWEEN */}
          <div className="flex justify-between items-center min-h-screen">
            {/* Small Project - 300x400 */}
            <div className="flex-shrink-0" style={{ width: '300px' }}>
              <div className="w-full mb-4 overflow-hidden" style={{ height: '400px' }}>
                <img 
                  src="/assets/img/driven-app-mockup.png" 
                  alt="Project name" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-black text-[1.3rem] mb-2 text-left">
                Look at this cool project I created it does something cool
              </p>
              <p className="text-[1.1rem] text-left" style={{ color: '#666666' }}>Web development</p>
            </div>

            {/* Large Project - 500x600 */}
            <div className="flex-shrink-0" style={{ width: '500px' }}>
              <div className="w-full mb-4 overflow-hidden" style={{ height: '600px' }}>
                <img 
                  src="/assets/img/driven-app-mockup.png" 
                  alt="Project name" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-black text-[1.3rem] mb-2 text-left">
                Look at this cool project I created it does something cool
              </p>
              <p className="text-[1.1rem] text-left" style={{ color: '#666666' }}>UX Design • User research</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 min-h-screen  py-16 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          {/* Left side - Title */}
          <div>
            <h2 className="text-black text-[6.5rem] font-black leading-tight text-left mt-[50px]">
              Design'n &<br />
              Creating since<br />
              2022
            </h2>
          </div>

          {/* Right side - Socials */}
          <div className="text-right mt-[350px]">
            <p className="text-black text-[1.4rem] font-medium mb-2" style={{ color: '#666666' }}>Socials</p>
            <a href="https://www.linkedin.com/in/quinn-lutters-38ba5a27b/" target="_blank" rel="noopener noreferrer" className="block text-black text-[1.4rem] font-medium mb-1 hover:underline">
              LinkedIn
            </a>
            <a href="https://behance.net/yourprofile" target="_blank" rel="noopener noreferrer" className="block text-black text-[1.4rem] font-medium mb-1 hover:underline">
              Behance
            </a>
            <a href="mailto:quinn.lutters@gmail.com" className="block text-black text-[1.4rem] font-medium hover:underline">
              Email
            </a>
          </div>
        </div>

        {/* Bottom row - Copyright and location */}
        <div className="flex justify-between mt-24 text-[1.1rem] text-black">
          <p>©2025 QAM Lutters. All Rights Reserved</p>

          <p>Located in the Netherlands</p>
        </div>
      </footer>
      </div>
    </div>
    </>
  )
}

export default App