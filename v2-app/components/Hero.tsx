'use client';
export default function Hero() {
  return (
    <div className="relative h-[80vh] min-h-[600px] w-full flex items-end pb-20 px-6">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=2000&auto=format&fit=crop" 
          alt="Hero Backdrop" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      <div className="relative z-20 max-w-7xl mx-auto w-full">
        <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold tracking-wider mb-4 border border-white/10">NEW RELEASE</span>
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 tracking-tight max-w-2xl">CYBER REVOLUTION</h1>
        <p className="text-lg text-white/70 mb-8 max-w-xl">Experience the next generation of open-world action. Available now for PS5.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-3.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition shadow-[0_0_20px_rgba(0,112,243,0.3)]">
            Buy ?3,999
          </button>
          <button className="px-8 py-3.5 glass-panel text-white font-bold rounded-lg hover:bg-white/10 transition">
            Rent ?499 / 7 Days
          </button>
        </div>
      </div>
    </div>
  );
}
