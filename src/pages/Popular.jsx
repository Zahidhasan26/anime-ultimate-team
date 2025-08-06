import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import Card from '../components/Card'

export default function Popular() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetchPopular()
  }, [])

  async function fetchPopular() {
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .order('upvotes', { ascending: false })
    if (!error) setCharacters(data)
  }

  async function handleUpvote(id) {
    // First get the current upvotes value
    const { data: currentData, error: fetchError } = await supabase
      .from('characters')
      .select('upvotes')
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error('Error fetching current upvotes:', fetchError)
      return
    }

    // Update with the incremented value
    const { error } = await supabase
      .from('characters')
      .update({ upvotes: (currentData.upvotes || 0) + 1 })
      .eq('id', id)
    
    if (!error) {
      fetchPopular()
    } else {
      console.error('Error upvoting character:', error)
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
          <Card key={char.id} character={char} onUpvote={handleUpvote} />
        ))}
      </div>
    </div>
  )
}
