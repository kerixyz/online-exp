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
      <p style={{ marginBottom: '1.5rem' }}>
        Choose a community to analyze. Currently running in offline mode with sample data.
      </p>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {communities.map((community) => (
          <div
            key={community.id}
            onClick={() => onSelect(community.id)}
            style={{
              padding: '1.5rem',
              border: selectedCommunity === community.id ? '2px solid #000000' : '1px solid #000000',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: selectedCommunity === community.id ? '#000000' : '#ffffff',
              color: selectedCommunity === community.id ? '#ffffff' : '#000000'
            }}
          >
            <h3 style={{ marginBottom: '0.5rem' }}>{community.name}</h3>
            <p style={{ marginBottom: '0.5rem' }}>{community.description}</p>
            <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', opacity: 0.7 }}>
              <span>{community.members.toLocaleString()} members</span>
              <span>{community.num_posts} posts analyzed</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
