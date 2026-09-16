import { FormEvent, useState } from 'react'
import type { ActivityLevel, GoalType, Profile, Sex } from '../types'
import { ACTIVITY_LABELS, GOAL_LABELS } from '../lib/calc'

interface ProfileFormProps {
  initial?: Profile
  onSave: (profile: Profile) => void
  onCancel?: () => void
}

const ACTIVITY_OPTIONS: ActivityLevel[] = [
  'sedentary',
  'light',
  'moderate',
  'active',
  'very_active',
]

const GOAL_OPTIONS: GoalType[] = ['lose', 'maintain', 'gain']

export function ProfileForm({ initial, onSave, onCancel }: ProfileFormProps) {
  const [age, setAge] = useState(initial?.age?.toString() ?? '')
  const [sex, setSex] = useState<Sex>(initial?.sex ?? 'female')
  const [heightCm, setHeightCm] = useState(initial?.heightCm?.toString() ?? '')
  const [weightKg, setWeightKg] = useState(initial?.weightKg?.toString() ?? '')
  const [activity, setActivity] = useState<ActivityLevel>(initial?.activity ?? 'sedentary')
  const [goalType, setGoalType] = useState<GoalType>(initial?.goalType ?? 'maintain')
  const [rateKgPerWeek, setRateKgPerWeek] = useState(
    initial?.rateKgPerWeek?.toString() ?? '0.5',
  )
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const parsedAge = Number(age)
    const parsedHeight = Number(heightCm)
    const parsedWeight = Number(weightKg)
    const parsedRate = Number(rateKgPerWeek)

    if (!parsedAge || !parsedHeight || !parsedWeight) {
      setError('Please fill in age, height, and weight with valid numbers.')
      return
    }
    if (goalType !== 'maintain' && (!parsedRate || parsedRate <= 0)) {
      setError('Please set a target rate greater than 0.')
      return
    }

    onSave({
      age: parsedAge,
      sex,
      heightCm: parsedHeight,
      weightKg: parsedWeight,
      activity,
      goalType,
      rateKgPerWeek: goalType === 'maintain' ? 0 : parsedRate,
    })
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{initial ? 'Edit your profile' : "Let's set up your goal"}</h2>

      <label>
        Sex
        <select value={sex} onChange={(e) => setSex(e.target.value as Sex)}>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </label>

      <div className="row">
        <label>
          Age
          <input
            type="number"
            inputMode="numeric"
            min={10}
            max={100}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="years"
          />
        </label>
        <label>
          Height
          <input
            type="number"
            inputMode="decimal"
            min={100}
            max={250}
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            placeholder="cm"
          />
        </label>
        <label>
          Weight
          <input
            type="number"
            inputMode="decimal"
            min={30}
            max={300}
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            placeholder="kg"
          />
        </label>
      </div>

      <label>
        Activity level
        <select value={activity} onChange={(e) => setActivity(e.target.value as ActivityLevel)}>
          {ACTIVITY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {ACTIVITY_LABELS[option]}
            </option>
          ))}
        </select>
      </label>

      <label>
        Goal
        <select value={goalType} onChange={(e) => setGoalType(e.target.value as GoalType)}>
          {GOAL_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {GOAL_LABELS[option]}
            </option>
          ))}
        </select>
      </label>

      {goalType !== 'maintain' && (
        <label>
          Target rate ({goalType === 'lose' ? 'loss' : 'gain'} per week)
          <select value={rateKgPerWeek} onChange={(e) => setRateKgPerWeek(e.target.value)}>
            <option value="0.25">0.25 kg/week (mild)</option>
            <option value="0.5">0.5 kg/week (standard)</option>
            <option value="1">1 kg/week (aggressive)</option>
          </select>
        </label>
      )}

      {error && <p className="error">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {initial ? 'Save changes' : 'Calculate my goal'}
        </button>
        {onCancel && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
