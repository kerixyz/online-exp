"""
Network Builder - Constructs social network graphs from community data
"""

import networkx as nx
from typing import Dict, List, Any
import numpy as np


class CommunityNetwork:
    """Builds and analyzes community interaction networks"""

    def __init__(self, community_data: Dict[str, Any]):
        self.community_data = community_data
        self.graph = nx.DiGraph()
        self._build_network()

    def _build_network(self):
        """Construct network from posts and comments"""
        posts = self.community_data.get('posts', [])

        # Add nodes (users)
        users = set()
        for post in posts:
            users.add(post['author'])
            for comment in post.get('comments', []):
                users.add(comment['author'])

        self.graph.add_nodes_from(users)

        # Add edges (interactions)
        for post in posts:
            post_author = post['author']
            for comment in post.get('comments', []):
                comment_author = comment['author']
                # Create edge from commenter to post author
                if self.graph.has_edge(comment_author, post_author):
                    self.graph[comment_author][post_author]['weight'] += 1
                else:
                    self.graph.add_edge(comment_author, post_author, weight=1)

    def calculate_centrality_metrics(self) -> Dict[str, Dict[str, float]]:
        """Calculate various centrality metrics for network analysis"""
        metrics = {}

        # Degree centrality
        degree_centrality = nx.degree_centrality(self.graph)

        # Betweenness centrality
        betweenness_centrality = nx.betweenness_centrality(self.graph)

        # PageRank (influence)
        pagerank = nx.pagerank(self.graph)

        # Combine metrics
        for node in self.graph.nodes():
            metrics[node] = {
                'degree': degree_centrality.get(node, 0),
                'betweenness': betweenness_centrality.get(node, 0),
                'pagerank': pagerank.get(node, 0)
            }

        return metrics

    def detect_communities(self) -> Dict[str, int]:
        """Detect sub-communities using modularity-based clustering"""
        # Convert to undirected for community detection
        undirected = self.graph.to_undirected()

        # Use greedy modularity communities
        communities = nx.community.greedy_modularity_communities(undirected)

        # Map nodes to community IDs
        node_to_community = {}
        for i, community in enumerate(communities):
            for node in community:
                node_to_community[node] = i

        return node_to_community

    def calculate_network_metrics(self) -> Dict[str, Any]:
        """Calculate overall network health metrics"""
        metrics = {
            'num_nodes': self.graph.number_of_nodes(),
            'num_edges': self.graph.number_of_edges(),
            'density': nx.density(self.graph),
            'avg_clustering': nx.average_clustering(self.graph.to_undirected()),
        }

        # Calculate reciprocity (mutual interactions)
        if self.graph.number_of_edges() > 0:
            metrics['reciprocity'] = nx.reciprocity(self.graph)
        else:
            metrics['reciprocity'] = 0

        # Degree distribution stats
        degrees = [d for n, d in self.graph.degree()]
        if degrees:
            metrics['avg_degree'] = np.mean(degrees)
            metrics['max_degree'] = np.max(degrees)
            metrics['degree_std'] = np.std(degrees)
        else:
            metrics['avg_degree'] = 0
            metrics['max_degree'] = 0
            metrics['degree_std'] = 0

        return metrics

    def get_network_data_for_viz(self) -> Dict[str, Any]:
        """Export network data in format suitable for D3.js visualization"""
        centrality = self.calculate_centrality_metrics()
        communities = self.detect_communities()

        nodes = []
        for node in self.graph.nodes():
            nodes.append({
                'id': node,
                'degree': centrality[node]['degree'],
                'betweenness': centrality[node]['betweenness'],
                'pagerank': centrality[node]['pagerank'],
                'community': communities.get(node, 0)
            })

        links = []
        for source, target, data in self.graph.edges(data=True):
            links.append({
                'source': source,
                'target': target,
                'weight': data.get('weight', 1)
            })

        return {
            'nodes': nodes,
            'links': links
        }
