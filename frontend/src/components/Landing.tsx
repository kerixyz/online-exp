import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="container">
      <div className="card" style={{ textAlign: 'center', maxWidth: '800px', margin: '2rem auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          AI Agents in Online Communities
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', fontWeight: 300 }}>
          Explore how AI agents might affect your favorite online spaces
        </p>

        <div style={{ marginBottom: '3rem', textAlign: 'left' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>How it works</h3>
          <ol style={{ lineHeight: '2', paddingLeft: '2rem', fontWeight: 300 }}>
            <li>Choose a subreddit to analyze</li>
            <li>Simulate different types of AI agents (moderators, amplifiers, mediators)</li>
            <li>See how these agents change community interactions</li>
            <li>Evaluate: Would these agents help or harm your community?</li>
          </ol>
        </div>

        <div style={{ marginBottom: '2rem', textAlign: 'left', padding: '1.5rem', border: '1px solid #000000' }}>
          <h4 style={{ marginBottom: '1rem' }}>Research Question</h4>
          <p style={{ fontWeight: 300 }}>
            How do users feel about AI agents invading or contributing to their online spaces?
            This platform lets you experiment with different agent types and see their impact
            on real community data.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/simulate">
            <button className="button">Start Simulation</button>
          </Link>
          <Link to="/findings">
            <button className="button button-secondary">View Research</button>
          </Link>
        </div>
      </div>

      <div className="card" style={{ maxWidth: '800px', margin: '2rem auto' }}>
        <h3 style={{ marginBottom: '1rem' }}>Agent Types</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ padding: '1rem', border: '1px solid #000000' }}>
            <h4>Moderator</h4>
            <p style={{ fontWeight: 300, marginTop: '0.5rem' }}>
              Removes toxic content and enforces community rules
            </p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid #000000' }}>
            <h4>Amplifier</h4>
            <p style={{ fontWeight: 300, marginTop: '0.5rem' }}>
              Boosts voices that might otherwise go unheard
            </p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid #000000' }}>
            <h4>Mediator</h4>
            <p style={{ fontWeight: 300, marginTop: '0.5rem' }}>
              Facilitates dialogue and reduces conflicts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
