import axios from 'axios';
import { Community, AgentType, AgentConfig, SimulationResults } from '../types';

// Use environment variable for API URL, fallback to proxy in development
const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

export const api = {
  async healthCheck() {
    const response = await axios.get(`${API_BASE}/health`);
    return response.data;
  },

  async getCommunities(): Promise<Community[]> {
    const response = await axios.get(`${API_BASE}/communities`);
    return response.data.communities;
  },

  async getCommunityData(communityId: string) {
    const response = await axios.get(`${API_BASE}/community/${communityId}`);
    return response.data;
  },

  async getAgentTypes(): Promise<AgentType[]> {
    const response = await axios.get(`${API_BASE}/agent-types`);
    return response.data.agent_types;
  },

  async runSimulation(
    communityId: string,
    agentConfig: AgentConfig,
    numSteps: number = 100
  ): Promise<SimulationResults> {
    const response = await axios.post(`${API_BASE}/simulate`, {
      community_id: communityId,
      agent_config: agentConfig,
      num_steps: numSteps
    });
    return response.data;
  }
};
