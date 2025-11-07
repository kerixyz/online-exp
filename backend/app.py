"""
Flask Backend for AI-Mediated Community Dynamics Platform
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import numpy as np
from dotenv import load_dotenv
from simulation.community_analyzer import CommunitySimulator


def convert_numpy_types(obj):
    """Recursively convert NumPy types to Python native types"""
    if isinstance(obj, dict):
        return {key: convert_numpy_types(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [convert_numpy_types(item) for item in obj]
    elif isinstance(obj, (np.integer, np.int64)):
        return int(obj)
    elif isinstance(obj, (np.floating, np.float64)):
        return float(obj)
    elif isinstance(obj, np.ndarray):
        return obj.tolist()
    else:
        return obj

# Load environment variables
load_dotenv()

app = Flask(__name__)

# CORS configuration - allows requests from frontend
# In production, ALLOWED_ORIGINS should be set to your Vercel domain
allowed_origins = os.getenv('ALLOWED_ORIGINS', '*')
if allowed_origins == '*':
    CORS(app)
else:
    origins_list = [origin.strip() for origin in allowed_origins.split(',')]
    CORS(app, origins=origins_list)

# Configuration
MODE = os.getenv('MODE', 'offline')
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')


def load_sample_data():
    """Load sample Reddit community data"""
    sample_file = os.path.join(DATA_DIR, 'sample_reddit_data.json')
    with open(sample_file, 'r') as f:
        return json.load(f)


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'mode': MODE,
        'version': '1.0.0'
    })


@app.route('/api/communities', methods=['GET'])
def get_communities():
    """Get available communities for analysis"""
    if MODE == 'offline':
        # Return sample community data
        sample_data = load_sample_data()
        return jsonify({
            'communities': [{
                'id': 'sample_ai_community',
                'name': sample_data['community_name'],
                'description': sample_data['description'],
                'members': sample_data['members'],
                'num_posts': len(sample_data['posts'])
            }]
        })
    else:
        # TODO: Implement Reddit API integration
        return jsonify({
            'error': 'Online mode not yet implemented',
            'communities': []
        }), 501


@app.route('/api/community/<community_id>', methods=['GET'])
def get_community_data(community_id):
    """Get detailed community data"""
    if MODE == 'offline' and community_id == 'sample_ai_community':
        sample_data = load_sample_data()
        return jsonify(sample_data)
    else:
        return jsonify({'error': 'Community not found'}), 404


@app.route('/api/simulate', methods=['POST'])
def run_simulation():
    """
    Run AI agent simulation on community data

    Expected JSON payload:
    {
        "community_id": "sample_ai_community",
        "agent_config": {
            "type": "moderator",
            "intervention_frequency": 0.2,
            "behavior_style": "gentle",
            "toxicity_threshold": 0.6
        },
        "num_steps": 100
    }
    """
    try:
        data = request.json
        community_id = data.get('community_id')
        agent_config = data.get('agent_config', {})
        num_steps = data.get('num_steps', 100)

        # Load community data
        if MODE == 'offline' and community_id == 'sample_ai_community':
            community_data = load_sample_data()
        else:
            return jsonify({'error': 'Community not found'}), 404

        # Validate agent config
        if 'type' not in agent_config:
            return jsonify({'error': 'Agent type is required'}), 400

        valid_agent_types = ['moderator', 'amplifier', 'mediator']
        if agent_config['type'] not in valid_agent_types:
            return jsonify({
                'error': f'Invalid agent type. Must be one of: {valid_agent_types}'
            }), 400

        # Run simulation
        simulator = CommunitySimulator(community_data, agent_config)
        results = simulator.simulate(num_steps)

        # Convert NumPy types to Python native types for JSON serialization
        results = convert_numpy_types(results)

        return jsonify(results)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/agent-types', methods=['GET'])
def get_agent_types():
    """Get available AI agent types and their configurations"""
    return jsonify({
        'agent_types': [
            {
                'id': 'moderator',
                'name': 'Moderator Agent',
                'description': 'Reduces toxic content and enforces community norms',
                'parameters': [
                    {
                        'name': 'intervention_frequency',
                        'type': 'float',
                        'default': 0.1,
                        'min': 0.0,
                        'max': 1.0,
                        'description': 'How often the agent checks posts (0-1)'
                    },
                    {
                        'name': 'behavior_style',
                        'type': 'select',
                        'default': 'neutral',
                        'options': ['strict', 'neutral', 'gentle'],
                        'description': 'Moderation approach'
                    },
                    {
                        'name': 'toxicity_threshold',
                        'type': 'float',
                        'default': 0.6,
                        'min': 0.0,
                        'max': 1.0,
                        'description': 'Toxicity threshold for intervention'
                    }
                ]
            },
            {
                'id': 'amplifier',
                'name': 'Amplifier Agent',
                'description': 'Boosts underrepresented voices and quality content',
                'parameters': [
                    {
                        'name': 'intervention_frequency',
                        'type': 'float',
                        'default': 0.15,
                        'min': 0.0,
                        'max': 1.0,
                        'description': 'How often the agent evaluates posts'
                    },
                    {
                        'name': 'behavior_style',
                        'type': 'select',
                        'default': 'neutral',
                        'options': ['passive', 'neutral', 'aggressive'],
                        'description': 'Amplification strategy'
                    },
                    {
                        'name': 'quality_threshold',
                        'type': 'float',
                        'default': 0.6,
                        'min': 0.0,
                        'max': 1.0,
                        'description': 'Quality threshold for amplification'
                    }
                ]
            },
            {
                'id': 'mediator',
                'name': 'Mediator Agent',
                'description': 'Facilitates dialogue and reduces polarization',
                'parameters': [
                    {
                        'name': 'intervention_frequency',
                        'type': 'float',
                        'default': 0.2,
                        'min': 0.0,
                        'max': 1.0,
                        'description': 'How often the agent monitors discussions'
                    },
                    {
                        'name': 'behavior_style',
                        'type': 'select',
                        'default': 'neutral',
                        'options': ['passive', 'neutral', 'active'],
                        'description': 'Mediation approach'
                    },
                    {
                        'name': 'conflict_threshold',
                        'type': 'float',
                        'default': 0.7,
                        'min': 0.0,
                        'max': 1.0,
                        'description': 'Conflict level threshold for intervention'
                    }
                ]
            }
        ]
    })


if __name__ == '__main__':
    port = int(os.getenv('FLASK_PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
