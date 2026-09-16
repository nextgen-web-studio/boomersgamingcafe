import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Tournaments from './components/Tournaments';
import BookingWizard from './components/BookingWizard';
import Menu from './components/Menu';
import Membership from './components/Membership';
import Corporate from './components/Corporate';
import Admin from './components/Admin';

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
      <section id="menu" className="py-20 px-4 md:px-8">
        <Menu />
      </section>
      <section id="membership" className="py-20 px-4 md:px-8 bg-black/50">
        <Membership />
      </section>
      <section id="corporate" className="py-20 px-4 md:px-8">
        <Corporate />
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
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}