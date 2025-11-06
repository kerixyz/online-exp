export interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  num_posts: number;
}

export interface AgentParameter {
  name: string;
  type: 'float' | 'select';
  default: any;
  min?: number;
  max?: number;
  options?: string[];
  description: string;
}

export interface AgentType {
  id: string;
  name: string;
  description: string;
  parameters: AgentParameter[];
}

export interface AgentConfig {
  type: string;
  intervention_frequency: number;
  behavior_style: string;
  [key: string]: any;
}

export interface NetworkNode {
  id: string;
  degree: number;
  betweenness: number;
  pagerank: number;
  community: number;
}

export interface NetworkLink {
  source: string;
  target: string;
  weight: number;
}

export interface NetworkData {
  nodes: NetworkNode[];
  links: NetworkLink[];
}

export interface NetworkMetrics {
  num_nodes: number;
  num_edges: number;
  density: number;
  avg_clustering: number;
  reciprocity: number;
  avg_degree: number;
  max_degree: number;
  degree_std: number;
}

export interface SimulationResults {
  baseline: {
    network_metrics: NetworkMetrics;
    network_viz: NetworkData;
  };
  intervention: {
    network_metrics: NetworkMetrics;
    network_viz: NetworkData;
    interventions: any[];
  };
  impact: {
    network_change: any;
    participation_change: any;
    summary: string;
  };
  equity: {
    influence_inequality: {
      baseline_gini: number;
      intervention_gini: number;
    };
    participation_inequality: {
      baseline_gini: number;
      intervention_gini: number;
    };
    top_users_power_share: any;
  };
  config: AgentConfig;
}
