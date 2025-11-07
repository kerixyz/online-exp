import { useState } from 'react';
import CommunitySelector from '../components/Simulation/CommunitySelector';
import AgentConfig from '../components/Simulation/AgentConfig';
import SimulationRunner from '../components/Simulation/SimulationRunner';
import ResultsDashboard from '../components/Simulation/ResultsDashboard';
import { AgentConfig as AgentConfigType, SimulationResults } from '../types';

export default function SimulationPage() {
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const [agentConfig, setAgentConfig] = useState<AgentConfigType | null>(null);
  const [results, setResults] = useState<SimulationResults | null>(null);

  return (
    <div className="container">
      <div className="card" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Interactive Simulation Platform</h1>
        <p style={{ opacity: 0.7 }}>
          Configure AI agents and analyze their impact on community dynamics
        </p>
      </div>

      <CommunitySelector
        selectedCommunity={selectedCommunity}
        onSelect={setSelectedCommunity}
      />

      <AgentConfig
        currentConfig={agentConfig}
        onConfigChange={setAgentConfig}
      />

      <SimulationRunner
        communityId={selectedCommunity}
        agentConfig={agentConfig}
        onResults={setResults}
      />

      {results && <ResultsDashboard results={results} />}
    </div>
  );
}
