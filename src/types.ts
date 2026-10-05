export type Sex = 'male' | 'female'

export type ActivityLevel =
  | 'sedentary'
  | 'light'
  | 'moderate'
  | 'active'
  | 'very_active'

export type GoalType = 'lose' | 'maintain' | 'gain'

export interface Profile {
  age: number
  sex: Sex
  heightCm: number
  weightKg: number
  activity: ActivityLevel
  goalType: GoalType
  rateKgPerWeek: number
}

export interface FoodEntry {
  id: string
  name: string
  calories: number
  proteinG: number
  carbsG: number
  fatG: number
  loggedAt: number
}

export interface MacroGoals {
  proteinG: number
  carbsG: number
  fatG: number
}
