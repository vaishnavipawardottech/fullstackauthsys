import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { selectCurrentUser, logoutUser, clearAuth } from '../store/slices/authSlice'

function Welcome() {
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const result = await dispatch(logoutUser())
      if (result?.meta?.requestStatus === 'fulfilled') {
        dispatch(clearAuth())
        navigate('/login')
      } else {
        window.alert(result?.payload || 'Logout failed')
      }
    } catch (err) {
      console.error(err)
      window.alert('Logout failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
  <div className="relative w-full max-w-2xl p-8 bg-white border border-gray-200 rounded-lg shadow-md text-center">
        

        {!user ? (
          <div className='flex flex-col justify-center'>
            <h1 className="text-2xl font-semibold mb-8">User not found please login/register</h1>
            <div className="flex justify-center gap-4">
            <Link to="/login" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Login</Link>
            <Link to="/register" className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50">Register</Link>
          </div>
          </div>
          
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome{user?.username ? `, ${user.username}` : ''}!</h1>
            <p className="text-gray-600 mb-6">{user ? 'You are now logged in.' : 'Please login or register to continue.'}</p>
          </div>
        )}
        {user && (
          <button
            onClick={handleLogout}
            className="absolute right-4 bottom-4 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  )
}

export default Welcome