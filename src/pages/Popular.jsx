import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import Card from '../components/Card'

export default function Popular({ user, onEdit, onDelete }) {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetchPopular()
  }, [])

  const handleDelete = async (characterId) => {
    await onDelete(characterId)
    fetchPopular() // Refresh the list after deletion
  }

  async function fetchPopular() {
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .order('upvotes', { ascending: false })
    if (!error) setCharacters(data)
  }

  async function handleUpvote(id) {
    try {
      // Optimistically update the UI first
      setCharacters(prevCharacters => 
        prevCharacters.map(char => 
          char.id === id 
            ? { ...char, upvotes: (char.upvotes || 0) + 1 }
            : char
        )
      )

      // Get current upvotes from database
      const { data: currentData, error: fetchError } = await supabase
        .from('characters')
        .select('upvotes')
        .eq('id', id)
        .single()

      if (fetchError) {
        console.error('Error fetching current upvotes:', fetchError)
        // Revert the optimistic update
        fetchPopular()
        return
      }

      // Update in database
      const { error } = await supabase
        .from('characters')
        .update({ upvotes: (currentData.upvotes || 0) + 1 })
        .eq('id', id)
      
      if (error) {
        console.error('Error upvoting character:', error)
        // Revert the optimistic update
        fetchPopular()
        return
      }

      // Fetch fresh data to ensure consistency
      await fetchPopular()
    } catch (error) {
      console.error('Error upvoting character:', error)
      // Revert the optimistic update
      fetchPopular()
    }
  }

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text mb-4">
          🔥 Most Popular Characters
        </h1>
        <p className="text-purple-200">Discover the community's favorite anime characters</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {characters.map((char) => (
          <Card key={char.id} character={char} onUpvote={handleUpvote} currentUser={user} onEdit={onEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}
