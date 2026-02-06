'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Download, Home } from 'lucide-react'

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
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative">
        {/* Home Button - Bottom Right */}
        <motion.button
          onClick={() => router.push('/')}
          className="fixed bottom-8 right-8 p-3 glass rounded-full hover:shadow-xl transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Go to home"
        >
          <Home size={24} className="text-white" />
        </motion.button>

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
                className="absolute top-1/2 right-3 -translate-y-1/2 text-white hover:text-orange-500 transition-colors p-2 cursor-pointer z-10"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3-11-8 1.02-2.6 2.71-4.73 4.76-6.01" />
                    <path d="M1 1l22 22" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
      <div className="flex justify-between items-center mb-12">
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

      <div className="space-y-12">
        {/* Founders Section */}
        <motion.div
          className="rounded-2xl p-8"
          style={{
            background: 'linear-gradient(145deg, rgba(25, 25, 25, 1), rgba(12, 12, 12, 1))',
            border: '1px solid rgba(255, 255, 255, 0.12)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Founders List</h2>
          </div>
          <FoundersList />
        </motion.div>

        {/* Investors Section */}
        <motion.div
          className="rounded-2xl p-8"
          style={{
            background: 'linear-gradient(145deg, rgba(25, 25, 25, 1), rgba(12, 12, 12, 1))',
            border: '1px solid rgba(255, 255, 255, 0.12)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Investors List</h2>
          </div>
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
        return profile?.role === 'founder' || profile?.type === 'founder'
      })
      .map((user: any) => {
        const profile = profiles.find((p: any) => p.userId === user.id)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          company: profile?.company || 'N/A',
          stage: profile?.stage || 'N/A',
          sector: profile?.sector || 'N/A',
          location: profile?.location || 'N/A',
          cofounderNeeded: profile?.cofounderNeeded ? 'Yes' : 'No',
          updatedAt: new Date().toLocaleDateString(),
          updatedBy: 'Founder'
        }
      })

    setFounders(foundersData)
    setLoading(false)
  }, [])

  const downloadExcel = () => {
    // Create CSV data
    const headers = ['Name', 'Email', 'Company', 'Stage', 'Sector', 'Location', 'Co-founder Needed', 'Updated By', 'Updated At']
    const rows = founders.map(f => [
      f.name,
      f.email,
      f.company,
      f.stage,
      f.sector,
      f.location,
      f.cofounderNeeded,
      f.updatedBy,
      f.updatedAt
    ])

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `founders_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  if (loading) {
    return <div className="text-muted-foreground">Loading founders...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <motion.button
          onClick={downloadExcel}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500 text-orange-400 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download size={18} />
          Download (CSV)
        </motion.button>
      </div>

      {founders.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No founders registered yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-white font-semibold">Name</th>
                <th className="px-4 py-3 text-left text-white font-semibold">Email</th>
                <th className="px-4 py-3 text-left text-white font-semibold">Company</th>
                <th className="px-4 py-3 text-left text-white font-semibold">Stage</th>
                <th className="px-4 py-3 text-left text-white font-semibold">Sector</th>
                <th className="px-4 py-3 text-left text-white font-semibold">Location</th>
                <th className="px-4 py-3 text-left text-white font-semibold">Co-founder</th>
                <th className="px-4 py-3 text-left text-white font-semibold">Updated By</th>
                <th className="px-4 py-3 text-left text-white font-semibold">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {founders.map((founder, idx) => (
                <tr key={founder.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white">{founder.name}</td>
                  <td className="px-4 py-3 text-gray-400">{founder.email}</td>
                  <td className="px-4 py-3 text-orange-400">{founder.company}</td>
                  <td className="px-4 py-3 text-blue-400">{founder.stage}</td>
                  <td className="px-4 py-3 text-green-400">{founder.sector}</td>
                  <td className="px-4 py-3 text-purple-400">{founder.location}</td>
                  <td className="px-4 py-3 text-yellow-400">{founder.cofounderNeeded}</td>
                  <td className="px-4 py-3 text-white">{founder.updatedBy}</td>
                  <td className="px-4 py-3 text-gray-400">{founder.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
        return profile?.role === 'investor' || profile?.type === 'investor'
      })
      .map((user: any) => {
        const profile = profiles.find((p: any) => p.userId === user.id)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          fundName: profile?.fundName || 'N/A',
          investmentStage: profile?.investmentStage || 'N/A',
          sectorFocus: Array.isArray(profile?.sectorFocus) ? profile.sectorFocus.join(', ') : 'N/A',
          geographyFocus: Array.isArray(profile?.geographyFocus) ? profile.geographyFocus.join(', ') : 'N/A',
          checkSize: profile?.checkSize || 'N/A',
          updatedAt: new Date().toLocaleDateString(),
          updatedBy: 'Investor'
        }
      })

    setInvestors(investorsData)
    setLoading(false)
  }, [])

  const downloadExcel = () => {
    // Create CSV data
    const headers = ['Name', 'Email', 'Fund Name', 'Investment Stage', 'Sector Focus', 'Geography Focus', 'Check Size', 'Updated By', 'Updated At']
    const rows = investors.map(i => [
      i.name,
      i.email,
      i.fundName,
      i.investmentStage,
      i.sectorFocus,
      i.geographyFocus,
      i.checkSize,
      i.updatedBy,
      i.updatedAt
    ])

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `investors_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  if (loading) {
    return <div className="text-muted-foreground">Loading investors...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <motion.button
          onClick={downloadExcel}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500 text-orange-400 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download size={18} />
          Download (CSV)
        </motion.button>
      </div>

      {investors.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No investors registered yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-white font-semibold">Name</th>
                <th className="px-4 py-3 text-left text-white font-semibold">Email</th>
                <th className="px-4 py-3 text-left text-white font-semibold">Fund Name</th>
                <th className="px-4 py-3 text-left text-white font-semibold">Investment Stage</th>
                <th className="px-4 py-3 text-left text-white font-semibold">Sector Focus</th>
                <th className="px-4 py-3 text-left text-white font-semibold">Geography Focus</th>
                <th className="px-4 py-3 text-left text-white font-semibold">Check Size</th>
                <th className="px-4 py-3 text-left text-white font-semibold">Updated By</th>
                <th className="px-4 py-3 text-left text-white font-semibold">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {investors.map((investor, idx) => (
                <tr key={investor.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white">{investor.name}</td>
                  <td className="px-4 py-3 text-gray-400">{investor.email}</td>
                  <td className="px-4 py-3 text-orange-400">{investor.fundName}</td>
                  <td className="px-4 py-3 text-blue-400">{investor.investmentStage}</td>
                  <td className="px-4 py-3 text-green-400">{investor.sectorFocus}</td>
                  <td className="px-4 py-3 text-purple-400">{investor.geographyFocus}</td>
                  <td className="px-4 py-3 text-yellow-400">{investor.checkSize}</td>
                  <td className="px-4 py-3 text-white">{investor.updatedBy}</td>
                  <td className="px-4 py-3 text-gray-400">{investor.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
