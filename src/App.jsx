import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "./firebase";

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

// Use fixed auth pages that include backend integration and proper tokens
import Login from "./pages/LoginFinal";
import Signup from "./pages/SignupFinal";
import Profile from "./pages/ProfileFinal";

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [authPage, setAuthPage] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#06100c]">
        <div className="text-sm text-[#d9ff4f]">
          Loading ResQ...
        </div>
      </div>
    );
  }

  // LOGIN PAGE
  if (authPage === "login") {
    return (
      <Login
        onSignup={() => setAuthPage("signup")}
        onClose={() => setAuthPage(null)}
      />
    );
  }

  // SIGNUP PAGE
  if (authPage === "signup") {
    return (
      <Signup
        onLogin={() => setAuthPage("login")}
        onClose={() => setAuthPage(null)}
      />
    );
  }

  // PROFILE PAGE (protected)
  if (authPage === "profile") {
    return (
      <Profile
        onClose={() => setAuthPage(null)}
        onLogout={handleLogout}
      />
    );
  }

  // LANDING PAGE
  return (
    <div className="min-h-screen bg-[#06100c]">
      <Navbar
        user={user}
        onLogin={() => setAuthPage("login")}
        onProfile={() => setAuthPage("profile")}
        onLogout={handleLogout}
      />

      <main>
        <Hero />
        <ImpactStats />
        <Mission />
        <Disasters />
        <HowItWorks />
        <Resources />
        <Reviews />
        <CTA onJoin={() => setAuthPage("login")} />
      </main>

      <Footer />
    </div>
  );
}

export default App;