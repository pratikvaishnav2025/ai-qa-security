import React, { useState, useEffect, useRef, useMemo } from 'react';
import { generateQualityBlueprint, reviewJavaCode, explainJavaCode, generateArchitectureDesign } from '../services/geminiService';
import { AIToolType } from '../types';

declare global {
  interface Window {
    mermaid: any;
  }
}

interface GherkinStep {
  keyword: string;
  text: string;
}

interface GherkinScenario {
  name: string;
  steps: GherkinStep[];
}

interface GherkinFeature {
  name: string;
  scenarios: GherkinScenario[];
}

const LOADING_MESSAGES: Record<AIToolType, string[]> = {
  [AIToolType.GHERKIN_GEN]: [
    "Decrypting protocol specs...",
    "Simulating multi-vector attacks...",
    "Defining behavioral invariants...",
    "Generating Foundry test harness...",
    "Synthesizing security blueprint..."
  ],
  [AIToolType.VULN_AUDIT]: [
    "Compiling Bytecode AST...",
    "Scanning for Re-entrancy patterns...",
    "Analyzing ownership privilege...",
    "Checking for overflow protection...",
    "Generating audit report..."
  ],
  [AIToolType.CODE_EXPLAINER]: [
    "Deconstructing complex logic...",
    "Translating for auditors...",
    "Mapping data flow dependencies...",
    "Highlighting critical pathways...",
    "Generating Logic Summary..."
  ],
  [AIToolType.ARCH_COPILOT]: [
    "Processing network constraints...",
    "Designing oracle pathways...",
    "Mapping security gates...",
    "Validating decentralization...",
    "Finalizing Topology..."
  ]
};

