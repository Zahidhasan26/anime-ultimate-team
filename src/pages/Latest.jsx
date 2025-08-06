import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import Card from '../components/Card'

export default function Latest() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetchLatest()
  }, [])

  async function fetchLatest() {
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .order('created_at', { ascending: false })
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
      fetchLatest()
    } else {
      console.error('Error upvoting character:', error)
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
          <Card key={char.id} character={char} onUpvote={handleUpvote} />
        ))}
      </div>
    </div>
  )
}
