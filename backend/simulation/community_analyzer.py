"""
Community Analyzer - Simulates AI agent interventions and analyzes outcomes
"""

import random
import copy
from typing import Dict, List, Any
import numpy as np
from .agent_models import create_agent
from .network_builder import CommunityNetwork


class CommunitySimulator:
    """Runs simulations of AI agent interventions in online communities"""

    def __init__(self, community_data: Dict[str, Any], agent_config: Dict[str, Any]):
        self.original_data = copy.deepcopy(community_data)
        self.community_data = community_data
        self.agent_config = agent_config
        self.agent = create_agent(agent_config['type'], agent_config)
        self.interventions = []

    def simulate(self, num_steps: int = 100) -> Dict[str, Any]:
        """
        Run simulation with AI agent interventions
        Returns analysis results and metrics
        """
        # Build baseline network
        baseline_network = CommunityNetwork(self.original_data)
        baseline_metrics = baseline_network.calculate_network_metrics()
        baseline_centrality = baseline_network.calculate_centrality_metrics()

        # Apply agent interventions
        self._apply_interventions()

        # Build post-intervention network
        intervention_network = CommunityNetwork(self.community_data)
        intervention_metrics = intervention_network.calculate_network_metrics()
        intervention_centrality = intervention_network.calculate_centrality_metrics()

        # Calculate impact metrics
        impact_analysis = self._analyze_impact(
            baseline_metrics,
            intervention_metrics,
            baseline_centrality,
            intervention_centrality
        )

        # Calculate equity metrics
        equity_metrics = self._calculate_equity_metrics(
            baseline_centrality,
            intervention_centrality
        )

        return {
            'baseline': {
                'network_metrics': baseline_metrics,
                'centrality': baseline_centrality,
                'network_viz': baseline_network.get_network_data_for_viz()
            },
            'intervention': {
                'network_metrics': intervention_metrics,
                'centrality': intervention_centrality,
                'network_viz': intervention_network.get_network_data_for_viz(),
                'interventions': self.interventions
            },
            'impact': impact_analysis,
            'equity': equity_metrics,
            'config': self.agent_config
        }

    def _apply_interventions(self):
        """Apply AI agent interventions to community posts"""
        posts = self.community_data.get('posts', [])

        # Add synthetic scores for simulation
        for post in posts:
            post['toxicity'] = random.random()
            post['quality'] = random.random()
            post['conflict'] = random.random()

            # Get author centrality if available
            post['author_centrality'] = random.random()

        # Agent interventions
        for post in posts:
            if self.agent.should_intervene():
                intervention = self.agent.intervene(post, self.community_data)
                if intervention['action']:
                    self.interventions.append(intervention)

        # Simulate network changes based on interventions
        self._simulate_network_effects()

    def _simulate_network_effects(self):
        """Simulate how interventions affect network structure"""
        posts = self.community_data.get('posts', [])

        for post in posts:
            # Removed posts don't generate new interactions
            if post.get('removed', False):
                post['comments'] = post['comments'][:len(post['comments'])//2]

            # Amplified posts get more engagement
            if post.get('visibility_boost', 1.0) > 1.0:
                # Simulate additional comments
                boost_factor = post['visibility_boost']
                new_comments = int(len(post['comments']) * (boost_factor - 1))
                for _ in range(new_comments):
                    post['comments'].append({
                        'author': f"user_{random.randint(1000, 9999)}",
                        'text': "Engagement from visibility boost"
                    })

    def _analyze_impact(
        self,
        baseline_metrics: Dict[str, float],
        intervention_metrics: Dict[str, float],
        baseline_centrality: Dict[str, Dict[str, float]],
        intervention_centrality: Dict[str, Dict[str, float]]
    ) -> Dict[str, Any]:
        """Analyze the impact of AI interventions"""

        impact = {
            'network_change': {},
            'participation_change': {},
            'summary': ''
        }

        # Network structure changes
        for metric in ['density', 'avg_clustering', 'reciprocity', 'avg_degree']:
            baseline_val = baseline_metrics.get(metric, 0)
            intervention_val = intervention_metrics.get(metric, 0)

            if baseline_val != 0:
                percent_change = ((intervention_val - baseline_val) / baseline_val) * 100
            else:
                percent_change = 0

            impact['network_change'][metric] = {
                'baseline': baseline_val,
                'intervention': intervention_val,
                'percent_change': percent_change
            }

        # Participation distribution
        impact['participation_change'] = {
            'total_interventions': len(self.interventions),
            'intervention_breakdown': self._count_intervention_types()
        }

        # Generate summary
        impact['summary'] = self._generate_impact_summary(impact)

        return impact

    def _calculate_equity_metrics(
        self,
        baseline_centrality: Dict[str, Dict[str, float]],
        intervention_centrality: Dict[str, Dict[str, float]]
    ) -> Dict[str, Any]:
        """Calculate equity and power distribution metrics"""

        def gini_coefficient(values: List[float]) -> float:
            """Calculate Gini coefficient for inequality measurement"""
            if not values or len(values) == 0:
                return 0
            sorted_values = sorted(values)
            n = len(values)
            cumsum = np.cumsum(sorted_values)
            return (n + 1 - 2 * np.sum(cumsum) / cumsum[-1]) / n if cumsum[-1] != 0 else 0

        # Calculate Gini for different centrality measures
        baseline_pagerank = [v['pagerank'] for v in baseline_centrality.values()]
        intervention_pagerank = [v['pagerank'] for v in intervention_centrality.values()]

        baseline_degree = [v['degree'] for v in baseline_centrality.values()]
        intervention_degree = [v['degree'] for v in intervention_centrality.values()]

        return {
            'influence_inequality': {
                'baseline_gini': gini_coefficient(baseline_pagerank),
                'intervention_gini': gini_coefficient(intervention_pagerank)
            },
            'participation_inequality': {
                'baseline_gini': gini_coefficient(baseline_degree),
                'intervention_gini': gini_coefficient(intervention_degree)
            },
            'top_users_power_share': self._calculate_top_user_share(
                baseline_centrality,
                intervention_centrality
            )
        }

    def _calculate_top_user_share(
        self,
        baseline_centrality: Dict[str, Dict[str, float]],
        intervention_centrality: Dict[str, Dict[str, float]]
    ) -> Dict[str, Any]:
        """Calculate share of influence held by top 10% of users"""

        def top_share(centrality: Dict[str, Dict[str, float]], metric: str) -> float:
            values = [(user, data[metric]) for user, data in centrality.items()]
            values.sort(key=lambda x: x[1], reverse=True)
            top_n = max(1, len(values) // 10)  # Top 10%
            top_sum = sum([v[1] for v in values[:top_n]])
            total_sum = sum([v[1] for v in values])
            return (top_sum / total_sum * 100) if total_sum > 0 else 0

        return {
            'baseline_top10_influence': top_share(baseline_centrality, 'pagerank'),
            'intervention_top10_influence': top_share(intervention_centrality, 'pagerank')
        }

    def _count_intervention_types(self) -> Dict[str, int]:
        """Count different types of interventions"""
        counts = {}
        for intervention in self.interventions:
            action = intervention.get('action', 'none')
            counts[action] = counts.get(action, 0) + 1
        return counts

    def _generate_impact_summary(self, impact: Dict[str, Any]) -> str:
        """Generate human-readable summary of impact"""
        network_changes = impact['network_change']

        density_change = network_changes.get('density', {}).get('percent_change', 0)
        clustering_change = network_changes.get('avg_clustering', {}).get('percent_change', 0)

        summary_parts = []

        if abs(density_change) > 5:
            direction = "increased" if density_change > 0 else "decreased"
            summary_parts.append(f"Network density {direction} by {abs(density_change):.1f}%")

        if abs(clustering_change) > 5:
            direction = "increased" if clustering_change > 0 else "decreased"
            summary_parts.append(f"Clustering {direction} by {abs(clustering_change):.1f}%")

        total_interventions = impact['participation_change']['total_interventions']
        summary_parts.append(f"{total_interventions} total interventions")

        return ". ".join(summary_parts) + "." if summary_parts else "Minimal impact observed."
