import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import Card from '../components/Card'

export default function Latest({ user, onEdit, onDelete }) {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetchLatest()
  }, [])

  const handleDelete = async (characterId) => {
    await onDelete(characterId)
    fetchLatest() // Refresh the list after deletion
  }

  async function fetchLatest() {
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .order('created_at', { ascending: false })
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
        fetchLatest()
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
        fetchLatest()
        return
      }

      // Fetch fresh data to ensure consistency
      await fetchLatest()
    } catch (error) {
      console.error('Error upvoting character:', error)
      // Revert the optimistic update
      fetchLatest()
    }
  }

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text mb-4">
          ⚡ Latest Characters
        </h1>
        <p className="text-purple-200">Check out the newest additions to our collection</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {characters.map((char) => (
          <Card key={char.id} character={char} onUpvote={handleUpvote} currentUser={user} onEdit={onEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}
