import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const CreateEvent = () => {
  const { user, hasRole } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    venue: '',
    start_date: '',
    end_date: '',
    max_participants: '',
    registration_deadline: '',
  });
  
  const [banner, setBanner] = useState(null);

  // Redirect if not authorized
  if (!hasRole(['ADMIN', 'ORGANIZER'])) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: 'var(--space-xl) 0' }}>
        <h2>Unauthorized</h2>
        <p>You do not have permission to create events.</p>
        <button className="btn btn-primary mt-md" onClick={() => navigate('/')}>Return Home</button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBanner(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    
    if (banner) {
      data.append('banner', banner);
    }

    try {
      const response = await api.post('/events', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate(`/events/${response.data.data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event. Please check your inputs.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <h1>Create New Event</h1>
        <p>Fill out the details below to publish a new event.</p>
      </div>

      <div className="card" style={{ padding: 'var(--space-xl)' }}>
        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', padding: 'var(--space-md)', borderRadius: 'var(--border-radius)', marginBottom: 'var(--space-lg)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="title">Event Title *</label>
            <input type="text" id="title" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">Description</label>
            <textarea id="description" name="description" className="form-control" rows="5" value={formData.description} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="venue">Venue / Location *</label>
            <input type="text" id="venue" name="venue" className="form-control" value={formData.venue} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-2" style={{ gap: 'var(--space-md)' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="start_date">Start Date & Time *</label>
              <input type="datetime-local" id="start_date" name="start_date" className="form-control" value={formData.start_date} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="end_date">End Date & Time *</label>
              <input type="datetime-local" id="end_date" name="end_date" className="form-control" value={formData.end_date} onChange={handleChange} required />
            </div>
          </div>

          <div className="grid grid-cols-2" style={{ gap: 'var(--space-md)' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="max_participants">Maximum Participants *</label>
              <input type="number" id="max_participants" name="max_participants" className="form-control" min="1" value={formData.max_participants} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="registration_deadline">Registration Deadline *</label>
              <input type="datetime-local" id="registration_deadline" name="registration_deadline" className="form-control" value={formData.registration_deadline} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 'var(--space-xl)' }}>
            <label className="form-label" htmlFor="banner">Event Banner Image</label>
            <input type="file" id="banner" name="banner" className="form-control" accept="image/*" onChange={handleFileChange} style={{ padding: '0.5rem' }} />
            <small style={{ color: 'var(--text-secondary)', display: 'block', marginTop: '0.25rem' }}>Optional. Recommended size: 1200x400px.</small>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Publishing...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
