import { useState } from 'react';
import { api } from '../../services/api';
import { AgentConfig, SimulationResults } from '../../types';

interface SimulationRunnerProps {
  communityId: string | null;
  agentConfig: AgentConfig | null;
  onResults: (results: SimulationResults) => void;
}

export default function SimulationRunner({ communityId, agentConfig, onResults }: SimulationRunnerProps) {
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const canRun = communityId && agentConfig && agentConfig.type;

  const runSimulation = async () => {
    if (!communityId || !agentConfig) return;

    try {
      setRunning(true);
      setError(null);
      setProgress(0);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const results = await api.runSimulation(communityId, agentConfig, 100);

      clearInterval(progressInterval);
      setProgress(100);

      setTimeout(() => {
        onResults(results);
        setRunning(false);
      }, 500);

    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Simulation failed');
      setRunning(false);
    }
  };

  return (
    <div className="card">
      <h2>Step 3: Run Simulation</h2>

      {!canRun && (
        <p style={{ color: '#888', marginBottom: '1rem' }}>
          Please select a community and configure an agent to run the simulation.
        </p>
      )}

      {error && (
        <div className="error" style={{ marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {running && (
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ marginBottom: '0.5rem' }}>Running simulation...</p>
          <div style={{
            width: '100%',
            height: '20px',
            background: '#e0e0e0',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              transition: 'width 0.3s'
            }} />
          </div>
          <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.5rem' }}>
            {progress}% complete
          </p>
        </div>
      )}

      {agentConfig && (
        <div style={{
          padding: '1rem',
          background: '#f8f9ff',
          borderRadius: '8px',
          marginBottom: '1.5rem'
        }}>
          <h4 style={{ marginBottom: '0.5rem' }}>Current Configuration:</h4>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            <li><strong>Agent Type:</strong> {agentConfig.type}</li>
            <li><strong>Intervention Frequency:</strong> {(agentConfig.intervention_frequency * 100).toFixed(0)}%</li>
            <li><strong>Behavior Style:</strong> {agentConfig.behavior_style}</li>
          </ul>
        </div>
      )}

      <button
        className="button"
        onClick={runSimulation}
        disabled={!canRun || running}
        style={{ width: '100%' }}
      >
        {running ? 'Running Simulation...' : 'Run Simulation'}
      </button>

      <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '1rem' }}>
        The simulation will analyze community interactions and model the impact of your configured AI agent.
      </p>
    </div>
  );
}
