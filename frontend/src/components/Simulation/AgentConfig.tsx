import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { AgentType, AgentConfig as AgentConfigType } from '../../types';

interface AgentConfigProps {
  onConfigChange: (config: AgentConfigType) => void;
  currentConfig: AgentConfigType | null;
}

export default function AgentConfig({ onConfigChange, currentConfig }: AgentConfigProps) {
  const [agentTypes, setAgentTypes] = useState<AgentType[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [config, setConfig] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAgentTypes();
  }, []);

  const loadAgentTypes = async () => {
    try {
      const types = await api.getAgentTypes();
      setAgentTypes(types);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load agent types:', err);
      setLoading(false);
    }
  };

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    const agentType = agentTypes.find(t => t.id === typeId);

    if (agentType) {
      // Initialize config with default values
      const defaultConfig: any = { type: typeId };
      agentType.parameters.forEach(param => {
        defaultConfig[param.name] = param.default;
      });
      setConfig(defaultConfig);
      onConfigChange(defaultConfig);
    }
  };

  const handleParamChange = (paramName: string, value: any) => {
    const newConfig = { ...config, [paramName]: value };
    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  if (loading) {
    return <div className="loading">Loading agent types...</div>;
  }

  const selectedAgentType = agentTypes.find(t => t.id === selectedType);

  return (
    <div className="card">
      <h2>Step 2: Configure AI Agent</h2>
      <p style={{ marginBottom: '1.5rem', color: '#666' }}>
        Select an AI agent type and configure its behavior parameters.
      </p>

      <div className="form-group">
        <label>Agent Type</label>
        <select
          value={selectedType}
          onChange={(e) => handleTypeSelect(e.target.value)}
          style={{ cursor: 'pointer' }}
        >
          <option value="">-- Select Agent Type --</option>
          {agentTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      {selectedAgentType && (
        <>
          <div style={{
            padding: '1rem',
            background: '#f8f9ff',
            borderRadius: '8px',
            marginBottom: '1.5rem'
          }}>
            <p style={{ color: '#667eea', fontWeight: 500 }}>
              {selectedAgentType.description}
            </p>
          </div>

          <h3 style={{ marginBottom: '1rem' }}>Parameters</h3>

          {selectedAgentType.parameters.map((param) => (
            <div key={param.name} className="form-group">
              <label>
                {param.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </label>

              {param.type === 'float' && (
                <>
                  <input
                    type="range"
                    min={param.min}
                    max={param.max}
                    step="0.01"
                    value={config[param.name] || param.default}
                    onChange={(e) => handleParamChange(param.name, parseFloat(e.target.value))}
                    style={{ width: '100%' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                    <small>Value: {config[param.name]?.toFixed(2) || param.default}</small>
                    <small>Range: {param.min} - {param.max}</small>
                  </div>
                </>
              )}

              {param.type === 'select' && (
                <select
                  value={config[param.name] || param.default}
                  onChange={(e) => handleParamChange(param.name, e.target.value)}
                  style={{ cursor: 'pointer' }}
                >
                  {param.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}

              <small>{param.description}</small>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
