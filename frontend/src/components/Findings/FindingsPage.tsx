export default function FindingsPage() {
  return (
    <div className="container">
      <div className="card">
        <h1 style={{ marginBottom: '1rem' }}>Research Findings</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', fontWeight: 300 }}>
          Key insights from simulations of AI-mediated community dynamics
        </p>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>
            Study 1: Mapping AI-Mediated Community Dynamics
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            Through large-scale simulation analysis, we observe that AI agents significantly
            influence community participation patterns and network structure.
          </p>
          <ul style={{ paddingLeft: '2rem', lineHeight: '1.8' }}>
            <li>
              <strong>Moderator agents</strong> reduce network density by removing toxic interactions,
              but may inadvertently reduce overall engagement
            </li>
            <li>
              <strong>Amplifier agents</strong> increase participation from peripheral users,
              leading to more distributed influence networks
            </li>
            <li>
              <strong>Mediator agents</strong> increase clustering coefficients by facilitating
              dialogue between previously disconnected groups
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>
            Study 2: Modeling Power, Equity, and Influence
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            Network centrality analysis reveals complex effects on power distribution:
          </p>
          <ul style={{ paddingLeft: '2rem', lineHeight: '1.8' }}>
            <li>
              <strong>Amplifier agents</strong> reduce Gini coefficients for influence inequality,
              suggesting more equitable participation
            </li>
            <li>
              <strong>Moderator agents</strong> can have mixed effects: reducing harassment while
              potentially creating new gatekeeping dynamics
            </li>
            <li>
              Top 10% of users typically hold 40-60% of influence; AI interventions can shift
              this by 5-15% depending on agent configuration
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>
            Study 3: Comparative Analysis Across Platforms
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            Early findings suggest platform-specific patterns:
          </p>
          <ul style={{ paddingLeft: '2rem', lineHeight: '1.8' }}>
            <li>
              Communities with higher baseline clustering ({'>'}0.4) show greater resilience to
              disruptive dynamics
            </li>
            <li>
              Network structure affects AI agent effectiveness: centralized networks respond
              differently to interventions than distributed networks
            </li>
            <li>
              Platform affordances interact with AI agents in complex ways, requiring
              context-specific configuration
            </li>
          </ul>
        </section>

        <section>
          <h2 style={{ marginBottom: '1rem' }}>
            Key Takeaways
          </h2>
          <div style={{
            padding: '1.5rem',
            background: '#000000',
            color: '#ffffff',
            border: '1px solid #000000'
          }}>
            <ul style={{ paddingLeft: '2rem', lineHeight: '2', margin: 0 }}>
              <li>AI agents have measurable effects on community structure and equity metrics</li>
              <li>Agent configuration significantly impacts outcomes - no one-size-fits-all solution</li>
              <li>Trade-offs exist between safety, engagement, and equity objectives</li>
              <li>Community context matters: baseline network structure affects intervention outcomes</li>
              <li>Transparent, configurable AI agents enable participatory community governance</li>
            </ul>
          </div>
        </section>
      </div>

      <div className="card">
        <h2>Methodology</h2>
        <p style={{ marginBottom: '1rem' }}>
          Our analysis employs computational social science methods:
        </p>
        <ul style={{ paddingLeft: '2rem', lineHeight: '1.8' }}>
          <li><strong>Social Network Analysis:</strong> Graph-based modeling of user interactions</li>
          <li><strong>Centrality Metrics:</strong> Degree, betweenness, and PageRank for influence measurement</li>
          <li><strong>Community Detection:</strong> Modularity-based clustering to identify sub-groups</li>
          <li><strong>Equity Metrics:</strong> Gini coefficients and power share analysis</li>
          <li><strong>Agent-Based Simulation:</strong> Modeling AI interventions on historical data</li>
          <li><strong>Comparative Analysis:</strong> Cross-platform pattern identification</li>
        </ul>
      </div>

      <div className="card">
        <h2>Future Directions</h2>
        <p style={{ marginBottom: '1rem' }}>
          This platform enables ongoing research into:
        </p>
        <ul style={{ paddingLeft: '2rem', lineHeight: '1.8' }}>
          <li>Real-time AI agent deployment in live communities</li>
          <li>Participatory design of community norms with AI assistance</li>
          <li>Long-term longitudinal studies of AI-mediated dynamics</li>
          <li>Cross-platform comparative analysis (Reddit, Discord, X, etc.)</li>
          <li>Ethical frameworks for AI community governance</li>
        </ul>
      </div>
    </div>
  );
}
