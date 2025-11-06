import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SimulationResults } from '../../types';

interface MetricsChartsProps {
  results: SimulationResults;
}

export default function MetricsCharts({ results }: MetricsChartsProps) {
  // Prepare data for comparison chart
  const metricsData = [
    {
      metric: 'Density',
      baseline: results.baseline.network_metrics.density,
      intervention: results.intervention.network_metrics.density
    },
    {
      metric: 'Avg Clustering',
      baseline: results.baseline.network_metrics.avg_clustering,
      intervention: results.intervention.network_metrics.avg_clustering
    },
    {
      metric: 'Reciprocity',
      baseline: results.baseline.network_metrics.reciprocity,
      intervention: results.intervention.network_metrics.reciprocity
    },
    {
      metric: 'Avg Degree',
      baseline: results.baseline.network_metrics.avg_degree / 10, // Scale for visualization
      intervention: results.intervention.network_metrics.avg_degree / 10
    }
  ];

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={metricsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="metric" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="baseline" fill="#667eea" name="Baseline" />
          <Bar dataKey="intervention" fill="#764ba2" name="After Intervention" />
        </BarChart>
      </ResponsiveContainer>

      <div style={{ marginTop: '2rem' }}>
        <h4 style={{ marginBottom: '1rem' }}>Detailed Metrics</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <MetricDetail
            label="Number of Nodes"
            baseline={results.baseline.network_metrics.num_nodes}
            intervention={results.intervention.network_metrics.num_nodes}
          />
          <MetricDetail
            label="Number of Edges"
            baseline={results.baseline.network_metrics.num_edges}
            intervention={results.intervention.network_metrics.num_edges}
          />
          <MetricDetail
            label="Network Density"
            baseline={results.baseline.network_metrics.density}
            intervention={results.intervention.network_metrics.density}
            decimals={3}
          />
          <MetricDetail
            label="Average Clustering"
            baseline={results.baseline.network_metrics.avg_clustering}
            intervention={results.intervention.network_metrics.avg_clustering}
            decimals={3}
          />
          <MetricDetail
            label="Reciprocity"
            baseline={results.baseline.network_metrics.reciprocity}
            intervention={results.intervention.network_metrics.reciprocity}
            decimals={3}
          />
          <MetricDetail
            label="Average Degree"
            baseline={results.baseline.network_metrics.avg_degree}
            intervention={results.intervention.network_metrics.avg_degree}
            decimals={2}
          />
        </div>
      </div>
    </div>
  );
}

interface MetricDetailProps {
  label: string;
  baseline: number;
  intervention: number;
  decimals?: number;
}

function MetricDetail({ label, baseline, intervention, decimals = 0 }: MetricDetailProps) {
  const change = baseline !== 0 ? ((intervention - baseline) / baseline) * 100 : 0;
  const changeColor = change > 0 ? '#22c55e' : change < 0 ? '#ef4444' : '#888';

  return (
    <div style={{
      padding: '1rem',
      background: '#f9f9f9',
      borderRadius: '8px',
      border: '1px solid #e0e0e0'
    }}>
      <div style={{ fontSize: '0.875rem', color: '#888', marginBottom: '0.25rem' }}>
        {label}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <span style={{ fontSize: '0.875rem', color: '#888' }}>
            {baseline.toFixed(decimals)}
          </span>
          <span style={{ margin: '0 0.5rem', color: '#ccc' }}>→</span>
          <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
            {intervention.toFixed(decimals)}
          </span>
        </div>
        <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: changeColor }}>
          {change > 0 ? '+' : ''}{change.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}
