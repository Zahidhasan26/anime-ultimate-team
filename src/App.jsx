import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Popular from './pages/Popular'
import Latest from './pages/Latest'

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingLeft: '80px', paddingRight: '80px', marginBottom: '80px'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/latest" element={<Latest />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
