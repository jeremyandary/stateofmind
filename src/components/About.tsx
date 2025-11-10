import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ContactModal from './ContactModal';

export default function About() {
  const { elementRef, isVisible } = useScrollAnimation(0.2);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section ref={elementRef} className="py-24 md:py-40 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 text-white" style={{ letterSpacing: '0.5px' }}>About</h2>
              <h3 className="text-xl md:text-2xl font-light mb-8 text-white/80 leading-relaxed">
                Creative direction meets storytelling.
              </h3>
              <div className="space-y-6 text-white/60 leading-relaxed text-base md:text-lg font-light">
                <p>
                  I'm Jeremy Andary, the mind behind State of Mind.
                </p>
                <p>
                  My work lives at the intersection of film, design, and emotion — where story and style move together.
                </p>
                <p>
                  With a background in directing, editing, and motion graphics, I handle the creative process end-to-end, shaping visuals that resonate and stay with people.
                </p>
                <p>
                  Whether it's a music video, brand campaign, or experimental short, my focus is on rhythm, tone, and connection — bringing each idea to life with intention and energy.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="group mt-10 inline-flex items-center gap-3 px-8 py-3 bg-[#E0F11F] text-black font-medium text-sm tracking-wide hover:bg-[#E0F11F]/90 transition-all duration-300 hover:scale-105 rounded-full"
              >
                <span>Let's Work Together</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          <div className="relative hidden md:block">
            <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black">
              <img
                src="/Jeremy_Andary_Headshot.png"
                alt="Jeremy Andary"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-white/5 rounded-full filter blur-[100px]"></div>
          </div>
        </div>
      </div>
    </section>

    <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
