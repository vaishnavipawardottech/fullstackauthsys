import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, logoutUser } from '../store/slices/authSlice'
import api from '../utils/api'

export default function Dashboard() {
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const [protectedData, setProtectedData] = useState(null)

  useEffect(() => {
    let mounted = true
    api.get('/api/protected')
      .then(res => { if (mounted) setProtectedData(res.data) })
      .catch(err => { if (mounted) setProtectedData({ error: err.message }) })
    return () => { mounted = false }
  }, [])

  function handleLogout() {
    dispatch(logoutUser())
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Dashboard</h2>
      {user ? <div>Welcome, {user.username}</div> : <div>You are not logged in</div>}
      <button onClick={handleLogout} style={{ marginTop: 8 }}>Logout</button>
      <h3>Protected data</h3>
      <pre>{JSON.stringify(protectedData, null, 2)}</pre>
    </div>
  )
}
