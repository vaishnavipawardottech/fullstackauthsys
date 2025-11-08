import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, selectAuthStatus, selectAuthError } from '../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'

export default function RegisterForm() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const status = useSelector(selectAuthStatus)
  const error = useSelector(selectAuthError)

  async function handleSubmit(e) {
    e.preventDefault()
    const result = await dispatch(registerUser({ username, email, password }))
    if (result.meta.requestStatus === 'fulfilled') {
      // after register, redirect to login
      navigate('/')
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360 }}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="username" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password" type="password" />
        <button type="submit" disabled={status === 'loading'}>Register</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  )
}