const GherkinVisualizer: React.FC<{ rawText: string }> = ({ rawText }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const feature = useMemo(() => {
    const lines = rawText.split('\n');
    const parsed: GherkinFeature = { name: 'Untitled Audit', scenarios: [] };
    let currentScenario: GherkinScenario | null = null;

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('Feature:')) {
        parsed.name = trimmed.replace('Feature:', '').trim();
      } else if (trimmed.startsWith('Scenario:') || trimmed.startsWith('Example:')) {
        currentScenario = { name: trimmed.replace(/Scenario:|Example:/, '').trim(), steps: [] };
        parsed.scenarios.push(currentScenario);
      } else if (currentScenario && /^(Given|When|Then|And|But)\s/i.test(trimmed)) {
        const parts = trimmed.split(/\s+/);
        currentScenario.steps.push({
          keyword: parts[0],
          text: parts.slice(1).join(' ')
        });
      }
    });
    return parsed;
  }, [rawText]);

  if (feature.scenarios.length === 0) return (
    <div className="flex flex-col items-center justify-center h-full py-24 text-slate-500">
      <p className="text-xs font-bold uppercase tracking-widest text-center px-4">No valid Gherkin found for visualization</p>
    </div>
  );

  return (
    <div ref={containerRef} className="w-full h-full min-h-[500px] overflow-auto bg-slate-950/20 rounded-3xl border border-cyan-500/10 p-6 sm:p-10 relative">
      <div className="flex flex-col items-center min-w-[800px]">
        
        <div className="relative z-20 group mb-24">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-slate-900 border border-cyan-500/50 px-10 py-5 rounded-2xl shadow-2xl flex flex-col items-center">
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] mb-2">Audit Vector</span>
            <h4 className="text-white font-black text-lg text-center max-w-md leading-tight">{feature.name}</h4>
          </div>
        </div>

        <div className="relative flex justify-center gap-12 w-full pt-10">
          <svg className="absolute top-[-96px] left-0 w-full h-24 pointer-events-none overflow-visible">
            {feature.scenarios.map((_, idx) => {
              const scenarioCount = feature.scenarios.length;
              const spacing = 100 / (scenarioCount + 1);
              const xPos = `${(idx + 1) * spacing}%`;
              return (
                <path 
                  key={idx}
                  d={`M 50% 0 C 50% 50, ${xPos} 50, ${xPos} 96`}
                  fill="none"
                  stroke="rgba(6, 182, 212, 0.4)"
                  strokeWidth="2"
                  className="animate-pulse"
                />
              );
            })}
          </svg>

          {feature.scenarios.map((scenario, sIdx) => (
            <div key={sIdx} className="relative flex flex-col items-center w-full max-w-[320px]">
              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 p-8 rounded-[2rem] w-full hover:border-cyan-500/50 transition-all duration-500 shadow-xl group">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-black text-xs">{sIdx + 1}</div>
                </div>
                <h5 className="text-white font-bold text-base mb-8 leading-tight group-hover:text-cyan-400 transition-colors">{scenario.name}</h5>
                <div className="space-y-6">
                  {scenario.steps.map((step, tIdx) => (
                    <div key={tIdx} className="flex gap-4 items-start relative">
                      <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center border text-[8px] font-black uppercase transition-colors ${
                        step.keyword.toLowerCase() === 'given' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' :
                        step.keyword.toLowerCase() === 'when' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                        step.keyword.toLowerCase() === 'then' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 
                        'bg-slate-800 border-slate-700 text-slate-500'
                      }`}>
                        {step.keyword[0]}
                      </div>
                      <div>
                        <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">{step.keyword}</span>
                        <p className="text-[12px] text-slate-300 leading-relaxed font-medium">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SAMPLES = {
  [AIToolType.GHERKIN_GEN]: "Liquidity pool should prevent re-entrancy during multi-token swaps. Flashloan spikes must not trigger oracle circuit breakers incorrectly.",
  [AIToolType.VULN_AUDIT]: "public void updatePrice(long price) {\n  if(price < 0) throw new IllegalArgumentException();\n  this.currentPrice = price;\n  notifySubscribers();\n}",
  [AIToolType.ARCH_COPILOT]: "Architect a cross-chain bridge using LayerZero with decentralized validation nodes and a 24h delay for large withdrawals.",
  [AIToolType.CODE_EXPLAINER]: "public List<Transaction> filterSuspect(List<Transaction> txs) {\n  return txs.stream()\n    .filter(t -> t.getAmount() > THRESHOLD)\n    .filter(t -> !t.isVerified())\n    .collect(Collectors.toList());\n}"
};

export const AITools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AIToolType>(AIToolType.GHERKIN_GEN);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'CODE' | 'VISUAL'>('CODE');
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: any;
    if (loading) {
      setLoadingStage(0);
      interval = setInterval(() => {
        setLoadingStage(prev => (prev < 4 ? prev + 1 : prev));
      }, 1500);
    } else {
      setLoadingStage(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (output && activeTab === AIToolType.ARCH_COPILOT && window.mermaid) {
      const mermaidCode = output.match(/```mermaid([\s\S]*?)```/);
      if (mermaidCode && mermaidRef.current) {
        try {
          const code = mermaidCode[1].trim();
          mermaidRef.current.innerHTML = `<div class="mermaid">${code}</div>`;
          window.mermaid.init(undefined, mermaidRef.current.querySelectorAll('.mermaid'));
        } catch (e) {
          console.error("Mermaid error", e);
        }
      }
    }
  }, [output, activeTab]);

  const handleProcess = async () => {
    setLoading(true);
    setCopied(false);
    setOutput('');
    try {
      let result = '';
      if (activeTab === AIToolType.GHERKIN_GEN) result = await generateQualityBlueprint(input);
      else if (activeTab === AIToolType.VULN_AUDIT) result = await reviewJavaCode(input);
      else if (activeTab === AIToolType.CODE_EXPLAINER) result = await explainJavaCode(input);
      else if (activeTab === AIToolType.ARCH_COPILOT) result = await generateArchitectureDesign(input);
      setOutput(result);
    } catch (error) {
      setOutput("Error: Node timeout. Verify GEMINI_API_KEY.");
    } finally {
      setLoading(false);
    }
  };

  const gherkinText = useMemo(() => {
    if (activeTab !== AIToolType.GHERKIN_GEN) return '';
    const match = output.match(/### GHERKIN SCENARIOS([\s\S]*?)(###|$)/i);
    if (match) return match[1].trim();
    return '';
  }, [output, activeTab]);

  return (
    <section id="ai-tools" className="py-24 sm:py-32 lg:py-48 px-4 bg-slate-950 border-y border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20 flex flex-col md:flex-row justify-between items-center md:items-end gap-10 text-center md:text-left">
          <div className="max-w-xl">
            <h2 className="text-4xl sm:text-5xl font-black mb-6 text-white tracking-tighter uppercase leading-tight">Security Intelligence Engine</h2>
            <p className="text-slate-400 text-lg sm:text-xl font-medium leading-relaxed">AI-powered auditor for automated vulnerability research and architectural modeling.</p>
          </div>
          <div className="px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-500 font-mono text-[10px] uppercase tracking-widest whitespace-nowrap">
            MODEL: GEMINI_3_FLASH // STATUS: READY
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 sm:p-12 flex flex-col shadow-2xl">
            <div className="flex p-1.5 bg-slate-950 rounded-2xl mb-10 flex-wrap gap-1 border border-slate-800">
              {[
                { id: AIToolType.GHERKIN_GEN, label: 'Audit Spec' },
                { id: AIToolType.VULN_AUDIT, label: 'Vuln Scan' },
                { id: AIToolType.CODE_EXPLAINER, label: 'Logic Map' },
                { id: AIToolType.ARCH_COPILOT, label: 'Topology' }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setInput(''); setOutput(''); setViewMode('CODE'); }}
                  className={`flex-1 min-w-[100px] px-4 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${activeTab === tab.id ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex-grow flex flex-col gap-8">
              <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Target Payload</label>
                <button onClick={() => setInput(SAMPLES[activeTab])} className="text-[10px] font-black text-cyan-500 hover:text-cyan-400 border-b border-transparent hover:border-cyan-400 pb-0.5 transition-all uppercase">LOAD_SAMPLE.dat</button>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full flex-grow bg-slate-950 border border-slate-800 rounded-3xl p-8 text-sm sm:text-base mono text-cyan-500/90 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none placeholder-slate-800 resize-none min-h-[300px] lg:min-h-[400px] transition-all"
                placeholder="Enter protocol requirements or code snippets..."
              />
              <button
                onClick={handleProcess}
                disabled={loading || !input.trim()}
                className="w-full py-6 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 text-slate-950 font-black uppercase tracking-widest transition-all rounded-[1.5rem] relative overflow-hidden active:scale-[0.98]"
              >
                {loading && (
                  <div className="absolute inset-0 bg-cyan-600/50 flex items-center justify-start">
                    <div className="h-full bg-cyan-200/50 transition-all duration-700" style={{ width: `${(loadingStage + 1) * 20}%` }} />
                  </div>
                )}
                <span className="relative z-10 text-sm sm:text-base">{loading ? LOADING_MESSAGES[activeTab][loadingStage] : "Execute Audit"}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-[2.5rem] flex flex-col overflow-hidden relative shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
            <div className="p-6 sm:p-8 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-6 bg-slate-900/50">
              <div className="flex gap-6 items-center w-full sm:w-auto justify-center sm:justify-start">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Output_Buffer</span>
                {activeTab === AIToolType.GHERKIN_GEN && output && (
                  <div className="flex bg-slate-950 rounded-xl p-1 border border-slate-800">
                    <button onClick={() => setViewMode('CODE')} className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all ${viewMode === 'CODE' ? 'bg-cyan-500 text-slate-950' : 'text-slate-500'}`}>CODE</button>
                    <button onClick={() => setViewMode('VISUAL')} className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all ${viewMode === 'VISUAL' ? 'bg-cyan-500 text-slate-950' : 'text-slate-500'}`}>MAP</button>
                  </div>
                )}
              </div>
              {output && (
                <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),2000); }} className="w-full sm:w-auto px-6 py-2 bg-slate-950 border border-slate-800 rounded-lg text-[10px] font-black text-cyan-500 hover:text-cyan-400 transition-all uppercase tracking-widest">
                  {copied ? 'BUFFER_COPIED' : 'DOWNLOAD_LOGS.bin'}
                </button>
              )}
            </div>
            
            <div className="flex-grow flex flex-col overflow-hidden bg-slate-950">
              {activeTab === AIToolType.ARCH_COPILOT && output && (
                 <div ref={mermaidRef} className="p-10 bg-white/[0.02] border-b border-slate-900 min-h-[350px] flex items-center justify-center overflow-x-auto relative">
                    <div className="absolute top-6 left-6 text-[8px] font-black text-cyan-500/40 uppercase tracking-[0.3em]">Topology Visualization</div>
                 </div>
              )}
              <div className="flex-grow overflow-y-auto max-h-[700px] relative custom-scrollbar">
                {output ? (
                  viewMode === 'VISUAL' && activeTab === AIToolType.GHERKIN_GEN ? (
                    <div className="p-4 h-full"><GherkinVisualizer rawText={gherkinText} /></div>
                  ) : (
                    <div className="p-8 sm:p-12 text-sm sm:text-base mono leading-relaxed text-slate-300 whitespace-pre-wrap selection:bg-cyan-500/20">{output.replace(/```mermaid[\s\S]*?```/g, '')}</div>
                  )
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-800 py-32 lg:py-48 px-10">
                    {loading ? (
                      <div className="flex flex-col items-center gap-10">
                        <div className="relative">
                          <div className="w-16 h-16 border-4 border-cyan-500/10 rounded-full"></div>
                          <div className="absolute inset-0 w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <span className="text-[11px] font-black text-cyan-500 uppercase tracking-[0.4em] animate-pulse text-center">{LOADING_MESSAGES[activeTab][loadingStage]}</span>
                      </div>
                    ) : (
                      <>
                        <div className="w-24 h-24 border-2 border-slate-900 rounded-full flex items-center justify-center opacity-20 mb-10">
                           <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15l-3-3m0 0l3-3m-3 3h8M5 12h1m14 0h1" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-center max-w-xs opacity-40">Security Engine Standby. Awaiting requirements payload.</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};