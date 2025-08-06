import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  const linkStyle = (path) => ({
    padding: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#111827',
    textDecoration: 'none',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    backgroundColor: location.pathname === path ? '#111827' : 'transparent',
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
        <div style={{ 
          color: '#111827', 
          fontSize: '20px', 
          fontWeight: 'bold' 
        }}>
          ⚔️ Anime Team Builder
        </div>
      </div>
    </nav>
  )
}
