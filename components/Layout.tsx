
import React, { useState } from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Mission', href: '#about' },
    { name: 'Stack', href: '#skills' },
    { name: 'Test Labs', href: '#projects' },
    { name: 'Security Engine', href: '#ai-tools' },
  ];

  return (
    <div className="min-h-screen flex flex-col cyber-grid">
      <nav className="fixed top-0 w-full z-[100] bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/50 rounded-lg flex items-center justify-center text-cyan-500 font-black shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:scale-110 transition-transform">
                AC
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tighter text-white">SENTINEL<span className="text-cyan-500">CORE</span></span>
                <span className="text-[8px] font-bold text-slate-500 tracking-[0.4em] uppercase">Web3 Security Lab</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button className="px-6 py-2.5 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 text-xs font-black uppercase tracking-widest rounded hover:bg-cyan-500 hover:text-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                Access Audit
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-cyan-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-slate-950 border-b border-cyan-500/20 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-black uppercase tracking-widest text-slate-300 hover:text-cyan-400"
              >
                {link.name}
              </a>
            ))}
            <button className="w-full py-4 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 font-black uppercase tracking-widest rounded">
              Access Audit
            </button>
          </div>
        )}
      </nav>

      <main className="flex-grow pt-20">
        {children}
      </main>

      <footer className="bg-slate-950 border-t border-cyan-500/10 py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-cyan-500/10 border border-cyan-500/20 rounded-md flex items-center justify-center text-cyan-500 text-[10px] font-black">AC</div>
                <span className="font-black text-lg text-white tracking-tighter">SENTINEL<span className="text-cyan-500">CORE</span></span>
              </div>
              <p className="text-slate-500 text-sm max-w-sm mb-8">
                Securing decentralized futures through automated reliability frameworks and aggressive threat modeling.
              </p>
            </div>
            <div className="flex flex-col md:items-end gap-6">
              <div className="flex gap-8 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                <a href="#" className="hover:text-cyan-400 transition-colors">Nodes</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">Artifacts</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">Audit logs</a>
              </div>
              <p className="text-[10px] text-slate-700 font-mono">
                ENCRYPTED CONNECTION ESTABLISHED // © {new Date().getFullYear()} SENTINEL CORE
              </p>
            </div>
          </div>
        </div>
      </footer>
      {/* Correctly close the main container div after footer */}
    </div>
  );
};
