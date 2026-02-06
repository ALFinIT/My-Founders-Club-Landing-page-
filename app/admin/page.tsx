'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/logo'

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const ADMIN_USERNAME = 'admin'
  const ADMIN_PASSWORD = 'adminmfc26'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Validate credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setUsername('')
      setPassword('')
    } else {
      setError('Invalid username or password')
    }

    setIsLoading(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUsername('')
    setPassword('')
    setError('')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Logo />
        </motion.div>

        <motion.div
          className="w-full max-w-md glass rounded-2xl p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-muted-foreground mb-8">Enter your credentials</p>

          {error && (
            <motion.div
              className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-white mb-2">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-white/80 hover:text-white p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3-11-8 1.02-2.6 2.71-4.73 4.76-6.01" />
                    <path d="M1 1l22 22" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    )
  }

  // Admin Dashboard - After Authentication
  return (
    <div className="min-h-screen bg-black p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
        <motion.button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500 text-red-400 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Logout
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Founders Section */}
        <motion.div
          className="glass rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>👨‍💼</span> Founders
          </h2>
          <FoundersList />
        </motion.div>

        {/* Investors Section */}
        <motion.div
          className="glass rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>💼</span> Investors
          </h2>
          <InvestorsList />
        </motion.div>
      </div>
    </div>
  )
}

function FoundersList() {
  const [founders, setFounders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    // Load founders from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const profiles = JSON.parse(localStorage.getItem('profiles') || '[]')

    const foundersData = users
      .filter((user: any) => {
        const profile = profiles.find((p: any) => p.userId === user.id)
        return profile?.role === 'founder'
      })
      .map((user: any) => {
        const profile = profiles.find((p: any) => p.userId === user.id)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          ...profile
        }
      })

    setFounders(foundersData)
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="text-muted-foreground">Loading founders...</div>
  }

  return (
    <div className="space-y-4">
      {founders.length === 0 ? (
        <p className="text-muted-foreground">No founders registered yet</p>
      ) : (
        founders.map((founder) => (
          <motion.div
            key={founder.id}
            className="bg-white/5 border border-white/10 rounded-lg p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-white font-semibold">{founder.name}</p>
            <p className="text-sm text-muted-foreground">{founder.email}</p>
            {founder.companyName && (
              <p className="text-sm text-orange-400 mt-2">Company: {founder.companyName}</p>
            )}
            {founder.industry && (
              <p className="text-sm text-blue-400">Industry: {founder.industry}</p>
            )}
          </motion.div>
        ))
      )}
    </div>
  )
}

function InvestorsList() {
  const [investors, setInvestors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    // Load investors from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const profiles = JSON.parse(localStorage.getItem('profiles') || '[]')

    const investorsData = users
      .filter((user: any) => {
        const profile = profiles.find((p: any) => p.userId === user.id)
        return profile?.role === 'investor'
      })
      .map((user: any) => {
        const profile = profiles.find((p: any) => p.userId === user.id)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          ...profile
        }
      })

    setInvestors(investorsData)
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="text-muted-foreground">Loading investors...</div>
  }

  return (
    <div className="space-y-4">
      {investors.length === 0 ? (
        <p className="text-muted-foreground">No investors registered yet</p>
      ) : (
        investors.map((investor) => (
          <motion.div
            key={investor.id}
            className="bg-white/5 border border-white/10 rounded-lg p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-white font-semibold">{investor.name}</p>
            <p className="text-sm text-muted-foreground">{investor.email}</p>
            {investor.fundName && (
              <p className="text-sm text-orange-400 mt-2">Fund: {investor.fundName}</p>
            )}
            {investor.investmentSize && (
              <p className="text-sm text-green-400">Investment Size: ${investor.investmentSize}</p>
            )}
            {investor.focusArea && (
              <p className="text-sm text-purple-400">Focus Area: {investor.focusArea}</p>
            )}
          </motion.div>
        ))
      )}
    </div>
  )
}
