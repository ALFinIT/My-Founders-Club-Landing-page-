'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { useProfile } from '@/context/profile-context'
import { Logo } from '@/components/logo'
import AvatarUploader from '@/components/AvatarUploader'
import { ChevronRight, MessageCircle, Linkedin, Twitter, Instagram, Home } from 'lucide-react'
import Link from 'next/link'

export default function SetupProfilePage() {
  const router = useRouter()
  const { user } = useAuth()
  const { saveProfile, getProfile } = useProfile()

  const [userType, setUserType] = useState<'founder' | 'investor' | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'bot'; content: string }>>([])
  const [chatInput, setChatInput] = useState('')
  const [isSendingChat, setIsSendingChat] = useState(false)

  // Founder fields
  const [founderData, setFounderData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: '',
    stage: 'Idea' as const,
    sector: '',
    location: '',
    cofounderNeeded: false,
    description: '',
    linkedin: '',
    twitter: '',
  })

  // Investor fields
  const [investorData, setInvestorData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    fundName: '',
    investmentStage: 'Seed' as const,
    sectorFocus: [] as string[],
    geographyFocus: [] as string[],
    checkSize: '',
    portfolioCompanies: '',
    linkedin: '',
    website: '',
  })

  useEffect(() => {
    if (!user) {
      router.push('/auth')
    }
  }, [user, router])

  const sectorOptions = ['FinTech', 'SaaS', 'CleanTech', 'HealthTech', 'E-commerce', 'AI/ML', 'Other']
  const geographyOptions = ['UAE', 'KSA', 'GCC', 'MENA', 'Global']
  const stageOptions = ['Idea', 'Building', 'Launch', 'Growth']
  const investmentStageOptions = ['Seed', 'Series A', 'Series B', 'Growth']

  // Chat handler
  const handleSendMessage = async () => {
    if (!chatInput.trim()) return

    const userMessage = chatInput.trim()
    setChatInput('')
    setChatMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsSendingChat(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: chatMessages.map((msg) => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content,
          })),
        }),
      })

      const data = await response.json()
      if (data.response) {
        setChatMessages((prev) => [...prev, { role: 'bot', content: data.response }])
      }
    } catch (err) {
      console.error('Chat error:', err)
      setChatMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'Sorry, I encountered an error. Please try again.' },
      ])
    } finally {
      setIsSendingChat(false)
    }
  }

  const handleFounderChange = (field: string, value: any) => {
    setFounderData((prev) => ({ ...prev, [field]: value }))
  }

  const handleInvestorChange = (field: string, value: any) => {
    setInvestorData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleSector = (sector: string) => {
    setInvestorData((prev) => ({
      ...prev,
      sectorFocus: prev.sectorFocus.includes(sector)
        ? prev.sectorFocus.filter((s) => s !== sector)
        : [...prev.sectorFocus, sector],
    }))
  }

  const toggleGeography = (geo: string) => {
    setInvestorData((prev) => ({
      ...prev,
      geographyFocus: prev.geographyFocus.includes(geo)
        ? prev.geographyFocus.filter((g) => g !== geo)
        : [...prev.geographyFocus, geo],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Validation
      if (userType === 'founder') {
        if (!founderData.name || !founderData.email || !founderData.company || !founderData.sector || !founderData.location) {
          throw new Error('Please fill in all required fields')
        }

        const profile = {
          userId: user!.id,
          type: 'founder' as const,
          name: founderData.name,
          email: founderData.email,
          company: founderData.company,
          stage: founderData.stage,
          sector: founderData.sector,
          location: founderData.location,
          cofounderNeeded: founderData.cofounderNeeded,
          description: founderData.description,
          socialLinks: {
            linkedin: founderData.linkedin,
            twitter: founderData.twitter,
          },
        }

        saveProfile(profile)
      } else if (userType === 'investor') {
        if (!investorData.name || !investorData.email || !investorData.fundName || investorData.sectorFocus.length === 0 || investorData.geographyFocus.length === 0) {
          throw new Error('Please fill in all required fields')
        }

        const profile = {
          userId: user!.id,
          type: 'investor' as const,
          name: investorData.name,
          email: investorData.email,
          fundName: investorData.fundName,
          investmentStage: investorData.investmentStage,
          sectorFocus: investorData.sectorFocus,
          geographyFocus: investorData.geographyFocus,
          checkSize: investorData.checkSize,
          portfolioCompanies: investorData.portfolioCompanies,
          linkedin: investorData.linkedin,
          website: investorData.website,
        }

        saveProfile(profile)
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save profile')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div 
      className="min-h-screen py-12 px-4 md:px-6 relative overflow-hidden bg-black"
      style={{
        backgroundImage: 'url(/MFC%20theme.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Top Navigation - Only Join Button */}
      {!user && (
        <div className="fixed top-6 right-6 z-50">
          <Link href="/auth">
            <motion.button
              className="px-6 py-2 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join
            </motion.button>
          </Link>
        </div>
      )}

      {/* Social Media Icons + Chat Bot Assistant */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
        {/* Social Media Icons in a Line */}
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-3 hover:bg-white/10 transition-all">
          {/* Home */}
          <Link href="/">
            <motion.button
              className="p-2 text-white bg-black rounded-full hover:bg-gray-800 transition-all flex items-center justify-center"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              title="Back to Home"
            >
              <Home size={18} />
            </motion.button>
          </Link>

          {/* X (Twitter) */}
          <motion.a
            href="https://twitter.com/my_founders_club"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-white bg-black rounded-full hover:bg-gray-800 transition-all flex items-center justify-center"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            title="Follow us on X"
          >
            <Twitter size={18} />
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            href="https://linkedin.com/company/my-founders-club"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-white bg-black rounded-full hover:bg-gray-800 transition-all flex items-center justify-center"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            title="Connect on LinkedIn"
          >
            <Linkedin size={18} />
          </motion.a>

          {/* Instagram */}
          <motion.a
            href="https://instagram.com/my_founders_club"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-white bg-black rounded-full hover:bg-gray-800 transition-all flex items-center justify-center"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            title="Follow on Instagram"
          >
            <Instagram size={18} />
          </motion.a>
        </div>

        {/* Chat Bot Assistant Button */}
        {isChatOpen && (
          <motion.div
            className="absolute bottom-20 right-0 w-80 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-white/10 shadow-2xl p-4 flex flex-col"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            style={{ height: '400px' }}
          >
            <div className="flex-1 overflow-y-auto mb-3 pr-2">
              {chatMessages.length === 0 ? (
                <div className="text-center text-gray-400 text-xs mt-4">
                  <p className="font-semibold text-white mb-2">Bot Assistant</p>
                  <p>Ask me anything about My Founders Club!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {chatMessages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-xs p-2 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-orange-500/20 text-orange-100 ml-8'
                          : 'bg-white/10 text-gray-200 mr-8'
                      }`}
                    >
                      {msg.content}
                    </motion.div>
                  ))}
                  {isSendingChat && (
                    <div className="text-xs p-2 rounded-lg bg-white/10 text-gray-400 mr-8">
                      <span className="animate-pulse">Thinking...</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask a question..."
                disabled={isSendingChat}
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 text-xs focus:outline-none focus:border-orange-500 disabled:opacity-50"
              />
              <motion.button
                onClick={handleSendMessage}
                disabled={isSendingChat || !chatInput.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 bg-orange-500 text-white rounded-lg text-xs font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </motion.button>
            </div>
          </motion.div>
        )}

        <motion.button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="p-2.5 text-white bg-black border border-white/20 rounded-full hover:border-white/40 hover:bg-gray-900 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Chat Assistant"
        >
          {isChatOpen ? <span className="text-lg">×</span> : <MessageCircle size={20} />}
        </motion.button>
      </div>

      {/* Light overlay - lets background show through */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
            <h1 className="text-4xl font-light text-gray-200 mb-2">Complete Your Profile</h1>
            <p className="text-gray-100">Tell us about yourself to get started</p>
            {user && (
              <div className="mt-4 flex items-center justify-center">
                <div className="mr-4">
                  <AvatarUploader userId={user.id} />
                </div>
              </div>
            )}
        </motion.div>

        {/* Success Message */}
        {success && (
          <motion.div
            className="bg-green-500/10 border border-green-500 text-green-400 px-6 py-4 rounded-lg mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ✓ Profile saved successfully! Redirecting to dashboard...
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            className="bg-red-500/10 border border-red-500 text-red-400 px-6 py-4 rounded-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {/* User Type Selection */}
        {!userType ? (
          <motion.div
            className="rounded-2xl p-8 relative"
            style={{
              background: 'linear-gradient(145deg, rgba(25, 25, 25, 1), rgba(12, 12, 12, 1))',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: 'inset 0 1px 4px rgba(255, 255, 255, 0.15), inset 0 -1px 4px rgba(0, 0, 0, 0.5), 0 8px 32px rgba(0, 0, 0, 0.4)',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-2xl font-bold text-gray-200 mb-3">I am a:</h2>
            <p className="text-gray-200 mb-8">Select your profile type to get started</p>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Founder Option */}
              <motion.button
                onClick={() => setUserType('founder')}
                className="rounded-xl p-8 border border-white/12 hover:border-orange-500/60 transition-all text-left group"
                style={{
                  background: 'linear-gradient(145deg, rgba(22, 22, 22, 1), rgba(8, 8, 8, 1))',
                  boxShadow: 'inset 0 1px 3px rgba(255, 255, 255, 0.1), inset 0 -1px 3px rgba(0, 0, 0, 0.4), 0 4px 15px rgba(0, 0, 0, 0.3)',
                }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-200 mb-2 group-hover:text-orange-400 transition-colors">Founder</h3>
                <p className="text-gray-400 text-sm">Build your startup, launch your product, and connect with investors who can help you scale.</p>
              </motion.button>

              {/* Investor Option */}
              <motion.button
                onClick={() => setUserType('investor')}
                className="rounded-xl p-8 border border-white/12 hover:border-orange-500/60 transition-all text-left group"
                style={{
                  background: 'linear-gradient(145deg, rgba(22, 22, 22, 1), rgba(8, 8, 8, 1))',
                  boxShadow: 'inset 0 1px 3px rgba(255, 255, 255, 0.1), inset 0 -1px 3px rgba(0, 0, 0, 0.4), 0 4px 15px rgba(0, 0, 0, 0.3)',
                }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-200 mb-2 group-hover:text-blue-400 transition-colors">Investor</h3>
                <p className="text-gray-400 text-sm">Discover promising startups, manage your portfolio, and find the next big opportunity in the region.</p>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="rounded-2xl p-8 space-y-6"
            style={{
              background: 'linear-gradient(145deg, rgba(25, 25, 25, 1), rgba(12, 12, 12, 1))',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: 'inset 0 1px 4px rgba(255, 255, 255, 0.15), inset 0 -1px 4px rgba(0, 0, 0, 0.5), 0 8px 32px rgba(0, 0, 0, 0.4)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Back Button */}
            <button
              type="button"
              onClick={() => setUserType(null)}
              className="text-orange-400 hover:text-orange-300 text-sm font-semibold flex items-center gap-1"
            >
              ← Back
            </button>

            {/* Founder Form */}
            {userType === 'founder' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={founderData.name}
                    onChange={(e) => handleFounderChange('name', e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    value={founderData.email}
                    disabled
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none opacity-50 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Company / Startup Name *</label>
                  <input
                    type="text"
                    value={founderData.company}
                    onChange={(e) => handleFounderChange('company', e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Your Company Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Stage of Startup *</label>
                  <select
                    value={founderData.stage}
                    onChange={(e) => handleFounderChange('stage', e.target.value)}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500 transition-colors appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      paddingRight: '2.5rem',
                    }}
                  >
                    {stageOptions.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Industry / Sector *</label>
                  <select
                    value={founderData.sector}
                    onChange={(e) => handleFounderChange('sector', e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500 transition-colors appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      paddingRight: '2.5rem',
                    }}
                  >
                    {sectorOptions.map((sector) => (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Location (Country/City) *</label>
                  <input
                    type="text"
                    value={founderData.location}
                    onChange={(e) => handleFounderChange('location', e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Dubai, UAE"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Co-founder Needed?</label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={founderData.cofounderNeeded}
                      onChange={(e) => handleFounderChange('cofounderNeeded', e.target.checked)}
                      className="w-5 h-5 accent-orange-500"
                    />
                    <span className="text-white">Yes, I'm looking for a co-founder</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Brief Description / Elevator Pitch</label>
                  <textarea
                    value={founderData.description}
                    onChange={(e) => handleFounderChange('description', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    rows={4}
                    placeholder="Describe your startup in a few sentences..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">LinkedIn</label>
                    <input
                      type="url"
                      value={founderData.linkedin}
                      onChange={(e) => handleFounderChange('linkedin', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Twitter</label>
                    <input
                      type="url"
                      value={founderData.twitter}
                      onChange={(e) => handleFounderChange('twitter', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Investor Form */}
            {userType === 'investor' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={investorData.name}
                    onChange={(e) => handleInvestorChange('name', e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email *</label>
                  <input
                    type="email"
                    value={investorData.email}
                    disabled
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none opacity-50 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Company / Fund Name *</label>
                  <input
                    type="text"
                    value={investorData.fundName}
                    onChange={(e) => handleInvestorChange('fundName', e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Your Fund Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Investment Stage Focus *</label>
                  <select
                    value={investorData.investmentStage}
                    onChange={(e) => handleInvestorChange('investmentStage', e.target.value)}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500 transition-colors appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      paddingRight: '2.5rem',
                    }}
                  >
                    {investmentStageOptions.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Sector Focus * (Select at least one)</label>
                  <div className="grid grid-cols-2 gap-3">
                    {sectorOptions.map((sector) => (
                      <label key={sector} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={investorData.sectorFocus.includes(sector)}
                          onChange={() => toggleSector(sector)}
                          className="w-5 h-5 accent-orange-500"
                        />
                        <span className="text-white">{sector}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Geography Focus * (Select at least one)</label>
                  <div className="grid grid-cols-2 gap-3">
                    {geographyOptions.map((geo) => (
                      <label key={geo} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={investorData.geographyFocus.includes(geo)}
                          onChange={() => toggleGeography(geo)}
                          className="w-5 h-5 accent-orange-500"
                        />
                        <span className="text-white">{geo}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Check Size</label>
                  <input
                    type="text"
                    value={investorData.checkSize}
                    onChange={(e) => handleInvestorChange('checkSize', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="e.g., $100K - $1M"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Portfolio Companies</label>
                  <textarea
                    value={investorData.portfolioCompanies}
                    onChange={(e) => handleInvestorChange('portfolioCompanies', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    rows={3}
                    placeholder="List your portfolio companies..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">LinkedIn</label>
                    <input
                      type="url"
                      value={investorData.linkedin}
                      onChange={(e) => handleInvestorChange('linkedin', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Website</label>
                    <input
                      type="url"
                      value={investorData.website}
                      onChange={(e) => handleInvestorChange('website', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="https://yourfund.com"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <span>Saving profile...</span>
              ) : (
                <>
                  <span>Complete Profile</span>
                  <ChevronRight size={18} />
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </div>
    </div>
  )
}
