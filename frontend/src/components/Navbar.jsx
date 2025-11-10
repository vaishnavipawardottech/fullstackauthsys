import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  

    return (
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold text-2xl ml-30">AuthSys</Link>
        </div>

        <div className="flex items-center gap-3 mr-30">
          <Link to="/login" className="px-5 py-2.5 rounded-md border border-black text-sm font-medium text-gray-700 hover:bg-gray-100">Login</Link>
          <Link to="/register" className="px-5 py-2.5 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 shadow">Register</Link>
        </div>
      </header>
    )
}
