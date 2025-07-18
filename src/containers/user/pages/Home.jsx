import React from 'react';
import Footer from '../layout/Footer';
import Header from "../layout/Header";
import HeroSection from "../layout/HeroSection";

const Home = () => (
  <div className="flex flex-col min-h-screen">
    <Header />

    {/* Main content grows to fill space */}
    <main className="flex-grow">
      <HeroSection />
    </main>

    <Footer />
  </div>
);

export default Home;
