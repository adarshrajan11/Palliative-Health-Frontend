import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Patients from './pages/Patients'
import Inventory from './pages/Inventory'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/patients' element={<Patients />} />
        <Route path='/inventory' element={<Inventory />} />
      </Routes>
    </Router>
  )
}

export default App
