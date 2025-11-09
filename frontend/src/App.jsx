import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import { useDispatch } from 'react-redux'
import { refreshAccessToken } from './store/slices/authSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    // try to refresh access token on app start (backend reads httpOnly cookie)
    dispatch(refreshAccessToken())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
