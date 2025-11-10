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
      navigate('/login')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          required
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-60"
        >
          {status === 'loading' ? 'Creating…' : 'Register'}
        </button>
      </form>

      {error && <div className="text-red-600 mt-3">{error}</div>}
    </div>
  )
}
