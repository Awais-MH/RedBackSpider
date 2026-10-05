import type { ActivityLevel, GoalType, MacroGoals, Profile } from '../types'

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
}

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: 'Sedentary (little/no exercise)',
  light: 'Light (exercise 1-3 days/week)',
  moderate: 'Moderate (exercise 3-5 days/week)',
  active: 'Active (exercise 6-7 days/week)',
  very_active: 'Very active (hard exercise + physical job)',
}

export const GOAL_LABELS: Record<GoalType, string> = {
  lose: 'Lose weight',
  maintain: 'Maintain weight',
  gain: 'Gain weight',
}

// Mifflin-St Jeor equation
export function bmr(profile: Pick<Profile, 'sex' | 'heightCm' | 'weightKg' | 'age'>): number {
  const base = 10 * profile.weightKg + 6.25 * profile.heightCm - 5 * profile.age
  return profile.sex === 'male' ? base + 5 : base - 161
}

export function tdee(profile: Profile): number {
  return bmr(profile) * ACTIVITY_MULTIPLIERS[profile.activity]
}

// ~7700 kcal per kg of body weight
const KCAL_PER_KG = 7700

export function dailyCalorieGoal(profile: Profile): number {
  const maintenance = tdee(profile)
  if (profile.goalType === 'maintain') return Math.round(maintenance)

  const weeklyAdjustment = (profile.rateKgPerWeek * KCAL_PER_KG) / 7
  const signed = profile.goalType === 'lose' ? -weeklyAdjustment : weeklyAdjustment
  return Math.max(1000, Math.round(maintenance + signed))
}

// Higher protein target while cutting helps preserve muscle in a deficit.
const PROTEIN_G_PER_KG: Record<GoalType, number> = {
  lose: 2.2,
  maintain: 1.8,
  gain: 1.8,
}

const FAT_SHARE_OF_CALORIES = 0.25

export function macroGoals(profile: Profile, calorieGoal: number): MacroGoals {
  const proteinG = Math.round(profile.weightKg * PROTEIN_G_PER_KG[profile.goalType])
  const fatG = Math.round((calorieGoal * FAT_SHARE_OF_CALORIES) / 9)
  const remainingCalories = Math.max(0, calorieGoal - proteinG * 4 - fatG * 9)
  const carbsG = Math.round(remainingCalories / 4)

  return { proteinG, carbsG, fatG }
}
