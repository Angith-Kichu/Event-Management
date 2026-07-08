import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Calendar, MapPin, Users, Clock, ArrowLeft } from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data.data);
      } catch (err) {
        setError('Failed to load event details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setIsRegistering(true);
    setRegistrationMessage(null);

    try {
      await api.post(`/registrations/${id}`);
      setRegistrationMessage({ type: 'success', text: 'Successfully registered for this event!' });
    } catch (err) {
      setRegistrationMessage({ 
        type: 'error', 
        text: err.response?.data?.message || 'Registration failed.' 
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div className="container" style={{ textAlign: 'center', padding: 'var(--space-xl) 0' }}>Loading event details...</div>;
  }

  if (error || !event) {
    return <div className="container" style={{ textAlign: 'center', color: 'var(--danger-color)', padding: 'var(--space-xl) 0' }}>{error || 'Event not found'}</div>;
  }

  return (
    <div className="container animate-fade-in">
      <button 
        onClick={() => navigate(-1)} 
        className="btn" 
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-md)', padding: '0.5rem 0', color: 'var(--text-secondary)' }}
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="card">
        {/* Banner */}
        <div style={{ height: '400px', backgroundColor: 'var(--bg-tertiary)', position: 'relative' }}>
          {event.banner_url ? (
            <img 
              src={`http://localhost:3000${event.banner_url}`} 
              alt={event.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDEyMDAgNDAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMmUyZTJlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjQ4IiBmaWxsPSIjODg4Ij5FdmVudCBCYW5uZXI8L3RleHQ+PC9zdmc+'; }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
              No Banner Available
            </div>
          )}
          <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
            <span className={`badge ${event.status === 'UPCOMING' ? 'badge-success' : 'badge-secondary'}`} style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
              {event.status}
            </span>
          </div>
        </div>

        <div className="card-body" style={{ padding: 'var(--space-xl)' }}>
          <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: 'var(--space-xl)' }}>
            
            {/* Left Column: Details */}
            <div>
              <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-md)' }}>{event.title}</h1>
              
              <div style={{ marginBottom: 'var(--space-xl)' }}>
                <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>About This Event</h3>
                <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>{event.description || 'No description provided.'}</p>
              </div>
            </div>

            {/* Right Column: Info & Action */}
            <div>
              <div className="card" style={{ backgroundColor: 'var(--bg-tertiary)', border: 'none' }}>
                <div className="card-body">
                  <h3 style={{ marginBottom: 'var(--space-md)' }}>Event Details</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: 'var(--space-lg)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <Calendar className="text-accent" style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontWeight: 600 }}>Date and Time</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                          Start: {formatDate(event.start_date)}<br/>
                          End: {formatDate(event.end_date)}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <MapPin className="text-accent" style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontWeight: 600 }}>Location</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{event.venue}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <Users className="text-accent" style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontWeight: 600 }}>Capacity</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{event.max_participants} Participants Max</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <Clock className="text-accent" style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontWeight: 600 }}>Registration Deadline</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{formatDate(event.registration_deadline)}</div>
                      </div>
                    </div>
                  </div>

                  {registrationMessage && (
                    <div style={{ 
                      padding: '0.75rem', 
                      borderRadius: 'var(--border-radius)', 
                      marginBottom: '1rem',
                      textAlign: 'center',
                      backgroundColor: registrationMessage.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: registrationMessage.type === 'success' ? 'var(--success-color)' : 'var(--danger-color)'
                    }}>
                      {registrationMessage.text}
                    </div>
                  )}

                  <button 
                    className="btn btn-primary" 
                    style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}
                    onClick={handleRegister}
                    disabled={isRegistering || event.status !== 'UPCOMING' || new Date() > new Date(event.registration_deadline)}
                  >
                    {isRegistering ? 'Processing...' : 
                     event.status !== 'UPCOMING' ? 'Registration Closed' :
                     new Date() > new Date(event.registration_deadline) ? 'Deadline Passed' :
                     'Register Now'}
                  </button>
                  {!isAuthenticated && (
                    <p style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      You need to log in to register.
                    </p>
                  )}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
