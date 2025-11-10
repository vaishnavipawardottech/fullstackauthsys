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
      navigate('/welcome')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="email"
          required
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
          {status === 'loading' ? 'Logging in…' : 'Login'}
        </button>
      </form>

      {error && <div className="text-red-600 mt-3">{error}</div>}
      {user && <div className="text-green-600 mt-3">Logged in as {user.username}</div>}
    </div>
  )
}
