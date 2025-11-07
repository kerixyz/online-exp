import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="container">
      <div className="card" style={{ textAlign: 'center', maxWidth: '800px', margin: '2rem auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          AI-Mediated Community Dynamics Platform
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Explore how AI agents influence online communities through interactive simulations and data analysis
        </p>

        <div style={{ marginBottom: '3rem' }}>
          <h3>Research Focus</h3>
          <div style={{ textAlign: 'left', marginTop: '1rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>
                Study 1: Mapping AI-Mediated Community Dynamics
              </h4>
              <p>
                Analyze large-scale interaction data to identify how AI agents influence participation,
                attention, and emergent norms through social network analysis and temporal modeling.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>
                Study 2: Modeling Power, Equity, and Influence
              </h4>
              <p>
                Examine how AI agents redistribute power and visibility within communities using network
                centrality, role detection, and diffusion modeling.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>
                Study 3: Comparative Analysis Across Platforms
              </h4>
              <p>
                Compare structural and behavioral patterns across AI-mediated platforms to identify
                platform-specific versus generalizable patterns of AI influence.
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/simulate">
            <button className="button">Explore Simulations</button>
          </Link>
          <Link to="/findings">
            <button className="button button-secondary">View Findings</button>
          </Link>
        </div>
      </div>

      <div className="card" style={{ maxWidth: '800px', margin: '2rem auto' }}>
        <h3>How It Works</h3>
        <ol style={{ lineHeight: '2', paddingLeft: '2rem' }}>
          <li>Select a community to analyze (currently using Reddit data in offline mode)</li>
          <li>Configure an AI agent type (Moderator, Amplifier, or Mediator)</li>
          <li>Run simulations to see how the agent affects community dynamics</li>
          <li>Analyze network visualizations, equity metrics, and impact reports</li>
          <li>Download reports and explore findings</li>
        </ol>
      </div>
    </div>
  );
}
