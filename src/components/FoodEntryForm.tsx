import { FormEvent, useState } from 'react'

interface FoodEntryFormProps {
  onAdd: (name: string, calories: number, proteinG: number, carbsG: number, fatG: number) => void
}

export function FoodEntryForm({ onAdd }: FoodEntryFormProps) {
  const [name, setName] = useState('')
  const [calories, setCalories] = useState('')
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fat, setFat] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const parsedCalories = Number(calories)
    if (!name.trim() || !parsedCalories || parsedCalories <= 0) return

    onAdd(
      name.trim(),
      Math.round(parsedCalories),
      Math.max(0, Math.round(Number(protein) || 0)),
      Math.max(0, Math.round(Number(carbs) || 0)),
      Math.max(0, Math.round(Number(fat) || 0)),
    )
    setName('')
    setCalories('')
    setProtein('')
    setCarbs('')
    setFat('')
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
      <div className="food-form-macros">
        <input
          type="number"
          inputMode="numeric"
          placeholder="kcal"
          min={1}
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          aria-label="Calories"
        />
        <input
          type="number"
          inputMode="numeric"
          placeholder="P g"
          min={0}
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
          aria-label="Protein grams"
        />
        <input
          type="number"
          inputMode="numeric"
          placeholder="C g"
          min={0}
          value={carbs}
          onChange={(e) => setCarbs(e.target.value)}
          aria-label="Carbs grams"
        />
        <input
          type="number"
          inputMode="numeric"
          placeholder="F g"
          min={0}
          value={fat}
          onChange={(e) => setFat(e.target.value)}
          aria-label="Fat grams"
        />
      </div>
      <button type="submit" className="btn-primary btn-add">
        Add
      </button>
    </form>
  )
}
