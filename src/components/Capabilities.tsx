import { Film, Scissors, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const capabilities = [
  {
    icon: Film,
    title: 'Directing',
    description: 'Creative leadership and storytelling that brings ideas to life.',
  },
  {
    icon: Scissors,
    title: 'Editing',
    description: 'Finding the rhythm and emotion that make visuals resonate.',
  },
  {
    icon: Sparkles,
    title: 'Motion Graphics',
    description: 'Design-driven animation that adds depth and identity.',
  },
];

export default function Capabilities() {
  const { elementRef, isVisible } = useScrollAnimation(0.2);

  return (
    <section ref={elementRef} className="py-24 md:py-40 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white" style={{ letterSpacing: '0.5px' }}>Capabilities</h2>
          <p className="text-base md:text-xl text-white/60 font-light max-w-2xl">
            From direction to design — every part of the process matters.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <div
                key={index}
                className={`group relative p-8 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-700 rounded-3xl ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 bg-white/10 text-white group-hover:bg-[#E0F11F] group-hover:text-black transition-all duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold mb-4 text-white" style={{ letterSpacing: '0.5px' }}>{capability.title}</h3>
                <p className="text-white/60 font-light leading-relaxed">
                  {capability.description}
                </p>
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-white/5 transition-all duration-500 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
