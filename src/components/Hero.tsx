import { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';

declare global {
  interface Window {
    Vimeo: any;
  }
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);

    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.async = true;
    script.onload = () => {
      if (iframeRef.current && window.Vimeo) {
        playerRef.current = new window.Vimeo.Player(iframeRef.current);
      }
    };
    document.body.appendChild(script);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleVideoClick = async () => {
    if (playerRef.current) {
      try {
        const paused = await playerRef.current.getPaused();

        if (paused) {
          await playerRef.current.setCurrentTime(0);
          await playerRef.current.setVolume(1);
          await playerRef.current.requestFullscreen();
          await playerRef.current.play();
        } else {
          await playerRef.current.pause();
        }
      } catch (error) {
        console.error('Error controlling video:', error);
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center cursor-none group"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 w-full h-full cursor-none"
        onClick={handleVideoClick}
      >
        <iframe
          ref={iframeRef}
          src="https://player.vimeo.com/video/1135176156?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          title="General Showreel 2025"
          className="absolute inset-0 w-full h-full pointer-events-none"
        ></iframe>

        <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
      </div>

      <div
        className={`relative z-10 text-center w-full transition-all duration-2000 pointer-events-none ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h1
          className="text-[12rem] md:text-[18rem] lg:text-[24rem] xl:text-[28rem] font-black py-12 w-screen"
          style={{
            color: 'rgba(224, 241, 31, 0.25)',
            textShadow: '0 0 40px rgba(224, 241, 31, 0.3)',
            lineHeight: '0.8',
            WebkitTextStroke: '1px rgba(224, 241, 31, 0.4)',
            letterSpacing: '0.5px'
          }}
        >
          STATE OF MIND
        </h1>

        <div className="px-6">
          <p className="text-xl md:text-2xl font-light tracking-widest mb-4 text-gray-300">
            Shoot. Cut. Create.
          </p>

          <p className="text-base md:text-lg font-light mb-12 text-gray-400 max-w-2xl mx-auto">
            Directed, cut, and designed — by Jeremy Andary.
          </p>

          <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-[#E0F11F]/40 rounded-full text-white font-medium tracking-wide hover:bg-[#E0F11F]/20 hover:border-[#E0F11F] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(224,241,31,0.4)]">
            <Play className="w-5 h-5 fill-current" />
            <span>Play Reel</span>
          </button>
        </div>
      </div>

      {isHovering && (
        <div
          className="fixed z-50 pointer-events-none transition-opacity duration-200"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full border-2 border-white/30"></div>
              <div className="absolute inset-0 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <Play className="w-10 h-10 fill-white text-white" />
              </div>
            </div>
            <span className="text-white text-3xl font-light tracking-widest">Play Reel</span>
          </div>
        </div>
      )}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce pointer-events-none">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
