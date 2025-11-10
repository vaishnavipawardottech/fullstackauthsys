import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, selectAuthError, selectCurrentUser } from '../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const error = useSelector(selectAuthError)
  const user = useSelector(selectCurrentUser)

  const handleLogin = async (e) => {
    // Simple onclick-based login: dispatch and navigate on success
    e.preventDefault();
    const result = await dispatch(loginUser({ username, email, password }))
    if (result?.meta?.requestStatus === 'fulfilled') {
      navigate('/welcome')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

  <form className="flex flex-col gap-4 w-full">
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="text"
            name="username"
            required
          />
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
          type="button"
          onClick={handleLogin}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 shadow"
        >
          Login
        </button>
      </form>

      {error && <div className="text-red-600 mt-3">{error}</div>}
      {user && <div className="text-green-600 mt-3">Logged in as {user.username}</div>}
      </div>
    </div>
  )
}
