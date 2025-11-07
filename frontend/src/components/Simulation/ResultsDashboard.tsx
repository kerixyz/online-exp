import { SimulationResults } from '../../types';
import NetworkGraph from '../Visualizations/NetworkGraph';
import MetricsCharts from '../Visualizations/MetricsCharts';

interface ResultsDashboardProps {
  results: SimulationResults;
}

export default function ResultsDashboard({ results }: ResultsDashboardProps) {
  const downloadReport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      agent_config: results.config,
      impact_summary: results.impact.summary,
      network_metrics: {
        baseline: results.baseline.network_metrics,
        intervention: results.intervention.network_metrics
      },
      equity_metrics: results.equity,
      interventions_count: results.intervention.interventions.length
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `simulation-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Simulation Results</h2>
          <button className="button button-secondary" onClick={downloadReport}>
            Download Report
          </button>
        </div>

        <div style={{
          padding: '1.5rem',
          background: '#000000',
          color: '#ffffff',
          marginBottom: '2rem',
          border: '1px solid #000000'
        }}>
          <h3 style={{ color: 'white', marginBottom: '1rem' }}>What Changed?</h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            {results.impact.summary}
          </p>
        </div>

        <div style={{
          padding: '1.5rem',
          border: '1px solid #000000',
          marginBottom: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>Your Evaluation</h3>
          <p style={{ marginBottom: '1rem', fontWeight: 300 }}>
            Based on these results, how would you feel about this AI agent in your community?
          </p>
          <p style={{ fontWeight: 300, fontSize: '0.9rem', opacity: 0.7 }}>
            (Future feature: Submit your feedback to help research)
          </p>
        </div>

        <h3 style={{ marginBottom: '1.5rem' }}>Key Metrics</h3>
        <div className="grid grid-2" style={{ marginBottom: '2rem' }}>
          <div className="metric-card">
            <h4>Total Interventions</h4>
            <div className="value">{results.intervention.interventions.length}</div>
          </div>

          <div className="metric-card">
            <h4>Network Density Change</h4>
            <div className="value">
              {results.impact.network_change.density?.percent_change?.toFixed(1) || 0}%
            </div>
          </div>

          <div className="metric-card">
            <h4>Influence Inequality (Gini)</h4>
            <div className="value">
              {results.equity.influence_inequality.intervention_gini.toFixed(3)}
            </div>
            <div className="change">
              Baseline: {results.equity.influence_inequality.baseline_gini.toFixed(3)}
            </div>
          </div>

          <div className="metric-card">
            <h4>Participation Inequality (Gini)</h4>
            <div className="value">
              {results.equity.participation_inequality.intervention_gini.toFixed(3)}
            </div>
            <div className="change">
              Baseline: {results.equity.participation_inequality.baseline_gini.toFixed(3)}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Network Structure Comparison</h3>
        <div className="grid grid-2">
          <div>
            <h4 style={{ textAlign: 'center', marginBottom: '1rem' }}>
              Baseline Network
            </h4>
            <NetworkGraph data={results.baseline.network_viz} />
          </div>
          <div>
            <h4 style={{ textAlign: 'center', marginBottom: '1rem' }}>
              After AI Intervention
            </h4>
            <NetworkGraph data={results.intervention.network_viz} />
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Network Metrics Analysis</h3>
        <MetricsCharts results={results} />
      </div>

      <div className="card">
        <h3>Intervention Details</h3>
        <p style={{ marginBottom: '1rem' }}>
          Agent Type: <strong>{results.config.type}</strong>
        </p>

        {results.intervention.interventions.length > 0 && (
          <div style={{ maxHeight: '300px', overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Post ID</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Action</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Score</th>
                </tr>
              </thead>
              <tbody>
                {results.intervention.interventions.slice(0, 20).map((intervention, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '0.75rem' }}>{intervention.post_id}</td>
                    <td style={{ padding: '0.75rem' }}>{intervention.action}</td>
                    <td style={{ padding: '0.75rem' }}>
                      {(intervention.toxicity_score || intervention.quality_score || intervention.conflict_score || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
