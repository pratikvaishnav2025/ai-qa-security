import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-40 pb-32 px-4 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 mb-10 text-[10px] font-black tracking-[0.3em] text-cyan-400 border border-cyan-500/30 bg-cyan-500/5 rounded-full uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,1)] animate-pulse"></span>
              Secure Node: Established
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
              Securing the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Onchain Future.</span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-12 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-medium">
              High-fidelity QA frameworks for smart contracts, DeFi protocols, and decentralized infrastructure. 
              Bridging the gap between code and absolute reliability.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <a href="#ai-tools" className="group relative w-full sm:w-auto px-10 py-5 bg-cyan-500 text-slate-950 font-black uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95 text-center">
                Initialize Security Engine
                <div className="absolute -inset-1 bg-cyan-500 blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
              </a>
              <a href="#projects" className="w-full sm:w-auto px-10 py-5 bg-slate-900/50 border border-slate-700 text-slate-300 font-black uppercase tracking-widest text-xs transition-all hover:bg-slate-800 text-center">
                Decrypt Test Labs
              </a>
            </div>
          </div>

          <div className="flex-1 hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur-2xl opacity-10"></div>
              <div className="relative bg-slate-900/80 border border-slate-700 p-8 rounded-3xl cyber-border">
                <div className="flex gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="space-y-4 font-mono text-[11px] text-cyan-500/80">
                  <div className="flex gap-4"><span className="text-slate-600">01</span><span>$ foundry test --match-contract VaultSecurity</span></div>
                  <div className="flex gap-4"><span className="text-slate-600">02</span><span>[PASS] testReentrancyProtection() (gas: 2354)</span></div>
                  <div className="flex gap-4"><span className="text-slate-600">03</span><span>[PASS] testFlashLoanInvariant() (gas: 12450)</span></div>
                  <div className="flex gap-4"><span className="text-slate-600">04</span><span className="text-white animate-pulse">| Initializing Fuzz Agent v2.4...</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-slate-800 pt-16">
          {[
            { v: '100+', l: 'Audits Completed' },
            { v: '$2B+', l: 'TVL Secured' },
            { v: '0.1ms', l: 'Oracles Latency' },
            { v: '99.9%', l: 'Fuzzing Coverage' }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col group">
              <span className="text-white font-black text-4xl mb-2 group-hover:text-cyan-500 transition-colors">{stat.v}</span>
              <span className="text-[9px] uppercase font-black tracking-[0.2em] text-slate-500">{stat.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};