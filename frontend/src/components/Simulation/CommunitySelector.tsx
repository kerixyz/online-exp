import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Community } from '../../types';

interface CommunitySelectorProps {
  onSelect: (communityId: string) => void;
  selectedCommunity: string | null;
}

export default function CommunitySelector({ onSelect, selectedCommunity }: CommunitySelectorProps) {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCommunities();
  }, []);

  const loadCommunities = async () => {
    try {
      setLoading(true);
      const data = await api.getCommunities();
      setCommunities(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load communities');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading communities...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="card">
      <h2>Step 1: Select Community</h2>
      <p style={{ marginBottom: '1.5rem', color: '#666' }}>
        Choose a community to analyze. Currently running in offline mode with sample data.
      </p>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {communities.map((community) => (
          <div
            key={community.id}
            onClick={() => onSelect(community.id)}
            style={{
              padding: '1.5rem',
              border: selectedCommunity === community.id ? '3px solid #667eea' : '2px solid #e0e0e0',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              backgroundColor: selectedCommunity === community.id ? '#f8f9ff' : 'white'
            }}
          >
            <h3 style={{ marginBottom: '0.5rem' }}>{community.name}</h3>
            <p style={{ marginBottom: '0.5rem' }}>{community.description}</p>
            <div style={{ display: 'flex', gap: '2rem', color: '#888', fontSize: '0.9rem' }}>
              <span>{community.members.toLocaleString()} members</span>
              <span>{community.num_posts} posts analyzed</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
