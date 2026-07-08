import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <Calendar size={24} className="text-accent" style={{ color: 'var(--accent-color)' }} />
          <span>EventManager</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="nav-links">
          <Link to="/" className="nav-link">Events</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              {(user?.role === 'ADMIN' || user?.role === 'ORGANIZER') && (
                <Link to="/create-event" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                  Create Event
                </Link>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem', borderLeft: '1px solid var(--border-color)', paddingLeft: '1rem' }}>
                <User size={20} />
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{user?.name}</span>
                <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.4rem', marginLeft: '0.5rem' }} title="Logout">
                  <LogOut size={16} />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Log In</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div style={{ 
          position: 'absolute', top: '100%', left: 0, right: 0, 
          backgroundColor: 'var(--bg-secondary)', padding: '1rem', 
          borderBottom: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1rem'
        }} className="animate-fade-in">
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Events</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
              {(user?.role === 'ADMIN' || user?.role === 'ORGANIZER') && (
                <Link to="/create-event" className="nav-link" style={{ color: 'var(--accent-color)' }} onClick={() => setIsMenuOpen(false)}>
                  Create Event
                </Link>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={20} />
                  <span>{user?.name}</span>
                </div>
                <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.4rem 1rem' }}>
                  <LogOut size={16} style={{ marginRight: '0.5rem' }} /> Logout
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Link to="/login" className="btn btn-secondary" onClick={() => setIsMenuOpen(false)} style={{ textAlign: 'center' }}>Log In</Link>
              <Link to="/register" className="btn btn-primary" onClick={() => setIsMenuOpen(false)} style={{ textAlign: 'center' }}>Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
