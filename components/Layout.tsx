import React, { useState, useEffect } from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Mission', href: '#about' },
    { name: 'Stack', href: '#skills' },
    { name: 'Test Labs', href: '#projects' },
    { name: 'Security Engine', href: '#ai-tools' },
  ];

  return (
    <div className="min-h-screen flex flex-col cyber-grid relative overflow-x-hidden">
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled ? 'bg-slate-950/90 py-4 border-b border-cyan-500/20' : 'bg-transparent py-6'
      } backdrop-blur-xl`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/50 rounded-lg flex items-center justify-center text-cyan-500 font-black shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:scale-110 transition-transform">
                AC
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tighter text-white">SENTINEL<span className="text-cyan-500">CORE</span></span>
                <span className="text-[8px] font-bold text-slate-500 tracking-[0.4em] uppercase hidden sm:block">Web3 Security Lab</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button className="px-6 py-2.5 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 text-[11px] font-black uppercase tracking-widest rounded hover:bg-cyan-500 hover:text-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                Access Audit
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-cyan-500 hover:bg-cyan-500/10 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        <div className={`fixed inset-0 bg-slate-950/95 z-[110] transition-all duration-500 md:hidden ${
          mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}>
          <div className="flex flex-col h-full p-8">
            <div className="flex justify-between items-center mb-16">
              <span className="font-black text-2xl text-white">MENU</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-cyan-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-black uppercase tracking-widest text-slate-300 hover:text-cyan-400 border-b border-slate-900 pb-4"
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full py-5 mt-4 bg-cyan-500 text-slate-950 font-black uppercase tracking-widest rounded text-sm">
                Access Audit
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-950 border-t border-cyan-500/10 py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="text-left">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-cyan-500/10 border border-cyan-500/20 rounded-md flex items-center justify-center text-cyan-500 text-[10px] font-black">AC</div>
                <span className="font-black text-xl text-white tracking-tighter">SENTINEL<span className="text-cyan-500">CORE</span></span>
              </div>
              <p className="text-slate-500 text-base max-w-sm mb-10 leading-relaxed">
                Securing decentralized futures through automated reliability frameworks and aggressive threat modeling.
              </p>
              <div className="flex gap-6">
                {['Twitter', 'GitHub', 'LinkedIn'].map(social => (
                  <a key={social} href="#" className="text-xs font-black uppercase tracking-widest text-slate-600 hover:text-cyan-500 transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-col md:items-end gap-10">
              <div className="grid grid-cols-2 gap-12 sm:gap-24">
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em]">Protocol</span>
                  <a href="#" className="text-xs text-slate-400 hover:text-white">Whitepaper</a>
                  <a href="#" className="text-xs text-slate-400 hover:text-white">Audits</a>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em]">Lab</span>
                  <a href="#" className="text-xs text-slate-400 hover:text-white">Artifacts</a>
                  <a href="#" className="text-xs text-slate-400 hover:text-white">Roadmap</a>
                </div>
              </div>
              <p className="text-[10px] text-slate-800 font-mono tracking-widest text-center md:text-right">
                ENCRYPTED CONNECTION ESTABLISHED // © {new Date().getFullYear()} SENTINEL CORE
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};