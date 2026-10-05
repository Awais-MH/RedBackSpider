import type { FoodEntry, Profile } from '../types'
import { dailyCalorieGoal, macroGoals } from '../lib/calc'
import { isToday } from '../lib/date'
import { Gauge } from './Gauge'
import { MacroBar } from './MacroBar'
import { FoodEntryForm } from './FoodEntryForm'
import { FoodList } from './FoodList'

interface DashboardProps {
  profile: Profile
  entries: FoodEntry[]
  onAddEntry: (name: string, calories: number, proteinG: number, carbsG: number, fatG: number) => void
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
  const calorieGoal = dailyCalorieGoal(profile)
  const macros = macroGoals(profile, calorieGoal)
  const todaysEntries = entries.filter((entry) => isToday(entry.loggedAt))
  const consumed = todaysEntries.reduce((sum, entry) => sum + entry.calories, 0)
  const proteinConsumed = todaysEntries.reduce((sum, entry) => sum + (entry.proteinG ?? 0), 0)
  const carbsConsumed = todaysEntries.reduce((sum, entry) => sum + (entry.carbsG ?? 0), 0)
  const fatConsumed = todaysEntries.reduce((sum, entry) => sum + (entry.fatG ?? 0), 0)

  return (
    <div className="dashboard">
      <header className="app-header">
        <h1>CalGauge</h1>
        <button type="button" className="btn-link" onClick={onEditProfile}>
          Edit goal
        </button>
      </header>

      <div className="card gauge-card">
        <Gauge consumed={consumed} goal={calorieGoal} />
      </div>

      <div className="card macros-card">
        <h2 className="section-title macros-title">Macros</h2>
        <MacroBar label="Protein" color="#38bdf8" consumed={proteinConsumed} goal={macros.proteinG} />
        <MacroBar label="Carbs" color="#f59e0b" consumed={carbsConsumed} goal={macros.carbsG} />
        <MacroBar label="Fat" color="#a78bfa" consumed={fatConsumed} goal={macros.fatG} />
      </div>

      <FoodEntryForm onAdd={onAddEntry} />

      <section>
        <h2 className="section-title">Today's food</h2>
        <FoodList entries={todaysEntries} onRemove={onRemoveEntry} />
      </section>
    </div>
  )
}
