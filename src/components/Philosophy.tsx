import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Philosophy() {
  const { elementRef, isVisible } = useScrollAnimation(0.2);

  return (
    <section ref={elementRef} className="py-24 md:py-40 px-6 bg-white text-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#E0F11F] to-transparent opacity-50"></div>
      <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight" style={{ letterSpacing: '0.5px' }}>
          Emotional design with a <span className="text-[#E0F11F]">human touch</span>.
        </h2>
        <p className="text-lg md:text-xl font-light text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Every frame tells a story. My goal is to craft visuals that connect on a human level through rhythm, tone, and emotion.
        </p>
      </div>
    </section>
  );
}
