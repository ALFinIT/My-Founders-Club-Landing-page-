'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Logo } from '@/components/logo'
import { ChevronRight } from 'lucide-react'

export default function AuthPage() {
  const router = useRouter()
  const { login, signup } = useAuth()
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (isSignup) {
        await signup(email, password, name)
        router.push('/setup-profile')
      } else {
        await login(email, password)
        router.push('/setup-profile')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Side - Image/Branding */}
      <motion.div
        className="hidden lg:flex w-1/2 bg-gradient-to-br from-orange-600 via-orange-500 to-red-600 flex-col items-center justify-center p-12 relative overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-center">
          <motion.div
            className="mb-8"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Logo />
          </motion.div>
          <h1 className="text-5xl font-bold text-white mb-6">My Founders Club</h1>
          <p className="text-xl text-white/90 mb-8">Build Locally. Champion Regionally. Scale Globally.</p>
          <p className="text-lg text-white/75">Join 500+ founders in the Gulf startup ecosystem</p>

          {/* Stats */}
          <motion.div
            className="mt-12 grid grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div>
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="text-sm text-white/75">Founders</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">50+</p>
              <p className="text-sm text-white/75">Investors</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">$100M+</p>
              <p className="text-sm text-white/75">Funding</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Auth Form */}
      <motion.div
        className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-12"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-md">
          {/* Logo for Mobile */}
          <motion.div className="lg:hidden mb-8 flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Logo />
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-4xl font-bold text-white mb-2">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-muted-foreground mb-8">
              {isSignup ? 'Join the My Founders Club community' : 'Sign in to your account'}
            </p>

            {error && (
              <motion.div
                className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-white mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              {isSignup && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <span>{isSignup ? 'Creating Account...' : 'Signing in...'}</span>
                ) : (
                  <>
                    <span>{isSignup ? 'Create Account' : 'Sign In'}</span>
                    <ChevronRight size={18} />
                  </>
                )}
              </motion.button>
            </form>

            {/* Toggle Auth Mode */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={() => {
                    setIsSignup(!isSignup)
                    setError('')
                  }}
                  className="text-orange-400 hover:text-orange-300 font-semibold"
                >
                  {isSignup ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
