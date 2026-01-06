import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { AITools } from './components/AITools';
import { RadarChart } from './components/RadarChart';
import { PROJECTS, SKILLS } from './constants.tsx';
import { Project } from './types';

const CaseStudyModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 shadow-2xl animate-in zoom-in-95 duration-300 cyber-border">
        <div className="sticky top-0 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 sm:px-10 py-6 sm:py-8 flex justify-between items-center z-10">
          <div>
            <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em] bg-cyan-500/10 px-4 py-1 rounded">
              Lab Report: {project.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-4 tracking-tighter">{project.title}</h2>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-800 rounded-full transition-colors text-slate-500 hover:text-cyan-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 sm:p-10 lg:p-16 space-y-12 sm:space-y-16">
          <div className="bg-cyan-500 text-slate-950 rounded-2xl p-8 sm:p-10 relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Security Outcome</div>
              <p className="text-xl sm:text-2xl font-black leading-tight tracking-tighter">{project.caseStudy.outcome}</p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-10 sm:space-y-12">
              <section>
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-800 pb-2">Threat Context</h3>
                <p className="text-slate-300 leading-relaxed text-base sm:text-lg font-medium">{project.caseStudy.context}</p>
              </section>

              <section>
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8 border-b border-slate-800 pb-2">Audit Actions</h3>
                <ul className="space-y-6">
                  {project.caseStudy.contributions.map((item, i) => (
                    <li key={i} className="flex gap-5 items-start">
                      <div className="shrink-0 w-6 h-6 bg-cyan-500/10 text-cyan-500 rounded border border-cyan-500/30 flex items-center justify-center text-[10px] font-black">{i + 1}</div>
                      <p className="text-slate-400 leading-relaxed text-sm font-medium">{item}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="space-y-10 sm:space-y-12">
              <section className="bg-slate-950 rounded-2xl p-8 border border-slate-800">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-800 pb-2">Security Obstacles</h3>
                <ul className="space-y-6">
                  {project.caseStudy.challenges.map((item, i) => (
                    <li key={i} className="text-sm">
                      <div className="text-white font-black mb-2 tracking-tight">/ {item.split(':')[0]}</div>
                      <div className="text-slate-500 pl-4 border-l border-slate-800">{item.split(':')[1]}</div>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-800 pb-2">Hardened Stack</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 bg-slate-800 border border-slate-700 rounded text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showStackSpec, setShowStackSpec] = useState(false);

  return (
    <Layout>
      <Hero />
      
      <section id="about" className="py-24 sm:py-32 lg:py-48 px-4 bg-slate-900/30 border-y border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            <div className="lg:w-1/3">
              <div className="text-cyan-500 font-mono text-[10px] mb-4 tracking-widest">INITIALIZING_ETHOS.exe</div>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase">Audit <br/><span className="text-cyan-500">Mindset</span></h2>
            </div>
            <div className="lg:w-2/3">
              <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed font-medium mb-10">
                I am a Web3 Security Engineer specializing in automated reliability. My methodology combines traditional QA rigor with blockchain-specific threat modeling. From DeFi protocols to L2 bridges, I build the gates that keep user funds safe.
              </p>
              <p className="text-lg sm:text-xl text-slate-500 leading-relaxed mb-12">
                In a space where "code is law," I ensure the law is enforced without loopholes. My stack leverages Java 21 for complex backend processing and Foundry for surgical smart contract validation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SKILLS.slice(0, 4).map(s => (
                  <div key={s.name} className="px-6 py-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-4 hover:border-cyan-500/30 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]"></span>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-300">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AITools />

      <section className="py-24 sm:py-32 lg:py-40 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] sm:rounded-[3.5rem] p-8 sm:p-12 lg:p-20 overflow-hidden relative cyber-border">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center lg:text-left">
                <h3 className="text-3xl sm:text-4xl font-black text-white mb-6 tracking-tighter uppercase">Infrastructure Node: Security Gate</h3>
                <p className="text-slate-400 text-lg sm:text-xl leading-relaxed font-medium mb-8">
                  The AI Security Intelligence Engine runs on a hardened Java architecture optimized for Cloud Run, ensuring sub-second response times for critical threat modeling.
                </p>
              </div>
              <button 
                onClick={() => setShowStackSpec(!showStackSpec)}
                className="w-full sm:w-auto px-12 py-6 bg-white text-slate-950 font-black uppercase tracking-widest text-xs hover:bg-cyan-400 transition-all active:scale-95"
              >
                {showStackSpec ? 'Close Spec' : 'Reveal Stack'}
              </button>
            </div>
            {showStackSpec && (
              <div className="mt-16 sm:mt-24 bg-slate-950 rounded-3xl p-8 sm:p-12 border border-slate-800 animate-in slide-in-from-top-4 duration-500">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                   <div>
                     <h4 className="text-cyan-500 text-[10px] font-black uppercase mb-10 tracking-[0.3em] border-b border-cyan-500/10 pb-4">Protocol Interfaces</h4>
                     <div className="space-y-10">
                       {[
                         { m: 'POST', p: '/api/v1/audit/harness', d: 'Foundry-to-Gherkin bridge for automated spec mapping.' },
                         { m: 'GET', p: '/api/v1/threat/status', d: 'Live monitoring of oracle feed integrity across providers.' }
                       ].map((api, i) => (
                         <div key={i} className="flex gap-6 items-start group">
                           <span className="bg-cyan-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded transition-transform group-hover:scale-110">RPC</span>
                           <div>
                             <div className="text-white font-mono text-base mb-2">{api.p}</div>
                             <div className="text-slate-500 text-sm font-medium leading-relaxed">{api.d}</div>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                   <div className="bg-slate-900 rounded-2xl p-8 sm:p-10 border border-slate-800 shadow-inner">
                      <h4 className="text-slate-500 text-[10px] font-black uppercase mb-8 tracking-[0.3em] border-b border-slate-800 pb-4">Hardening Config</h4>
                      <ul className="space-y-6 text-sm font-mono text-slate-400">
                        <li className="flex items-center gap-4 group">
                          <span className="text-cyan-500 group-hover:translate-x-2 transition-transform">>></span> 
                          <span>Java 21 <span className="text-white">GraalVM Native</span></span>
                        </li>
                        <li className="flex items-center gap-4 group">
                          <span className="text-cyan-500 group-hover:translate-x-2 transition-transform">>></span> 
                          <span>RSA-4096 Content Validation</span>
                        </li>
                        <li className="flex items-center gap-4 group">
                          <span className="text-cyan-500 group-hover:translate-x-2 transition-transform">>></span> 
                          <span>Distributed Rate Limiting (Redis)</span>
                        </li>
                        <li className="flex items-center gap-4 group">
                          <span className="text-cyan-500 group-hover:translate-x-2 transition-transform">>></span> 
                          <span>Sub-second cold starts</span>
                        </li>
                      </ul>
                   </div>
                 </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="projects" className="py-24 sm:py-32 lg:py-48 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 gap-10">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="text-5xl sm:text-6xl font-black mb-6 text-white tracking-tighter uppercase">Security Test Labs</h2>
              <p className="text-slate-400 text-lg sm:text-xl font-medium">Decrypting successful engagements and high-stakes protocol validations.</p>
            </div>
            <div className="hidden md:block h-px flex-grow mx-12 lg:mx-20 bg-slate-800" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {PROJECTS.map((project) => (
              <div key={project.id} className="group relative bg-slate-900/50 p-8 sm:p-10 rounded-[2.5rem] border border-slate-800 hover:border-cyan-500/30 transition-all duration-500 hover:bg-slate-900 shadow-2xl overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 -translate-y-12 translate-x-12 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-12">
                    <span className="bg-cyan-500/10 text-cyan-500 text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] border border-cyan-500/10">
                      {project.category}
                    </span>
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,1)]"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black mb-6 text-white group-hover:text-cyan-400 transition-colors tracking-tighter leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-12 line-clamp-3 font-medium">
                    {project.caseStudy.outcome}
                  </p>
                  <div className="mt-auto space-y-10">
                    <div className="flex flex-wrap gap-2.5">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-4 py-1.5 bg-slate-950 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-800 transition-colors hover:text-cyan-500 hover:border-cyan-500/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-4 text-[10px] font-black tracking-[0.3em] text-cyan-500 hover:gap-6 transition-all uppercase active:scale-95"
                    >
                      OPEN_LOGS.sh
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <CaseStudyModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      <section id="skills" className="py-24 sm:py-32 lg:py-48 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[3rem] sm:rounded-[5rem] p-10 sm:p-20 lg:p-32 border border-slate-800 relative overflow-hidden cyber-grid shadow-inner">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[180px] pointer-events-none"></div>
            
            <div className="text-center mb-24 relative z-10">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 text-white tracking-tighter uppercase">Audit Capacity</h2>
              <p className="text-slate-400 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">Aggregated mastery across security research and automation engineering, visualized in high-fidelity.</p>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32 relative z-10">
              {/* Visualization Column */}
              <div className="w-full lg:w-1/2 flex justify-center order-2 lg:order-1">
                <div className="w-full max-w-[450px]">
                  <RadarChart skills={SKILLS} />
                </div>
              </div>

              {/* List Column */}
              <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 order-1 lg:order-2">
                {SKILLS.map((skill) => (
                  <div key={skill.name} className="bg-slate-950/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-all group hover:scale-[1.02] active:scale-100">
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <div className="text-[9px] font-black text-cyan-500 mb-2 uppercase tracking-[0.2em]">{skill.category}</div>
                        <div className="text-lg sm:text-xl font-black text-white group-hover:text-cyan-400 transition-colors tracking-tight leading-tight">{skill.name}</div>
                      </div>
                      <div className="text-3xl font-black text-slate-800 group-hover:text-cyan-500/50 transition-colors">{skill.level}%</div>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 relative overflow-hidden">
                      <div className="bg-cyan-500 h-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(6,182,212,0.6)]" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 sm:py-48 lg:py-64 px-4 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-5xl sm:text-7xl lg:text-9xl font-black text-white mb-12 tracking-tighter leading-none uppercase">
            Request <span className="text-cyan-500">Audit.</span>
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-slate-400 mb-20 max-w-2xl mx-auto font-medium leading-relaxed">
            I am currently accepting select security engagements and lead QA engineering mandates for Web3 initiatives.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 w-full max-w-lg mx-auto sm:max-w-none">
            <a href="mailto:alex@sentinel-core.io" className="w-full sm:w-auto px-16 py-6 bg-cyan-500 text-slate-950 font-black uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(6,182,212,0.4)] text-center">
              Initialize Handshake
            </a>
            <a href="#" className="w-full sm:w-auto px-16 py-6 bg-slate-900 border border-slate-700 text-slate-300 font-black uppercase tracking-widest text-xs transition-all hover:bg-slate-800 active:scale-95 text-center">
              Identity: LinkedIn
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default App;