import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { toast } from 'react-toastify'

export default function AddCharacterForm({ onCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    anime: '',
    description: '',
    image_url: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Add default upvotes value
    const characterData = {
      ...formData,
      upvotes: 0
    }

    const { data, error } = await supabase
      .from('characters')
      .insert([characterData])
      .select() // Ensure we get the inserted data back

    if (error) {
      toast.error(`Failed to add character: ${error.message}`)
      console.error('Insert error:', error)
      console.error('Character data being inserted:', characterData)
    } else {
      toast.success('Character added!')
      setFormData({ name: '', anime: '', description: '', image_url: '' })
      if (onCreated) onCreated()
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl mb-8 space-y-6 transition-all duration-300 hover:shadow-purple-500/20">
        <div className="text-center">
        <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
          ✨ Create New Character
        </h2>
        <p className="text-purple-200 text-sm">Add your favorite anime character to the collection</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <label className="text-purple-200 text-sm font-semibold">Character Name</label>
          <input
            name="name"
            placeholder="Enter character name..."
            className="w-full bg-white/5 p-4 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-purple-200 text-sm font-semibold">Anime Series</label>
          <input
            name="anime"
            placeholder="Enter anime name..."
            className="w-full bg-white/5 p-4 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            value={formData.anime}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-purple-200 text-sm font-semibold">Image URL</label>
        <input
          name="image_url"
          placeholder="Paste image URL here..."
          className="w-full bg-white/5 p-4 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          value={formData.image_url}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-purple-200 text-sm font-semibold">Description</label>
        <textarea
          name="description"
          placeholder="Describe the character's abilities, personality, or story..."
          className="w-full h-24 bg-white/5 p-4 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 resize-none"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      
      <button 
        type="submit" 
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50 flex items-center justify-center space-x-2"
      >
        <span>Create Character</span>
      </button>
    </form>
    </div>
  )
}
