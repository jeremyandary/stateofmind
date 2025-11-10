import { ArrowRight, Play } from 'lucide-react';
import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ContactModal from './ContactModal';

export default function CallToAction() {
  const { elementRef, isVisible } = useScrollAnimation(0.2);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <section ref={elementRef} className="py-24 md:py-40 px-6 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full filter blur-[150px]"></div>
        </div>

        <div className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 text-white leading-tight" style={{ letterSpacing: '0.5px' }}>
            Let's create something unforgettable.
          </h2>
          <p className="text-base md:text-xl text-white/60 font-light mb-12 leading-relaxed max-w-3xl mx-auto">
            Whether it's a music video, brand film, or visual story, I'd love to help bring your vision to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-3 px-8 py-3 bg-[#E0F11F] text-black font-medium text-sm tracking-wide hover:bg-[#E0F11F]/90 transition-all duration-300 hover:scale-105 rounded-full"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-3 px-8 py-3 bg-white/10 backdrop-blur-sm border border-[#E0F11F]/30 text-white font-medium text-sm tracking-wide hover:bg-[#E0F11F]/10 hover:border-[#E0F11F]/50 transition-all duration-300 rounded-full"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Watch My Reel</span>
            </button>
          </div>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
