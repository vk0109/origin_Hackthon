import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ImpactStats from "./components/ImpactStats";
import Mission from "./components/Mission";
import Disasters from "./components/Disasters";
import HowItWorks from "./components/HowItWorks";
import Resources from "./components/Resources";
import Reviews from "./components/Reviews";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-[#06100c]">
      <Navbar />

      <main>
        <Hero />
        <ImpactStats />
        <Mission />
        <Disasters />
        <HowItWorks />
        <Resources />
        <Reviews />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;