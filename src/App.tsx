import { useState } from 'react'
import type { FoodEntry, Profile } from './types'
import { useLocalStorage } from './lib/useLocalStorage'
import { ProfileForm } from './components/ProfileForm'
import { Dashboard } from './components/Dashboard'

export default function App() {
  const [profile, setProfile] = useLocalStorage<Profile | null>('calgauge-profile', null)
  const [entries, setEntries] = useLocalStorage<FoodEntry[]>('calgauge-entries', [])
  const [editingProfile, setEditingProfile] = useState(false)

  function handleAddEntry(name: string, calories: number) {
    const entry: FoodEntry = {
      id: crypto.randomUUID(),
      name,
      calories,
      loggedAt: Date.now(),
    }
    setEntries((prev) => [...prev, entry])
  }

  function handleRemoveEntry(id: string) {
    setEntries((prev) => prev.filter((entry) => entry.id !== id))
  }

  if (!profile || editingProfile) {
    return (
      <div className="app-shell">
        <ProfileForm
          initial={profile ?? undefined}
          onSave={(p) => {
            setProfile(p)
            setEditingProfile(false)
          }}
          onCancel={profile ? () => setEditingProfile(false) : undefined}
        />
      </div>
    )
  }

  return (
    <div className="app-shell">
      <Dashboard
        profile={profile}
        entries={entries}
        onAddEntry={handleAddEntry}
        onRemoveEntry={handleRemoveEntry}
        onEditProfile={() => setEditingProfile(true)}
      />
    </div>
  )
}
