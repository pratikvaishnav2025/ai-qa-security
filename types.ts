export interface CaseStudy {
  outcome: string;
  context: string;
  contributions: string[];
  challenges: string[];
  improvements: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  category: 'SmartContract' | 'ProtocolSecurity' | 'QAAutomation';
  caseStudy: CaseStudy;
}

export interface Skill {
  name: string;
  level: number; // 1-100
  category: 'Blockchain' | 'Security' | 'QA' | 'Infrastructure';
}

export enum AIToolType {
  GHERKIN_GEN = 'GHERKIN_GEN',
  VULN_AUDIT = 'VULN_AUDIT',
  ARCH_COPILOT = 'ARCH_COPILOT',
  CODE_EXPLAINER = 'CODE_EXPLAINER'
}