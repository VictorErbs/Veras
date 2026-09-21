import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ServicesList from '../components/ServicesList';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import LeadForm from '../components/LeadForm';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

/**
 * Landing page principal do Studio Renata Veras.
 */
const LandingPage = () => {
  return (
    <div className="landing-page-root">
      <Header />
      <main>
        <Hero />
        <ServicesList />
        <Features />
        <Testimonials />
        <LeadForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default LandingPage;
