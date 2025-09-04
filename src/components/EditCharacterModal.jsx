import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { toast } from 'react-toastify'

const EditCharacterModal = ({ character, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: character?.name || '',
    anime: character?.anime || '',
    image_url: character?.image_url || '',
    description: character?.description || ''
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.anime.trim() || !formData.image_url.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('characters')
        .update({
          name: formData.name.trim(),
          anime: formData.anime.trim(),
          image_url: formData.image_url.trim(),
          description: formData.description.trim()
        })
        .eq('id', character.id)
        .select()

      if (error) throw error

      toast.success('Character updated successfully!')
      onUpdate(data[0]) // Pass the updated character back to parent
      onClose()
    } catch (error) {
      console.error('Error updating character:', error)
      toast.error('Error updating character: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!character) return null

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
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
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

        <h2 style={{ 
          margin: '0 0 24px 0', 
          color: '#1F2937',
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          Edit Character
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#374151',
              fontWeight: '600',
              fontSize: '14px'
            }}>
              Character Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter character name"
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#10B981'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#374151',
              fontWeight: '600',
              fontSize: '14px'
            }}>
              Anime Series *
            </label>
            <input
              type="text"
              name="anime"
              value={formData.anime}
              onChange={handleInputChange}
              placeholder="Enter anime name"
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#10B981'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#374151',
              fontWeight: '600',
              fontSize: '14px'
            }}>
              Image URL *
            </label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              placeholder="Enter image URL"
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#10B981'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#374151',
              fontWeight: '600',
              fontSize: '14px'
            }}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter character description"
              rows="4"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box',
                resize: 'vertical',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#10B981'}
              onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
            />
          </div>

          {/* Preview */}
          {formData.image_url && (
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                color: '#374151',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                Preview
              </label>
              <div style={{ textAlign: 'center' }}>
                <img 
                  src={formData.image_url} 
                  alt="Preview" 
                  style={{ 
                    maxWidth: '150px', 
                    maxHeight: '150px', 
                    borderRadius: '8px',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#6B7280',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#4B5563'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#6B7280'}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: loading ? '#9CA3AF' : '#10B981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                if (!loading) e.target.style.backgroundColor = '#059669'
              }}
              onMouseOut={(e) => {
                if (!loading) e.target.style.backgroundColor = '#10B981'
              }}
            >
              {loading ? 'Updating...' : 'Update Character'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCharacterModal
