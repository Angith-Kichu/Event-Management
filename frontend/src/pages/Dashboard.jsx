import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import EventCard from '../components/EventCard';
import { User as UserIcon, Mail, Calendar, Shield } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch user's specific events
    // For organizers: events they created
    // For users: events they registered for
    // Here we'll just fetch all events and filter client-side for organizers if the API doesn't have a specific endpoint yet
    const fetchDashboardData = async () => {
      try {
        if (user?.role === 'ORGANIZER' || user?.role === 'ADMIN') {
          const response = await api.get('/events');
          const allEvents = response.data.data;
          setUserEvents(allEvents.filter(e => e.created_by === user.id));
        } else {
          const response = await api.get('/registrations/my-events');
          setUserEvents(response.data.data);
        }
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="container animate-fade-in">
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <h1>Dashboard</h1>
        <p>Manage your profile and events</p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr 2fr', gap: 'var(--space-xl)' }}>
        {/* Profile Card */}
        <div className="card" style={{ height: 'fit-content' }}>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
              <div style={{ 
                width: '100px', height: '100px', borderRadius: '50%', 
                backgroundColor: 'var(--bg-tertiary)', display: 'flex', 
                alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-md)'
              }}>
                {user.profile_image ? (
                  <img src={`http://localhost:3000${user.profile_image}`} alt={user.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <UserIcon size={48} color="var(--text-secondary)" />
                )}
              </div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-xs)' }}>{user.name}</h2>
              <span className="badge badge-success">{user.role}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={18} />
                <span>{user.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Shield size={18} />
                <span>Role: {user.role}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Calendar size={18} />
                <span>Joined: {new Date(user.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Content */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
            <h2>{user.role === 'ORGANIZER' || user.role === 'ADMIN' ? 'My Organized Events' : 'My Registrations'}</h2>
          </div>

          {loading ? (
            <div>Loading your events...</div>
          ) : userEvents.length > 0 ? (
            <div className="grid grid-cols-2">
              {userEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="card" style={{ padding: 'var(--space-xl)', textAlign: 'center', backgroundColor: 'var(--bg-tertiary)' }}>
              <h3 style={{ marginBottom: 'var(--space-sm)' }}>No events found</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
                {user.role === 'ORGANIZER' || user.role === 'ADMIN' 
                  ? 'You haven\'t organized any events yet.' 
                  : 'You haven\'t registered for any events yet.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
