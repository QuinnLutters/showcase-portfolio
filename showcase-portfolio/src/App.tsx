import './App.css';
import Silk from './components/Silk.jsx';
import Navbar from '@/components/Navbar';
import HalftoneAnimation from '@/components/HalftoneAnimation';

function App() {
  return (
    <>
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
      <div className="relative z-10 min-h-screen py-24">
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
              <div className="bg-gray-300 w-full mb-4" style={{ height: '600px' }}></div>
              <p className="text-black text-[1.3rem] mb-2 text-left">
                Look at this cool project I created it does something cool
              </p>
              <p className="text-[1.1rem] text-left" style={{ color: '#666666' }}>UX Design • User research</p>
            </div>

            {/* Small Project - 300x400 */}
            <div className="flex-shrink-0" style={{ width: '300px' }}>
              <div className="bg-gray-300 w-full mb-4" style={{ height: '400px' }}></div>
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
              <div className="bg-gray-300 w-full mb-4" style={{ height: '400px' }}></div>
              <p className="text-black text-[1.3rem] mb-2 text-left">
                Look at this cool project I created it does something cool
              </p>
              <p className="text-[1.1rem] text-left" style={{ color: '#666666' }}>Web development</p>
            </div>

            {/* Large Project - 500x600 */}
            <div className="flex-shrink-0" style={{ width: '500px' }}>
              <div className="bg-gray-300 w-full mb-4" style={{ height: '600px' }}></div>
              <p className="text-black text-[1.3rem] mb-2 text-left">
                Look at this cool project I created it does something cool
              </p>
              <p className="text-[1.1rem] text-left" style={{ color: '#666666' }}>UX Design • User research</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App