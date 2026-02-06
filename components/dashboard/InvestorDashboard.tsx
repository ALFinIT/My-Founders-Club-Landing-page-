 'use client'

import { useState, useEffect } from 'react'
import { InvestorProfile, useProfile } from '@/context/profile-context'

export default function InvestorDashboard({ userId }: { userId: string }) {
  const { getProfile, saveProfile } = useProfile()
  const [profile, setProfile] = useState<InvestorProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState<any>(null)

  useEffect(() => {
    const p = getProfile(userId) as InvestorProfile | null
    setProfile(p)
    setForm(p ? { ...p } : null)
  }, [userId])

  if (!profile) {
    return (
      <div className="glass rounded-2xl p-8">
        <h2 className="text-2xl font-light text-white mb-4">Investor dashboard</h2>
        <p className="text-muted-foreground">No profile found. Please complete onboarding.</p>
      </div>
    )
  }

  const handleChange = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }))

  const handleSave = () => {
    if (!form.name || !form.email || !form.fundName) return
    saveProfile(form as InvestorProfile)
    setProfile(form)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-light text-white">Investor: {profile.name}</h2>
            <p className="text-muted-foreground text-sm">{profile.fundName} — {profile.investmentStage}</p>
          </div>
          <div>
            <button onClick={() => setIsEditing(!isEditing)} className="px-4 py-2 bg-white/5 text-white rounded-lg">{isEditing ? 'Cancel' : 'Edit'}</button>
          </div>
        </div>

        {isEditing ? (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="p-3 bg-white/5 rounded" value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
              <input className="p-3 bg-white/5 rounded" value={form.email} onChange={(e) => handleChange('email', e.target.value)} />
            </div>
            <input className="p-3 bg-white/5 rounded w-full" value={form.fundName} onChange={(e) => handleChange('fundName', e.target.value)} />
            <div className="flex gap-2">
              <input className="p-3 bg-white/5 rounded" value={form.investmentStage} onChange={(e) => handleChange('investmentStage', e.target.value)} />
              <input className="p-3 bg-white/5 rounded" value={form.checkSize} onChange={(e) => handleChange('checkSize', e.target.value)} />
            </div>
            <div className="flex gap-2">
              <input className="p-3 bg-white/5 rounded" value={form.sectorFocus.join(', ')} onChange={(e) => handleChange('sectorFocus', e.target.value.split(',').map(s=>s.trim()))} />
              <input className="p-3 bg-white/5 rounded" value={form.geographyFocus.join(', ')} onChange={(e) => handleChange('geographyFocus', e.target.value.split(',').map(s=>s.trim()))} />
            </div>
            <div className="flex gap-2">
              <button onClick={handleSave} className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded">Save</button>
              <button onClick={() => { setIsEditing(false); setForm(profile); }} className="px-4 py-2 bg-white/5 text-white rounded">Cancel</button>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fund</span>
              <span className="text-white">{profile.fundName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Investment Stage</span>
              <span className="text-white">{profile.investmentStage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Check Size</span>
              <span className="text-white">{profile.checkSize}</span>
            </div>
            <div className="mt-3 text-muted-foreground">Sector Focus: {profile.sectorFocus.join(', ')}</div>
            <div className="mt-1 text-muted-foreground">Geography Focus: {profile.geographyFocus.join(', ')}</div>
          </div>
        )}
      </div>
    </div>
  )
}
