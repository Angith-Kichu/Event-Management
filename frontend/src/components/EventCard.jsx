import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'UPCOMING': return 'badge-success';
      case 'ONGOING': return 'badge-primary';
      case 'COMPLETED': return 'badge-secondary';
      case 'CANCELLED': return 'badge-danger';
      default: return 'badge-secondary';
    }
  };

  return (
    <div className="card">
      <div style={{ height: '200px', backgroundColor: 'var(--bg-tertiary)', overflow: 'hidden', position: 'relative' }}>
        {event.banner_url ? (
          <img 
            src={`http://localhost:3000${event.banner_url}`} 
            alt={event.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgNDAwIDIwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzJlMmUyZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzg4OCI+RXZlbnQgQmFubmVyPC90ZXh0Pjwvc3ZnPg=='; }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
            No Banner
          </div>
        )}
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <span className={`badge ${getStatusColor(event.status)}`}>{event.status}</span>
        </div>
      </div>
      
      <div className="card-body">
        <h3 className="card-title">{event.title}</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={16} />
            <span>{formatDate(event.start_date)} - {formatDate(event.end_date)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={16} />
            <span>{event.venue}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={16} />
            <span>Max: {event.max_participants} participants</span>
          </div>
        </div>
        
        <Link to={`/events/${event.id}`} className="btn btn-secondary" style={{ width: '100%' }}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
