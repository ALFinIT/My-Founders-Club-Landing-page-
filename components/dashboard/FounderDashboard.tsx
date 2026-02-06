 'use client'

import { useState, useEffect } from 'react'
import { FounderProfile, useProfile } from '@/context/profile-context'

export default function FounderDashboard({ userId }: { userId: string }) {
  const { getProfile, saveProfile } = useProfile()
  const [profile, setProfile] = useState<FounderProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState<any>(null)

  useEffect(() => {
    const p = getProfile(userId) as FounderProfile | null
    setProfile(p)
    setForm(p ? { ...p } : null)
  }, [userId])

  if (!profile) {
    return (
      <div className="glass rounded-2xl p-8">
        <h2 className="text-2xl font-light text-white mb-4">Founder dashboard</h2>
        <p className="text-muted-foreground">No profile found. Please complete onboarding.</p>
      </div>
    )
  }

  const handleChange = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }))

  const handleSave = () => {
    // basic validation
    if (!form.name || !form.email || !form.company) return
    saveProfile(form as FounderProfile)
    setProfile(form)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-light text-white">Founder: {profile.name}</h2>
            <p className="text-muted-foreground text-sm">{profile.company} — {profile.stage}</p>
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
            <input className="p-3 bg-white/5 rounded w-full" value={form.company} onChange={(e) => handleChange('company', e.target.value)} />
            <div className="flex gap-2">
              <input className="p-3 bg-white/5 rounded" value={form.stage} onChange={(e) => handleChange('stage', e.target.value)} />
              <input className="p-3 bg-white/5 rounded" value={form.sector} onChange={(e) => handleChange('sector', e.target.value)} />
            </div>
            <textarea className="p-3 bg-white/5 rounded w-full" value={form.description} onChange={(e) => handleChange('description', e.target.value)} />
            <div className="flex gap-2">
              <button onClick={handleSave} className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded">Save</button>
              <button onClick={() => { setIsEditing(false); setForm(profile); }} className="px-4 py-2 bg-white/5 text-white rounded">Cancel</button>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="text-white">{profile.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Company</span>
              <span className="text-white">{profile.company}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Stage</span>
              <span className="text-white">{profile.stage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sector</span>
              <span className="text-white">{profile.sector}</span>
            </div>
            <div className="mt-3 text-muted-foreground">{profile.description}</div>
          </div>
        )}
      </div>
    </div>
  )
}
