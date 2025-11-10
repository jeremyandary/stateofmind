import Hero from './components/Hero';
import FeaturedWork from './components/FeaturedWork';
import About from './components/About';
import Philosophy from './components/Philosophy';
import Capabilities from './components/Capabilities';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <FeaturedWork />
      <About />
      <Philosophy />
      <Capabilities />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default App;
