export default function Card({ character, onAdd, onRemove, onUpvote, onEdit, onDelete, inTeam, currentUser }) {
  const isOwner = currentUser && character.created_by === currentUser.id

  return (
    <div 
      className="rounded-2xl space-y-4 transition-all duration-300" 
      style={{ 
        maxWidth: '300px', 
        backgroundColor: 'white',
        boxShadow: '4px 4px 12px rgba(0, 0, 0, 0.15)',
        padding: '20px 10px',
        borderRadius: '10px'
      }}
    >
      <div className="flex justify-center items-center">
        <div className="relative overflow-hidden rounded-xl">
          <img 
            src={character.image_url} 
            alt={character.name} 
            className="h-40 w-full max-w-[150px] object-cover rounded-xl" 
          />
        </div>
      </div>
      
      <div className="space-y-2 text-center">
        <h2 className="text-lg font-bold" style={{ color: '#111827' }}>
          {character.name}
        </h2>
        <p className="text-sm italic font-medium" style={{ color: '#6b7280' }}>📺 {character.anime}</p>
        <p className="text-xs leading-relaxed" style={{ color: '#6b7280' }}>{character.description}</p>
        
        {/* Show creator info */}
        {character.created_by && (
          <p className="text-xs" style={{ color: '#9ca3af' }}>
            Created by: {character.creator_username || 'Anonymous'}
          </p>
        )}
      </div>

      {/* Owner actions */}
      {isOwner && (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <button
            onClick={() => onEdit(character)}
            style={{
              backgroundColor: '#f59e0b',
              color: 'white',
              padding: '6px 12px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#d97706'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f59e0b'}
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(character.id)}
            style={{
              backgroundColor: '#ef4444',
              color: 'white',
              padding: '6px 12px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
          >
            🗑️ Delete
          </button>
        </div>
      )}

      <div className="flex justify-between items-center pt-4">
        {onUpvote && (
          <button
            onClick={() => onUpvote(character.id)}
            className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 font-semibold text-xs"
          >
            
            <span>Upvote ({character.upvotes || 0})</span>
          </button>
        )}

        {inTeam ? (
          <button
            onClick={() => onRemove(character.id)}
            className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/50 font-semibold text-xs"
          >
            <span>❌</span>
            <span>Remove</span>
          </button>
        ) : (
          onAdd && (
            <button
              onClick={() => onAdd(character)}
              className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/50 font-semibold text-xs"
            >
              
              <span>Add to Team</span>
            </button>
          )
        )}
      </div>
    </div>
  )
}
