interface MacroBarProps {
  label: string
  color: string
  consumed: number
  goal: number
}

export function MacroBar({ label, color, consumed, goal }: MacroBarProps) {
  const remaining = goal - consumed
  const ratio = goal > 0 ? consumed / goal : 0
  const widthPercent = Math.min(Math.max(ratio, 0), 1) * 100

  return (
    <div className="macro-bar">
      <div className="macro-bar-header">
        <span className="macro-bar-label">{label}</span>
        <span className="macro-bar-values">
          {consumed}g / {goal}g
        </span>
      </div>
      <div className="macro-bar-track">
        <div
          className="macro-bar-fill"
          style={{ width: `${widthPercent}%`, background: color }}
        />
      </div>
      <div className="macro-bar-remaining">
        {remaining >= 0 ? `${remaining}g left` : `${Math.abs(remaining)}g over`}
      </div>
    </div>
  )
}
