import { Link, useLocation } from 'react-router-dom'

export default function Navbar({ user, onShowAuth, onShowProfile }) {
  const location = useLocation()

  const linkStyle = (path) => ({
    padding: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#111827',
    textDecoration: 'none',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    backgroundColor: location.pathname === path ? '#a855f7' : 'transparent',
    ...(location.pathname === path && { color: 'white' })
  })

  return (
    <nav style={{ 
      backgroundColor: '#d8f9b8', 
      height: '80px', 
      padding: '0 20px' 
    }}>
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        height: '100%' 
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link to="/" style={linkStyle('/')}>
             Home
          </Link>
          <Link to="/popular" style={linkStyle('/popular')}>
             Popular
          </Link>
          <Link to="/latest" style={linkStyle('/latest')}>
             Latest
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ 
            color: '#111827', 
            fontSize: '20px', 
            fontWeight: 'bold' 
          }}>
            ⚔️ Anime Team Builder
          </div>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#111827', fontSize: '14px' }}>
                Welcome, {user.user_metadata?.username || user.email.split('@')[0]}!
              </span>
              <button
                onClick={onShowProfile}
                style={{
                  backgroundColor: '#a855f7',
                  color: 'white',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#9333ea'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#a855f7'}
              >
                Profile
              </button>
            </div>
          ) : (
            <button
              onClick={onShowAuth}
              style={{
                backgroundColor: '#a855f7',
                color: 'white',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#9333ea'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#a855f7'}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
