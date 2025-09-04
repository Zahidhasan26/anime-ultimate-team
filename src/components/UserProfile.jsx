import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

const UserProfile = ({ user, onClose }) => {
  const [userStats, setUserStats] = useState({
    totalCharacters: 0,
    favoriteAnime: 'Loading...',
    joinedDate: 'Loading...'
  })

  useEffect(() => {
    if (user) {
      fetchUserStats()
    }
  }, [user])

  const fetchUserStats = async () => {
    try {
      // Get user's characters count
      const { data: characters, error } = await supabase
        .from('characters')
        .select('*')
        .eq('user_id', user.id)

      if (error) throw error

      // Calculate stats
      const totalCharacters = characters?.length || 0
      const animeList = characters?.map(char => char.anime) || []
      const favoriteAnime = animeList.length > 0 ? 
        animeList.reduce((a, b, i, arr) => 
          arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
        ) : 'No characters yet'

      setUserStats({
        totalCharacters,
        favoriteAnime,
        joinedDate: new Date(user.created_at).toLocaleDateString()
      })
    } catch (error) {
      console.error('Error fetching user stats:', error)
    }
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      onClose()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (!user) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '32px',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#6B7280'
          }}
        >
          ×
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#10B981',
            margin: '0 auto 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'white'
          }}>
            {user.email.charAt(0).toUpperCase()}
          </div>
          <h2 style={{ margin: '0 0 8px 0', color: '#1F2937' }}>
            User Profile
          </h2>
          <p style={{ margin: 0, color: '#6B7280', fontSize: '14px' }}>
            {user.email}
          </p>
        </div>

        <div style={{ 
          backgroundColor: '#F9FAFB', 
          borderRadius: '8px', 
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#374151', fontSize: '16px' }}>
              Your Stats
            </h3>
          </div>
          
          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6B7280', fontSize: '14px' }}>Total Characters:</span>
              <span style={{ color: '#1F2937', fontWeight: '600' }}>{userStats.totalCharacters}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6B7280', fontSize: '14px' }}>Favorite Anime:</span>
              <span style={{ color: '#1F2937', fontWeight: '600', maxWidth: '150px', textAlign: 'right' }}>
                {userStats.favoriteAnime}
              </span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6B7280', fontSize: '14px' }}>Member Since:</span>
              <span style={{ color: '#1F2937', fontWeight: '600' }}>{userStats.joinedDate}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#EF4444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#DC2626'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#EF4444'}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default UserProfile
