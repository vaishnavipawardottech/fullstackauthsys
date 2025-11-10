import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, selectAuthLoading, selectAuthError, clearAuthError } from '../store/slices/authSlice'
import { useNavigate, Link } from 'react-router-dom'

export default function RegisterForm() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const status = useSelector(selectAuthLoading)
  const error = useSelector(selectAuthError)

  // Clear auth error message when register page mounts
  useEffect(() => {
    dispatch(clearAuthError())
  }, [dispatch])

  async function handleSubmit(e) {
    e.preventDefault()
    const result = await dispatch(registerUser({ username, email, password }))
    if (result.meta.requestStatus === 'fulfilled') {
      // after register, redirect to login
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

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

      <div className="mt-4 text-sm text-center text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-600 hover:underline">Login here</Link>
      </div>

      {error && <div className="text-red-600 mt-3">{error}</div>}
      </div>
    </div>
  )
}
