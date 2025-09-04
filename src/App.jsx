import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Popular from './pages/Popular'
import Latest from './pages/Latest'
import Auth from './components/Auth'
import UserProfile from './components/UserProfile'
import EditCharacterModal from './components/EditCharacterModal'

function App() {
  const [user, setUser] = useState(null)
  const [showAuth, setShowAuth] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editingCharacter, setEditingCharacter] = useState(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setShowAuth(false) // Close auth modal when user logs in
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleEditCharacter = (character) => {
    setEditingCharacter(character)
  }

  const handleDeleteCharacter = async (characterId) => {
    if (!window.confirm('Are you sure you want to delete this character?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('characters')
        .delete()
        .eq('id', characterId)

      if (error) throw error

      // The character list will be updated automatically by the page components
      // since they re-fetch data when needed
      
    } catch (error) {
      console.error('Error deleting character:', error)
      alert('Error deleting character: ' + error.message)
    }
  }

  const handleCharacterUpdate = (updatedCharacter) => {
    // The character list will be updated automatically by the page components
    // since they re-fetch data when needed
    setEditingCharacter(null)
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#111827'
      }}>
        Loading...
      </div>
    )
  }

  return (
    <Router>
      <Navbar 
        user={user}
        onShowAuth={() => setShowAuth(true)}
        onShowProfile={() => setShowProfile(true)}
      />
      <div style={{ paddingLeft: '80px', paddingRight: '80px', marginBottom: '80px'}}>
        <Routes>
          <Route path="/" element={<Home user={user} onEdit={handleEditCharacter} onDelete={handleDeleteCharacter} />} />
          <Route path="/popular" element={<Popular user={user} onEdit={handleEditCharacter} onDelete={handleDeleteCharacter} />} />
          <Route path="/latest" element={<Latest user={user} onEdit={handleEditCharacter} onDelete={handleDeleteCharacter} />} />
        </Routes>
      </div>

      {showAuth && (
        <Auth 
          onAuthChange={(user) => {
            setUser(user)
            setShowAuth(false)
          }}
          onClose={() => setShowAuth(false)}
        />
      )}

      {showProfile && user && (
        <UserProfile 
          user={user}
          onClose={() => setShowProfile(false)}
        />
      )}

      {editingCharacter && (
        <EditCharacterModal
          character={editingCharacter}
          onClose={() => setEditingCharacter(null)}
          onUpdate={handleCharacterUpdate}
        />
      )}
    </Router>
  )
}

export default App
