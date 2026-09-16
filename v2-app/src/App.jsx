import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Tournaments from './components/Tournaments';
import BookingWizard from './components/BookingWizard';

function Home() {
  return (
    <main>
      <Hero />
      <section id="book" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <BookingWizard />
      </section>
      <section id="tournaments" className="py-20 px-4 md:px-8 bg-black/50">
        <Tournaments />
      </section>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
