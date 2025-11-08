import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, selectAuthStatus, selectAuthError, selectCurrentUser } from '../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const status = useSelector(selectAuthStatus)
  const error = useSelector(selectAuthError)
  const user = useSelector(selectCurrentUser)

  async function handleSubmit(e) {
    e.preventDefault()
    const result = await dispatch(loginUser({ email, password }))
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/dashboard')
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360 }}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password" type="password" />
        <button type="submit" disabled={status === 'loading'}>Login</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {user && <div>Logged in as {user.username}</div>}
    </div>
  )
}
