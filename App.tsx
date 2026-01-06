import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { AITools } from './components/AITools';
import { RadarChart } from './components/RadarChart';
import { PROJECTS, SKILLS } from './constants.tsx';
import { Project } from './types';

const CaseStudyModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="dashboard-panel w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-[2rem] shadow-2xl animate-in zoom-in-95 duration-500 flex flex-col custom-scrollbar">
        {/* Modal Header */}
        <div className="sticky top-0 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-6 sm:px-12 py-8 flex justify-between items-center z-20">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.4em] bg-cyan-500/10 self-start px-3 py-1 rounded">
              Report ID: SEC-L{project.id}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tighter uppercase leading-none">{project.title}</h2>
          </div>
          <button onClick={onClose} className="p-4 bg-slate-900 border border-slate-800 rounded-full hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500 transition-all text-slate-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 sm:p-16 space-y-24">
          <div className="bg-gradient-to-br from-cyan-600 to-blue-700 text-slate-950 rounded-3xl p-10 sm:p-16 relative overflow-hidden shadow-2xl group">
            <div className="relative z-10">
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] mb-4 opacity-70">Primary Outcome</div>
              <p className="text-2xl sm:text-4xl font-bold leading-[1.1] tracking-tighter uppercase">{project.caseStudy.outcome}</p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-24 translate-x-24 blur-[100px] group-hover:scale-110 transition-transform duration-700"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-7 space-y-16">
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-grow bg-slate-800"></div>
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em] shrink-0">Analysis Context</h3>
                  <div className="h-px flex-grow bg-slate-800"></div>
                </div>
                <p className="text-xl text-slate-300 leading-relaxed font-medium">{project.caseStudy.context}</p>
              </section>

              <section>
                <h3 className="text-[10px] font-bold text-cyan-500/60 uppercase tracking-[0.4em] mb-12 flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-cyan-500/40"></span>
                  Audit Steps
                </h3>
                <div className="grid gap-8">
                  {project.caseStudy.contributions.map((item, i) => (
                    <div key={i} className="flex gap-8 items-start group">
                      <div className="shrink-0 w-12 h-12 bg-slate-900 border border-slate-800 text-cyan-500 rounded-xl flex items-center justify-center text-sm font-bold transition-all group-hover:border-cyan-500/50 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                        {i + 1}
                      </div>
                      <p className="text-slate-400 leading-relaxed text-base pt-2 font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="lg:col-span-5 space-y-16">
              <section className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-10 shadow-inner">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mb-10 pb-4 border-b border-slate-800">Security Obstacles</h3>
                <div className="space-y-10">
                  {project.caseStudy.challenges.map((item, i) => (
                    <div key={i} className="group">
                      <div className="text-white font-bold text-xs mb-3 tracking-widest uppercase flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500/60"></span>
                        {item.split(':')[0]}
                      </div>
                      <div className="text-slate-500 pl-4.5 border-l-2 border-slate-800 text-sm leading-relaxed group-hover:border-red-500/30 transition-colors">
                        {item.split(':')[1]}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mb-8">System Artifacts</h3>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:text-cyan-400 hover:border-cyan-500/30 transition-all cursor-default">
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

  return (
    <Layout>
      <Hero />
      
      {/* About Module */}
      <section id="about" className="py-32 sm:py-48 px-4 bg-slate-950 border-y border-slate-900 relative">
        <div className="responsive-container relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            <div className="lg:col-span-5">
              <div className="text-cyan-500 font-mono text-[11px] mb-4 tracking-[0.4em] uppercase">Status: Initializing_Ethos</div>
              <h2 className="text-5xl sm:text-7xl font-bold text-white leading-[0.85] tracking-tighter uppercase">
                The <br/>
                <span className="text-cyan-500">Auditor</span>
              </h2>
              <div className="mt-12 space-y-6">
                <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                    <p className="text-slate-400 text-sm leading-relaxed italic">
                        "In a landscape where code is law, the auditor is the enforcer. My goal is absolute protocol certainty."
                    </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed font-medium mb-12">
                I architect absolute certainty for the decentralized web. By synthesizing traditional testing rigor with blockchain-specific threat modeling, I ensure protocols survive extreme volatility and sophisticated exploits.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {SKILLS.slice(0, 4).map(s => (
                  <div key={s.name} className="p-6 dashboard-panel rounded-2xl flex items-center gap-5 group">
                    <div className="w-10 h-10 bg-cyan-500/5 rounded-xl flex items-center justify-center text-cyan-500 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-300">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tools Module */}
      <AITools />

      {/* Projects Grid Module */}
      <section id="projects" className="py-32 sm:py-48 px-4 bg-slate-950">
        <div className="responsive-container">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-24 gap-10">
            <div className="max-w-2xl text-center md:text-left">
              <div className="text-slate-500 font-mono text-[10px] mb-4 tracking-[0.5em] uppercase">Module 02: Research_Archives</div>
              <h2 className="text-5xl sm:text-6xl font-bold text-white tracking-tighter uppercase leading-none">Security Test Labs</h2>
            </div>
            <div className="hidden md:block h-px flex-grow bg-slate-900 mx-12"></div>
            <div className="flex gap-4">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {PROJECTS.map((project) => (
              <div key={project.id} className="group dashboard-panel p-8 sm:p-10 rounded-[2.5rem] flex flex-col h-full overflow-hidden">
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-12">
                    <span className="bg-cyan-500/10 text-cyan-500 text-[9px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] border border-cyan-500/10">
                      SEC-CH{project.id}
                    </span>
                    <div className="text-[9px] font-mono text-slate-600">STATE: FINALIZED</div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white group-hover:text-cyan-400 transition-colors tracking-tighter leading-tight uppercase">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-12 line-clamp-4 font-medium italic">
                    "{project.caseStudy.outcome}"
                  </p>
                  <div className="mt-auto pt-10 border-t border-slate-900/50 flex flex-col gap-8">
                    <div className="flex flex-wrap gap-2.5">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[9px] font-bold text-slate-700 uppercase tracking-widest">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="w-full py-4 bg-slate-900 border border-slate-800 text-cyan-500 text-[10px] font-bold tracking-[0.4em] transition-all hover:bg-cyan-500 hover:text-slate-950 uppercase rounded-xl"
                    >
                      Access_Logs.exe
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Radar Module */}
      <section id="skills" className="py-32 sm:py-48 px-4 bg-slate-950">
        <div className="responsive-container">
          <div className="dashboard-panel rounded-[3rem] sm:rounded-[4rem] p-10 sm:p-24 shadow-inner overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/[0.02] rounded-full blur-[150px] pointer-events-none"></div>
            
            <div className="text-center mb-24 relative z-10">
              <div className="text-cyan-500 font-mono text-[11px] mb-4 tracking-[0.5em] uppercase">Module 03: Capability_Matrix</div>
              <h2 className="text-5xl sm:text-7xl font-bold text-white tracking-tighter uppercase leading-none">Audit Capacity</h2>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32 relative z-10">
              <div className="w-full lg:w-1/2 flex justify-center">
                <RadarChart skills={SKILLS} />
              </div>
              <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                {SKILLS.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-end mb-3">
                      <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest leading-none">{skill.category}</div>
                      <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-widest leading-none">{skill.name}</div>
                    </div>
                    <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                      <div 
                        className="h-full bg-cyan-500 transition-all duration-1000 group-hover:shadow-[0_0_10px_#06b6d4]" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Module */}
      <section className="py-48 sm:py-64 px-4 text-center relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/[0.03] rounded-full blur-[150px]"></div>
        </div>
        <div className="responsive-container relative z-10">
          <h2 className="text-6xl sm:text-8xl lg:text-9xl font-bold text-white mb-12 tracking-tighter uppercase leading-none">
            Secure <br/> <span className="text-cyan-500 font-black">The Core.</span>
          </h2>
          <p className="text-2xl sm:text-3xl text-slate-400 mb-20 max-w-3xl mx-auto font-medium leading-relaxed">
            Standardizing reliability for decentralized protocols. Available for high-stakes audits and lead engineering mandates.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
            <a href="mailto:alex@sentinel-core.io" className="w-full sm:w-auto px-16 py-7 bg-cyan-500 text-slate-950 font-bold uppercase tracking-[0.3em] text-[11px] transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(6,182,212,0.2)]">
              Initialize Handshake
            </a>
            <a href="#" className="w-full sm:w-auto px-16 py-7 bg-slate-900 border border-slate-800 text-slate-300 font-bold uppercase tracking-[0.3em] text-[11px] transition-all hover:bg-slate-800">
              Identity Verification
            </a>
          </div>
        </div>
      </section>

      {selectedProject && (
        <CaseStudyModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </Layout>
  );
};

export default App;