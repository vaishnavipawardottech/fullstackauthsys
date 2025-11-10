import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, ArrowRight, LogIn } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="grow flex items-center justify-center container mx-auto px-6 py-8">
        <section className="max-w-3xl mx-auto text-center py-6">
          <h1 className="text-4xl font-extrabold mb-4">Welcome to AuthSys</h1>
          <p className="text-gray-600 mb-8">A simple, secure authentication system built with Node, MySQL and React.</p>

          <div className="flex items-center justify-center gap-4">
            <Link to="/register" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">
              Get started <ArrowRight size={16} />
            </Link>

            <Link to="/login" className="inline-flex items-center gap-2 border border-indigo-600 text-indigo-600 px-5 py-3 rounded-md hover:bg-indigo-50">
              Login
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-[#0b2545] border-t border-[#08203a]">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row md:justify-center md:items-start gap-6">
          <div className="md:max-w-xs mx-auto md:mx-0 text-left">
            <h3 className="text-white text-lg font-semibold">AuthSys</h3>
            <p className="text-gray-300 text-sm mt-2 leading-relaxed max-w-[20rem]">Authentication system demo — secure sign-in, refresh tokens, and protected routes.</p>
          </div>

          <div className="md:max-w-xs mx-auto md:mx-0 text-left">
            <h4 className="text-white font-medium mb-2">Quick links</h4>
            <ul className="space-y-1">
              <li><Link to="/register" className="text-gray-300 text-sm hover:underline">Register</Link></li>
              <li><Link to="/login" className="text-gray-300 text-sm hover:underline">Login</Link></li>
            </ul>
          </div>

          <div className="md:max-w-xs mx-auto md:mx-0 text-left">
            <h4 className="text-white font-medium mb-2">Contact</h4>
            <div className="flex items-center gap-2 text-slate-200">
              <Mail size={18} />
              <a className="hover:underline text-gray-300 text-sm">pawarvaishnavi.3010@gmail.com</a>
            </div>
            <div className="flex items-center gap-2 text-slate-200 mt-2">
              <Phone size={18} />
              <a className="hover:underline text-gray-300 text-sm">9511613033</a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#08203a]">
          <div className="container mx-auto px-6 py-3 text-sm text-gray-400 text-center">© 2025 AuthSys. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
