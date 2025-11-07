export default function FindingsPage() {
  return (
    <div className="container">
      <div className="card">
        <h1 style={{ marginBottom: '1rem' }}>Research Overview</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', fontWeight: 300 }}>
          Understanding how AI agents affect online communities
        </p>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>The Question</h2>
          <p style={{ marginBottom: '1rem', fontWeight: 300, lineHeight: '1.8' }}>
            As AI agents become more prevalent in online spaces, we need to understand their impact
            from the perspective of community members. Do these agents enhance or diminish the quality
            of online interactions? Do they help or harm community dynamics?
          </p>
          <p style={{ fontWeight: 300, lineHeight: '1.8' }}>
            This platform enables you to simulate AI agent interventions on real community data and
            evaluate the results for yourself.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>What We're Learning</h2>
          <ul style={{ paddingLeft: '2rem', lineHeight: '1.8', fontWeight: 300 }}>
            <li>
              <strong>Moderator agents</strong> can reduce toxicity but may inadvertently reduce
              overall engagement and create new forms of gatekeeping
            </li>
            <li>
              <strong>Amplifier agents</strong> can increase participation from peripheral users,
              leading to more equitable voice distribution
            </li>
            <li>
              <strong>Mediator agents</strong> can facilitate dialogue between disconnected groups
              and reduce polarization
            </li>
            <li>
              Different communities respond differently - there's no one-size-fits-all solution
            </li>
            <li>
              The most important question isn't whether agents "work", but whether community
              members want them
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>Research Methodology</h2>
          <p style={{ marginBottom: '1rem', fontWeight: 300, lineHeight: '1.8' }}>
            We analyze online community dynamics through:
          </p>
          <ul style={{ paddingLeft: '2rem', lineHeight: '1.8', fontWeight: 300 }}>
            <li><strong>Social Network Analysis:</strong> Graph-based modeling of user interactions</li>
            <li><strong>Centrality Metrics:</strong> Measuring influence and power distribution</li>
            <li><strong>Community Detection:</strong> Identifying sub-groups and connections</li>
            <li><strong>Equity Metrics:</strong> Evaluating participation inequality</li>
            <li><strong>Agent-Based Simulation:</strong> Modeling interventions on historical data</li>
          </ul>
        </section>

        <section>
          <h2 style={{ marginBottom: '1rem' }}>Try It Yourself</h2>
          <p style={{ marginBottom: '1.5rem', fontWeight: 300, lineHeight: '1.8' }}>
            The best way to understand AI agent impact is to experiment with your own community data.
            Run simulations, examine the network changes, and form your own conclusions about whether
            these agents would enhance or detract from your online experience.
          </p>
          <div style={{ padding: '1.5rem', background: '#000000', color: '#ffffff', border: '1px solid #000000' }}>
            <p style={{ margin: 0, fontWeight: 400 }}>
              Your feedback matters: After running simulations, consider how these changes would
              feel as a community member. Would you want these agents in your space?
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
