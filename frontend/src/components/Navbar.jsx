import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, logoutUser } from '../store/slices/authSlice'

export default function Navbar() {
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await dispatch(logoutUser())
    navigate('/')
  }

  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', fontWeight: '600' }}>AuthSys</Link>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link to="/">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
      </div>

      <div>
        {user ? (
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span>Hi, {user.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <span style={{ color: '#6b7280' }}>Not logged in</span>
        )}
      </div>
    </header>
  )
}
