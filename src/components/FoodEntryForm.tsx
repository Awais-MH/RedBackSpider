import { FormEvent, useState } from 'react'

interface FoodEntryFormProps {
  onAdd: (name: string, calories: number) => void
}

export function FoodEntryForm({ onAdd }: FoodEntryFormProps) {
  const [name, setName] = useState('')
  const [calories, setCalories] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const parsedCalories = Number(calories)
    if (!name.trim() || !parsedCalories || parsedCalories <= 0) return

    onAdd(name.trim(), Math.round(parsedCalories))
    setName('')
    setCalories('')
  }

  return (
    <form className="card food-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What did you eat?"
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-label="Food name"
      />
      <input
        type="number"
        inputMode="numeric"
        placeholder="kcal"
        min={1}
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        aria-label="Calories"
        className="calories-input"
      />
      <button type="submit" className="btn-primary btn-add">
        Add
      </button>
    </form>
  )
}
