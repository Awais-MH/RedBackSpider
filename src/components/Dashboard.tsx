import type { FoodEntry, Profile } from '../types'
import { dailyCalorieGoal } from '../lib/calc'
import { isToday } from '../lib/date'
import { Gauge } from './Gauge'
import { FoodEntryForm } from './FoodEntryForm'
import { FoodList } from './FoodList'

interface DashboardProps {
  profile: Profile
  entries: FoodEntry[]
  onAddEntry: (name: string, calories: number) => void
  onRemoveEntry: (id: string) => void
  onEditProfile: () => void
}

export function Dashboard({
  profile,
  entries,
  onAddEntry,
  onRemoveEntry,
  onEditProfile,
}: DashboardProps) {
  const goal = dailyCalorieGoal(profile)
  const todaysEntries = entries.filter((entry) => isToday(entry.loggedAt))
  const consumed = todaysEntries.reduce((sum, entry) => sum + entry.calories, 0)

  return (
    <div className="dashboard">
      <header className="app-header">
        <h1>CalGauge</h1>
        <button type="button" className="btn-link" onClick={onEditProfile}>
          Edit goal
        </button>
      </header>

      <div className="card gauge-card">
        <Gauge consumed={consumed} goal={goal} />
      </div>

      <FoodEntryForm onAdd={onAddEntry} />

      <section>
        <h2 className="section-title">Today's food</h2>
        <FoodList entries={todaysEntries} onRemove={onRemoveEntry} />
      </section>
    </div>
  )
}
