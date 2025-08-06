import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import Card from '../components/Card'
import TeamSidebar from '../components/TeamSidebar'
import AddCharacterForm from '../components/AddCharacterForm'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  const [characters, setCharacters] = useState([])
  const [team, setTeam] = useState([])

  useEffect(() => {
    fetchCharacters()
  }, [])

  async function fetchCharacters() {
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .order('created_at', { ascending: false }) // ✅ Sort by newest first

    if (!error) setCharacters(data)
    else console.error('Error fetching characters:', error)
  }

  const handleAdd = (character) => {
    if (team.find((c) => c.id === character.id)) return
    if (team.length >= 3) {
      toast.warning('You can only select up to 3 team members!')
      return
    }
    setTeam([...team, character])
  }

  const handleRemove = (id) => {
    setTeam(team.filter((c) => c.id !== id))
  }

  const handleUpvote = async (id) => {
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
      fetchCharacters()
    } else {
      console.error('Error upvoting character:', error)
    }
  }

  return (
    <div className="flex flex-row gap-8 py-8 min-h-screen max-w-full">
      <div className="w-[65%] pr-5">
        <AddCharacterForm onCreated={fetchCharacters} />
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-4 text-center">
            🌟 Character Collection
          </h3>
        </div>
        <div className="grid grid-cols-2" style={{ gap: '10px' }}>
          {characters.map((char) => (
            <Card
              key={char.id}
              character={char}
              onAdd={handleAdd}
              onUpvote={handleUpvote}
            />
          ))}
        </div>
      </div>
      <div className="w-[35%] flex-shrink-0">
        <TeamSidebar team={team} onRemove={handleRemove} />
      </div>
    </div>
  )
}
