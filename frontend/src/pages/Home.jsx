import { useState, useEffect } from 'react';
import api from '../services/api';
import EventCard from '../components/EventCard';
import { Search } from 'lucide-react';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        setEvents(response.data.data);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(search.toLowerCase()) || 
    event.venue.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container animate-fade-in">
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
        <h1>Discover Amazing Events</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.125rem' }}>
          Find and register for the best events happening around you. From tech conferences to local meetups, we have it all.
        </p>
      </div>

      <div style={{ marginBottom: 'var(--space-xl)', display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
          <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search events by title or venue..."
            style={{ paddingLeft: '2.5rem', borderRadius: 'var(--border-radius-lg)' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-xl) 0' }}>
          <div style={{ 
            display: 'inline-block', width: '40px', height: '40px', 
            border: '4px solid var(--border-color)', borderTopColor: 'var(--accent-color)', 
            borderRadius: '50%', animation: 'spin 1s linear infinite' 
          }}></div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', color: 'var(--danger-color)', padding: 'var(--space-xl) 0' }}>
          {error}
        </div>
      ) : filteredEvents.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-xl) 0', color: 'var(--text-secondary)' }}>
          <h3>No events found</h3>
          <p>Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
