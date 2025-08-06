import Card from './Card'

export default function TeamSidebar({ team, onRemove }) {
  const getTeamStatusColor = () => {
    if (team.length === 0) return 'text-gray-400'
    if (team.length === 3) return 'text-green-400'
    return 'text-yellow-400'
  }

  const getTeamStatusIcon = () => {
    if (team.length === 0) return '😴'
    if (team.length === 3) return '🔥'
    return '⚔️'
  }

  return (
    <div className="backdrop-blur-md rounded-2xl shadow-2xl min-h-96 sticky top-4 transition-all duration-300 hover:shadow-purple-500/20 p-6" style={{ backgroundColor: '#e6ffcc' }}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text mb-2">
          {getTeamStatusIcon()} My Team
        </h2>
        <div className={`text-sm font-semibold ${getTeamStatusColor()}`}>
          {team.length}/3 Members Selected
        </div>
        <div className="w-full bg-white/20 rounded-full h-2 mt-3">
          <div 
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(team.length / 3) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {team.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🎯</div>
          <p className="text-purple-200 text-sm leading-relaxed">
            No team members added yet.<br/>
            <span className="text-cyan-300">Start building your ultimate anime team!</span>
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {team.map((char, index) => (
            <div key={char.id} className="relative">
              <div className="absolute -left-2 -top-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold z-10">
                {index + 1}
              </div>
              <Card character={char} onRemove={onRemove} inTeam={true} />
            </div>
          ))}
          
          {team.length === 3 && (
            <div className="text-center py-4 px-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl">
              <div className="text-2xl mb-2">🎉</div>
              <p className="text-green-300 text-sm font-semibold">
                Team Complete! Ready for battle!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
