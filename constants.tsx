import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'DeFi Stress-Test Engine',
    description: 'Autonomous load testing framework simulating 10k+ concurrent swaps on EVM forks.',
    tags: ['Foundry', 'Go', 'Docker', 'Grafana'],
    link: '#',
    category: 'ProtocolSecurity',
    caseStudy: {
      outcome: "Identified critical race condition in liquidity pool rebalancing before mainnet deployment.",
      context: "A Top-10 DEX required validation of high-frequency trading scenarios under extreme network congestion.",
      contributions: [
        "Architected a distributed bot-net simulation using Golang and Docker Swarm.",
        "Developed custom Foundry scripts for automated state-fuzzing of Solidity contracts.",
        "Integrated real-time slippage monitoring using Prometheus/Grafana.",
        "Automated gas-optimization audits for contract deployment pipelines."
      ],
      challenges: [
        "EVM Fork Drift: Solved by implementing dynamic state-syncing between local Anvil forks and mainnet.",
        "Data Volatility: Built a mock price oracle to simulate flash-crash events safely."
      ],
      improvements: [
        "Extend support to Solana Sealevel via Anchor framework testing.",
        "Integrate Formal Verification for mathematical invariant checking."
      ]
    }
  },
  {
    id: '2',
    title: 'Sentinel Quality Gateway',
    description: 'CI/CD security gate enforcing smart contract audit coverage and dependency scanning.',
    tags: ['Slither', 'Mythril', 'Java 21', 'GitHub Actions'],
    link: '#',
    category: 'SmartContract',
    caseStudy: {
      outcome: "Reduced smart contract vulnerability surface by 40% through automated static analysis.",
      context: "Multi-chain protocol suite needing automated enforcement of security standards across 50+ repositories.",
      contributions: [
        "Developed a custom Slither wrapper in Java to standardize audit reporting.",
        "Integrated Mythril symbolic execution into the main branch merge requirements.",
        "Created an automated dependency auditor for npm/crates.io packages used in bridge logic.",
        "Built a central vulnerability dashboard for cross-team risk assessment."
      ],
      challenges: [
        "False Positives: Implemented an AI-driven filter (Gemini-based) to prioritize high-confidence issues.",
        "Scan Latency: Optimized static analysis rulesets to run incrementally on changed files only."
      ],
      improvements: [
        "Add automated 'Bridge' testing for cross-chain message integrity.",
        "Implement 'Bug Bounty' auto-triaging for incoming security reports."
      ]
    }
  },
  {
    id: '3',
    title: 'Reliability Oracle',
    description: 'High-availability QA harness for real-time price feed validation.',
    tags: ['Spring Boot', 'Kafka', 'PostgreSQL', 'JUnit 5'],
    link: '#',
    category: 'QAAutomation',
    caseStudy: {
      outcome: "Maintained 99.99% oracle accuracy during the 2024 market volatility events.",
      context: "Financial service requiring sub-second validation of data integrity across multiple oracle providers.",
      contributions: [
        "Built a Kafka-based consumer to monitor multiple data streams (Chainlink, Pyth, Redstone).",
        "Implemented anomaly detection algorithms in Java to trigger automatic circuit breakers.",
        "Optimized persistence layer for millisecond-scale time-series analysis.",
        "Established automated regression suites for edge-case price movements."
      ],
      challenges: [
        "Provider Latency: Implemented weighted average calculations to handle slow-responding nodes.",
        "Data Inconsistency: Solved via median-filtering of outliers across 15+ sources."
      ],
      improvements: [
        "Transition to a fully decentralized validation node architecture.",
        "Integrate ZK-proofs for data-source provenance verification."
      ]
    }
  }
];

export const SKILLS: Skill[] = [
  { name: 'Solidity Auditing', level: 90, category: 'Security' },
  { name: 'Foundry/Hardhat', level: 92, category: 'Blockchain' },
  { name: 'Java Security Frameworks', level: 95, category: 'QA' },
  { name: 'K8s Security', level: 85, category: 'Infrastructure' },
  { name: 'Fuzzing & Symbolic Execution', level: 82, category: 'Security' },
  { name: 'API Penetration Testing', level: 88, category: 'Security' }
];