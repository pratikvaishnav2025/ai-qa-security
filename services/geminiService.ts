import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateQualityBlueprint = async (requirement: string): Promise<string> => {
  const ai = getAIClient();
  const prompt = `
    As a Web3 Security Lead and QA Architect, analyze this protocol requirement: "${requirement}"
    
    Provide a dual-part response:
    1. BEHAVIORAL SPEC (GHERKIN): Comprehensive Feature file including security invariants and edge cases.
    2. FOUNDRY/JAVA TEST HARNESS: Page Object Model or Test Suite template for validating these behaviors in a Web3 context.
    
    Format with headers: "### GHERKIN SCENARIOS" and "### TEST HARNESS BLUEPRINT".
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: { temperature: 0.5 }
  });

  return response.text || "Analysis failed.";
};

export const generateArchitectureDesign = async (requirement: string): Promise<string> => {
  const ai = getAIClient();
  const prompt = `
    As a Senior Blockchain Architect, design a secure, high-availability architecture for: "${requirement}"
    
    Response must include:
    1. TOPOLOGY: A valid Mermaid.js graph code block showing protocol layers, oracles, and security gates.
    2. THREAT MODEL: Rationale focusing on smart contract security, MEV protection, and decentralization.
    3. AUDIT STACK: Recommended security tools (Foundry, Slither, Halmos, etc.).
    
    Headers: "### ARCHITECTURE DIAGRAM", "### SECURITY RATIONALE", "### AUDIT STACK".
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: { temperature: 0.4 }
  });

  return response.text || "Design failed.";
};

export const reviewJavaCode = async (code: string): Promise<string> => {
  const ai = getAIClient();
  const prompt = `
    Act as a Security Auditor. Review this implementation for:
    1. Vulnerabilities (Injection, Logic errors, Re-entrancy patterns).
    2. Performance bottlenecks in high-frequency data processing.
    3. Best practices for secure Java backend logic.
    
    Code:
    \`\`\`java
    ${code}
    \`\`\`
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: { temperature: 0.3 }
  });

  return response.text || "Audit failed.";
};

export const explainJavaCode = async (code: string): Promise<string> => {
  const ai = getAIClient();
  const prompt = `
    Act as a Technical Security Writer. Explain this logic for both non-technical stakeholders (audit summary) 
    and developers (deep-dive logic breakdown).
    
    Code:
    \`\`\`java
    ${code}
    \`\`\`
    
    Headers: "### SECURITY SUMMARY", "### LOGIC FLOW", "### DEVELOPER DEEP DIVE".
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: { temperature: 0.3 }
  });

  return response.text || "Explanation failed.";
};