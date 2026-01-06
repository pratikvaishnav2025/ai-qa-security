import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center px-4 overflow-hidden py-12">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-cyan-500/[0.03] rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-purple-500/[0.03] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="responsive-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          {/* Content Block */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-4 px-5 py-2.5 mb-10 text-[10px] font-bold tracking-[0.4em] text-cyan-400 border border-cyan-500/20 bg-cyan-500/5 rounded-full uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></span>
              </span>
              Security Interface v3.11: Online
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-8 leading-[0.85] tracking-tighter uppercase">
              Hardened <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Reliability.</span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-400 mb-12 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-medium">
              Lead QA Engineer & Security Auditor. Developing next-gen automated testing frameworks for multi-chain DeFi protocols and smart contracts.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <a href="#ai-tools" className="group relative w-full sm:w-auto px-12 py-5 bg-cyan-500 text-slate-950 font-bold uppercase tracking-[0.2em] text-[11px] transition-all hover:scale-105 active:scale-95 text-center shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                Initialize Security Engine
              </a>
              <a href="#projects" className="w-full sm:w-auto px-12 py-5 bg-slate-950 border border-slate-800 text-slate-300 font-bold uppercase tracking-[0.2em] text-[11px] transition-all hover:bg-slate-900 text-center hover:border-cyan-500/30">
                Explore Test Labs
              </a>
            </div>
          </div>

          {/* Code Panel */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="dashboard-panel p-10 rounded-3xl shadow-2xl transition-transform hover:scale-[1.02] duration-500">
              <div className="flex justify-between items-center mb-10">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
                </div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Foundry.Harness v2</div>
              </div>
              <div className="space-y-6 font-mono text-[13px] text-cyan-500/60">
                <div className="flex gap-4 group">
                  <span className="text-slate-700 shrink-0">01</span>
                  <span className="text-slate-300">import { "VaultSecurity" } from "./test/Vault.t.sol";</span>
                </div>
                <div className="flex gap-4 group">
                  <span className="text-slate-700 shrink-0">02</span>
                  <span className="text-cyan-600">function testFuzz_VaultDeposit() public {</span>
                </div>
                <div className="flex gap-4 group">
                  <span className="text-slate-700 shrink-0">03</span>
                  <span className="pl-4">vm.assume(amount > 0.1 ether);</span>
                </div>
                <div className="flex gap-4 group">
                  <span className="text-slate-700 shrink-0">04</span>
                  <span className="pl-4 text-purple-400">assert(securityEngine.verify(amount));</span>
                </div>
                <div className="flex gap-4 group">
                  <span className="text-slate-700 shrink-0">05</span>
                  <span className="text-cyan-600">}</span>
                </div>
                <div className="pt-6 border-t border-slate-800/50">
                  <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest">
                    <span className="text-green-500">Suite Passed</span>
                    <span className="text-slate-600">Gas: 23,450</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-28 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 border-t border-slate-900 pt-16">
          {[
            { label: 'Protocols Audited', value: '124' },
            { label: 'Funds Secured', value: '$2.1B' },
            { label: 'Avg Latency', value: '0.14ms' },
            { label: 'Fuzz Cycles', value: '10M+' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center lg:items-start group">
              <span className="text-4xl lg:text-5xl font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tighter mb-2">{item.value}</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};