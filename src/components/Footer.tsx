export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 md:py-20 px-6 bg-black border-t border-[#fd8471]/20">
      <div className="max-w-4xl mx-auto text-center">
        <img
          src="/SOM_Brain_Alpha.png"
          alt="State of Mind"
          className="w-24 h-24 mx-auto mb-4"
        />
        <p className="text-white/60 font-light mb-8">
          Jeremy Andary
        </p>
        <p className="text-sm text-white/40 mb-8 tracking-wide">
          Shoot. Cut. Create.
        </p>

        <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm">
          <a
            href="#about"
            className="text-white/50 hover:text-[#fd8471] transition-colors duration-300"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-white/50 hover:text-[#fd8471] transition-colors duration-300"
          >
            Contact
          </a>
          <a
            href="#"
            className="text-white/50 hover:text-[#fd8471] transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href="#"
            className="text-white/50 hover:text-[#fd8471] transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vimeo
          </a>
        </div>

        <p className="text-xs text-white/30">
          © {currentYear} State of Mind. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
