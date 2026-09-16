import type { FoodEntry } from '../types'
import { formatTime } from '../lib/date'

interface FoodListProps {
  entries: FoodEntry[]
  onRemove: (id: string) => void
}

export function FoodList({ entries, onRemove }: FoodListProps) {
  if (entries.length === 0) {
    return <p className="empty-state">Nothing logged yet today. Add your first meal above.</p>
  }

  const sorted = [...entries].sort((a, b) => b.loggedAt - a.loggedAt)

  return (
    <ul className="food-list">
      {sorted.map((entry) => (
        <li key={entry.id} className="food-list-item">
          <div>
            <div className="food-name">{entry.name}</div>
            <div className="food-time">{formatTime(entry.loggedAt)}</div>
          </div>
          <div className="food-item-right">
            <span className="food-calories">{entry.calories} kcal</span>
            <button
              type="button"
              className="btn-remove"
              onClick={() => onRemove(entry.id)}
              aria-label={`Remove ${entry.name}`}
            >
              ×
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
