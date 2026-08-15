import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ImpactStats from "./components/ImpactStats";
import Mission from "./components/Mission";
import HowItWorks from "./components/HowItWorks";
import Resources from "./components/Resources";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-[#f5f7f5]">
      <Navbar />

      <main>
        <Hero />
        <ImpactStats />
        <Mission />
        <HowItWorks />
        <Resources />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;