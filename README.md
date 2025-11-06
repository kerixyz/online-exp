# AI-Mediated Community Dynamics Platform

An interactive web platform for simulating and analyzing how AI agents influence online communities. Built for research into computational social science, network dynamics, and AI-mediated governance.

## Overview

This platform enables researchers and practitioners to:
- Simulate AI agent interventions in online communities
- Analyze network structure changes and equity metrics
- Visualize community dynamics through interactive graphs
- Generate detailed reports on agent impact

## Research Focus

### Study 1: Mapping AI-Mediated Community Dynamics
Large-scale observational analysis using social network analysis, temporal modeling, and NLP to identify how AI agents influence participation, attention, and emergent norms.

### Study 2: Modeling Power, Equity, and Influence
Examination of how AI agents redistribute power and visibility using network centrality, role detection, and diffusion modeling to evaluate equity and inclusion outcomes.

### Study 3: Comparative Analysis Across Platforms
Cross-platform comparison of structural and behavioral patterns to identify generalizable versus platform-specific AI influence patterns.

## Features (Phase 1 - MVP)

### Interactive Simulation Platform
- **Community Selection**: Browse and select communities (currently Reddit data in offline mode)
- **AI Agent Configuration**: Configure three agent types with customizable parameters
  - Moderator Agent: Reduces toxicity, enforces norms
  - Amplifier Agent: Boosts underrepresented voices
  - Mediator Agent: Facilitates dialogue, reduces polarization
- **Real-time Simulation**: Run agent-based simulations on historical interaction data
- **Results Dashboard**: Comprehensive analysis with network visualizations

### Analysis & Metrics
- Network structure visualization (D3.js force-directed graphs)
- Centrality metrics (degree, betweenness, PageRank)
- Equity metrics (Gini coefficients, power distribution)
- Comparative analysis (baseline vs. intervention)
- Intervention tracking and detailed logs

### Data & Reporting
- Sample Reddit community data (offline mode)
- Downloadable JSON reports
- Interactive charts and graphs
- Impact summaries

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- D3.js (network visualizations)
- Recharts (statistical charts)
- React Router (navigation)
- Axios (API calls)

### Backend
- Python 3.11
- Flask (web framework)
- NetworkX (graph analysis)
- NumPy, Pandas, SciPy (data analysis)
- PRAW (Reddit API - for future online mode)

### Deployment
- Docker & Docker Compose
- PostgreSQL (planned for future)

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Docker and Docker Compose (optional)

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd online-exp

# Start both frontend and backend
docker-compose up

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
```

### Option 2: Manual Setup

#### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment configuration
cp .env.example .env

# Run the backend
python app.py
```

Backend will run on http://localhost:5000

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

Frontend will run on http://localhost:3000

## Usage

### Running Simulations

1. **Navigate to Simulate**: Click "Explore Simulations" from the home page
2. **Select Community**: Choose the sample AI community (r/ArtificialIntelligence)
3. **Configure Agent**:
   - Select agent type (Moderator, Amplifier, or Mediator)
   - Adjust parameters:
     - Intervention frequency (0-100%)
     - Behavior style
     - Threshold values
4. **Run Simulation**: Click "Run Simulation" and wait for results
5. **Analyze Results**:
   - View impact summary
   - Explore network visualizations
   - Examine equity metrics
   - Download detailed reports

### Configuration Modes

#### Offline Mode (Default)
Uses pre-loaded sample Reddit data. Perfect for testing and demonstrations without API access.

```env
MODE=offline
```

#### Online Mode (Future)
Connect to live Reddit API for real-time data analysis.

```env
MODE=online
REDDIT_CLIENT_ID=your_client_id
REDDIT_CLIENT_SECRET=your_secret
REDDIT_USER_AGENT=your_app_name
```

## Project Structure

