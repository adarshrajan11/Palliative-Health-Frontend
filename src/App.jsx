import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Patients from './pages/Patients'
import Inventory from './pages/Inventory'
import PrivateRoute from './routes/PrivateRoute'
import AuthProvider from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/patients'
            element={
              <PrivateRoute>
                <Patients />
              </PrivateRoute>
            }
          />
          <Route
            path='/inventory'
            element={
              <PrivateRoute>
                <Inventory />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
