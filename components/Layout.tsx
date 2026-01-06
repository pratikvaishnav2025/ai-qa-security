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
    { name: 'Test Labs', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'AI Engine', href: '#ai-tools' },
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled ? 'py-3 glass-nav' : 'py-6 bg-transparent'
      }`}>
        <div className="responsive-container">
          <div className="flex justify-between items-center">
            {/* Logo Group */}
            <a href="#" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-center justify-center text-cyan-500 font-bold shadow-[0_0_15px_rgba(6,182,212,0.1)] group-hover:border-cyan-500 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all">
                AC
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-xl tracking-tighter text-white">SENTINEL<span className="text-cyan-500">CORE</span></span>
                <span className="text-[9px] font-bold text-slate-500 tracking-[0.3em] uppercase mt-1">SEC-LAB v3.1</span>
              </div>
            </a>

            {/* Nav Menu Desktop */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="mailto:alex@sentinel-core.io"
                className="px-6 py-2.5 bg-cyan-500 text-slate-950 text-[11px] font-bold uppercase tracking-widest rounded hover:bg-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.1)]"
              >
                Get Audit
              </a>
            </div>

            {/* Hamburger Mobile */}
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

        {/* Mobile Flyout */}
        <div className={`fixed inset-0 bg-slate-950/95 z-[110] transition-all duration-500 md:hidden ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}>
          <div className="flex flex-col h-full p-8 pt-24">
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-bold uppercase tracking-tighter text-white hover:text-cyan-500 border-b border-slate-900 pb-4 flex justify-between items-center"
                >
                  {link.name}
                  <span className="text-xs text-slate-700 font-mono">0{i+1}</span>
                </a>
              ))}
              <button className="w-full py-5 mt-4 bg-cyan-500 text-slate-950 font-bold uppercase tracking-widest rounded-xl text-sm">
                Request Audit
              </button>
            </div>
            <div className="mt-auto py-8 text-center">
              <p className="text-[10px] font-mono text-slate-700 tracking-[0.4em] uppercase">SYSTEM_STATE: ENCRYPTED</p>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-24 md:pt-32">
        {children}
      </main>

      <footer className="bg-slate-950 border-t border-slate-900 py-20 relative overflow-hidden">
        <div className="responsive-container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-start">
            <div className="md:col-span-6 lg:col-span-5">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-cyan-500/10 border border-cyan-500/20 rounded-md flex items-center justify-center text-cyan-500 text-[10px] font-bold">AC</div>
                <span className="font-bold text-xl text-white tracking-tighter uppercase">Sentinel<span className="text-cyan-500">Core</span></span>
              </div>
              <p className="text-slate-400 text-base max-w-sm mb-10 leading-relaxed">
                Aggressive threat modeling and automated reliability frameworks for the next generation of decentralized finance.
              </p>
              <div className="flex gap-8">
                {['GitHub', 'LinkedIn', 'Twitter'].map(social => (
                  <a key={social} href="#" className="text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:text-cyan-500 transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-6 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div className="flex flex-col gap-6">
                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.4em]">Protocol</span>
                <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Audit Methodology</a>
                <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Test Harnesses</a>
                <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Bug Bounty Logs</a>
              </div>
              <div className="flex flex-col gap-6">
                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.4em]">Company</span>
                <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Case Studies</a>
                <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">About Sentinel</a>
                <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Privacy Stack</a>
              </div>
              <div className="hidden sm:flex flex-col gap-6">
                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.4em]">Environment</span>
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg text-[9px] font-mono text-cyan-500/60 leading-loose">
                  Uptime: 99.998%<br/>
                  Region: us-central1<br/>
                  State: SECURE
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-[10px] text-slate-700 font-mono tracking-widest uppercase">
              // SENTINEL CORE SEC-LAB // EST 2024
            </p>
            <p className="text-[10px] text-slate-800 font-mono tracking-widest uppercase">
              © {new Date().getFullYear()} Alex Chen. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};