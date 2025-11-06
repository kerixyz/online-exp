"""
AI Agent Models for Community Simulation
Implements different types of AI agents that can intervene in online communities
"""

import random
from typing import Dict, List, Any
import numpy as np


class BaseAgent:
    """Base class for AI agents"""

    def __init__(self, config: Dict[str, Any]):
        self.intervention_frequency = config.get('intervention_frequency', 0.1)
        self.behavior_style = config.get('behavior_style', 'neutral')
        self.targeting_rules = config.get('targeting_rules', 'random')

    def should_intervene(self) -> bool:
        """Determine if agent should intervene based on frequency"""
        return random.random() < self.intervention_frequency

    def intervene(self, post: Dict[str, Any], community_context: Dict[str, Any]) -> Dict[str, Any]:
        """Base intervention method - to be overridden by subclasses"""
        raise NotImplementedError


class ModeratorAgent(BaseAgent):
    """
    AI Moderator Agent
    - Reduces toxic content
    - Enforces community norms
    - Promotes civil discussion
    """

    def __init__(self, config: Dict[str, Any]):
        super().__init__(config)
        self.toxicity_threshold = config.get('toxicity_threshold', 0.6)

    def intervene(self, post: Dict[str, Any], community_context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Moderator intervention logic
        Returns modified post data with intervention results
        """
        intervention_result = {
            'agent_type': 'moderator',
            'action': None,
            'post_id': post['id'],
            'toxicity_score': post.get('toxicity', 0)
        }

        # Simulate toxicity detection
        if post.get('toxicity', 0) > self.toxicity_threshold:
            if self.behavior_style == 'strict':
                intervention_result['action'] = 'removed'
                post['removed'] = True
            elif self.behavior_style == 'gentle':
                intervention_result['action'] = 'warning'
                post['warned'] = True
            else:  # neutral
                intervention_result['action'] = 'flagged'
                post['flagged'] = True

        return intervention_result


class AmplifierAgent(BaseAgent):
    """
    AI Amplifier Agent
    - Boosts underrepresented voices
    - Increases visibility of quality content
    - Promotes diverse perspectives
    """

    def __init__(self, config: Dict[str, Any]):
        super().__init__(config)
        self.quality_threshold = config.get('quality_threshold', 0.6)

    def intervene(self, post: Dict[str, Any], community_context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Amplifier intervention logic
        Boosts content based on quality and user centrality
        """
        intervention_result = {
            'agent_type': 'amplifier',
            'action': None,
            'post_id': post['id'],
            'quality_score': post.get('quality', 0),
            'author_centrality': post.get('author_centrality', 0)
        }

        # Amplify high-quality content from peripheral users
        if post.get('quality', 0) > self.quality_threshold:
            if post.get('author_centrality', 0.5) < 0.3:  # Peripheral user
                intervention_result['action'] = 'amplified'
                post['visibility_boost'] = 2.0
            elif self.behavior_style == 'aggressive':
                intervention_result['action'] = 'boosted'
                post['visibility_boost'] = 1.5

        return intervention_result


class MediatorAgent(BaseAgent):
    """
    AI Mediator Agent
    - Facilitates constructive dialogue
    - Reduces polarization
    - Encourages bridge-building
    """

    def __init__(self, config: Dict[str, Any]):
        super().__init__(config)
        self.conflict_threshold = config.get('conflict_threshold', 0.7)

    def intervene(self, post: Dict[str, Any], community_context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Mediator intervention logic
        Intervenes in conflicts and polarized discussions
        """
        intervention_result = {
            'agent_type': 'mediator',
            'action': None,
            'post_id': post['id'],
            'conflict_score': post.get('conflict', 0)
        }

        # Detect and mediate conflicts
        if post.get('conflict', 0) > self.conflict_threshold:
            if self.behavior_style == 'active':
                intervention_result['action'] = 'mediated'
                post['mediation_comment'] = True
                post['conflict_reduced'] = True
            else:
                intervention_result['action'] = 'monitored'
                post['monitored'] = True

        return intervention_result


def create_agent(agent_type: str, config: Dict[str, Any]) -> BaseAgent:
    """Factory function to create appropriate agent type"""
    agents = {
        'moderator': ModeratorAgent,
        'amplifier': AmplifierAgent,
        'mediator': MediatorAgent
    }

    agent_class = agents.get(agent_type.lower())
    if not agent_class:
        raise ValueError(f"Unknown agent type: {agent_type}")

    return agent_class(config)