```
online-exp/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Landing.tsx
│   │   │   ├── Simulation/
│   │   │   │   ├── CommunitySelector.tsx
│   │   │   │   ├── AgentConfig.tsx
│   │   │   │   ├── SimulationRunner.tsx
│   │   │   │   └── ResultsDashboard.tsx
│   │   │   ├── Findings/
│   │   │   │   └── FindingsPage.tsx
│   │   │   └── Visualizations/
│   │   │       ├── NetworkGraph.tsx
│   │   │       └── MetricsCharts.tsx
│   │   ├── pages/
│   │   │   └── SimulationPage.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── Dockerfile
├── backend/
│   ├── simulation/
│   │   ├── agent_models.py
│   │   ├── community_analyzer.py
│   │   └── network_builder.py
│   ├── data/
│   │   └── sample_reddit_data.json
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## API Endpoints

### GET /api/health
Health check endpoint
```json
{
  "status": "healthy",
  "mode": "offline",
  "version": "1.0.0"
}
```

### GET /api/communities
List available communities
```json
{
  "communities": [...]
}
```

### GET /api/community/:id
Get detailed community data

### GET /api/agent-types
List available AI agent types and parameters

### POST /api/simulate
Run simulation with agent configuration
```json
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
```

## Agent Types

### Moderator Agent
**Purpose**: Reduce toxic content and enforce community norms

**Parameters**:
- `intervention_frequency`: How often to check posts (0-1)
- `behavior_style`: strict | neutral | gentle
- `toxicity_threshold`: Toxicity level for intervention (0-1)

**Actions**: remove, warn, flag

### Amplifier Agent
**Purpose**: Boost underrepresented voices and quality content

**Parameters**:
- `intervention_frequency`: How often to evaluate posts (0-1)
- `behavior_style`: passive | neutral | aggressive
- `quality_threshold`: Quality threshold for amplification (0-1)

**Actions**: amplify, boost

### Mediator Agent
**Purpose**: Facilitate dialogue and reduce polarization

**Parameters**:
- `intervention_frequency`: How often to monitor discussions (0-1)
- `behavior_style`: passive | neutral | active
- `conflict_threshold`: Conflict level for intervention (0-1)

**Actions**: mediate, monitor

## Metrics Explained

### Network Metrics
- **Density**: Ratio of actual connections to possible connections
- **Clustering**: Tendency of nodes to form tightly-knit groups
- **Reciprocity**: Proportion of mutual connections
- **Degree**: Number of connections per node

### Centrality Metrics
- **Degree Centrality**: Direct connections a node has
- **Betweenness Centrality**: Node's role as bridge between others
- **PageRank**: Influence based on connection quality

### Equity Metrics
- **Gini Coefficient**: Inequality measure (0 = perfect equality, 1 = perfect inequality)
- **Top 10% Power Share**: Influence concentration among most central users

## Future Enhancements (Planned)

### Phase 2
- Reddit API integration (online mode)
- Multiple AI agent types
- Custom norm proposal interface
- Advanced temporal analysis
- PDF report generation
- Simulation history database

### Phase 3
- Multi-platform support (Twitter, Discord, etc.)
- NLP integration for sentiment analysis
- User accounts and saved simulations
- Real-time collaboration features
- Community-contributed findings

## Research Applications

This platform supports research into:
- AI governance in online communities
- Computational social science
- Network dynamics and emergence
- Equity and inclusion in digital spaces
- Platform design and policy
- Algorithmic interventions

## Contributing

This is a research project. For questions or collaboration inquiries, please open an issue.

## License

[To be determined based on your requirements]

## Citation

If you use this platform in your research, please cite:

```bibtex
@software{ai_community_dynamics_2024,
  title={AI-Mediated Community Dynamics Platform},
  author={[Your Name]},
  year={2024},
  url={[Repository URL]}
}
```

## References

- Bakshy et al. (2012) - Influence dynamics in social networks
- Binns et al. (2018) - Fairness in machine learning
- Centola (2010) - Network structure and behavioral diffusion
- Gray (2020) - Platform governance
- Krafft et al. (2020) - AI-mediated communication
- Seering et al. (2017) - Moderation in online communities
- Weng et al. (2013) - Social bots and information diffusion

## Support

For issues, questions, or feature requests, please open an issue on GitHub.
