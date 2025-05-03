import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import TCPPage from './pages/TCPPage'
import HTTPPage from './pages/HTTPPage'
import DNSPage from './pages/DNSPage'
import NetworkModelsPage from './pages/NetworkModelsPage'
import GlobalStyles from './styles/GlobalStyles'

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tcp" element={<TCPPage />} />
          <Route path="/http" element={<HTTPPage />} />
          <Route path="/dns" element={<DNSPage />} />
          <Route path="/network-models" element={<NetworkModelsPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
