import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import HeroSlider from './HeroSlider';
import HowItWorks from './HowItWorks';
import Features from './Features';
import AboutSection from './AboutSection';
import CTASection from './CTASection';
import Footer from './Footer';


/**
 * Home
 * Marketing landing page: hero slider, how-it-works, features, about/team,
 * CTA band, and footer.
 */
export default function LandingPage() {
  const navigate = useNavigate();
  

  return (
    <div>
      <Navbar
        onDashboard={() => navigate('/dashboard')}
      />

      <HeroSlider />

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-[5%]" />

      <HowItWorks />

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-[5%]" />

      <Features />

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-[5%]" />

      <AboutSection />

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-[5%]" />

      <CTASection />

      <Footer />
    </div>
  );
}