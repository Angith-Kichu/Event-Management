import { Calendar } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
      backgroundColor: 'var(--bg-secondary)', 
      padding: 'var(--space-xl) 0',
      marginTop: 'auto',
      borderTop: '1px solid var(--border-color)'
    }}>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 'var(--space-md)',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <Calendar size={24} style={{ color: 'var(--accent-color)' }} />
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              EventManager
            </span>
          </div>
          
          <p style={{ maxWidth: '400px', margin: '0 auto', color: 'var(--text-secondary)' }}>
            A minimalistic and clean platform for discovering and organizing events seamlessly.
          </p>
          
          <div style={{ 
            marginTop: 'var(--space-md)', 
            paddingTop: 'var(--space-md)', 
            borderTop: '1px solid var(--border-color)',
            width: '100%',
            color: 'var(--text-secondary)',
            fontSize: '0.875rem'
          }}>
            &copy; {currentYear} EventManager. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
