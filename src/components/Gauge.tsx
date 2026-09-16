interface GaugeProps {
  consumed: number
  goal: number
}

const SIZE = 240
const STROKE = 20
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = Math.PI * RADIUS // half circle

export function Gauge({ consumed, goal }: GaugeProps) {
  const remaining = goal - consumed
  const ratio = goal > 0 ? consumed / goal : 0
  const clamped = Math.min(Math.max(ratio, 0), 1)
  const dashOffset = CIRCUMFERENCE * (1 - clamped)

  const color = ratio > 1 ? '#ef4444' : ratio > 0.9 ? '#f59e0b' : '#22c55e'

  return (
    <div className="gauge">
      <svg width={SIZE} height={SIZE / 2 + STROKE} viewBox={`0 0 ${SIZE} ${SIZE / 2 + STROKE}`}>
        <path
          d={`M ${STROKE / 2} ${SIZE / 2} A ${RADIUS} ${RADIUS} 0 0 1 ${SIZE - STROKE / 2} ${SIZE / 2}`}
          fill="none"
          stroke="#1f2937"
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
        <path
          d={`M ${STROKE / 2} ${SIZE / 2} A ${RADIUS} ${RADIUS} 0 0 1 ${SIZE - STROKE / 2} ${SIZE / 2}`}
          fill="none"
          stroke={color}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 0.4s ease, stroke 0.4s ease' }}
        />
      </svg>
      <div className="gauge-readout">
        <div className="gauge-number">{Math.abs(remaining).toLocaleString()}</div>
        <div className="gauge-label">
          {remaining >= 0 ? 'kcal left to eat' : 'kcal over goal'}
        </div>
      </div>
      <div className="gauge-sub">
        {consumed.toLocaleString()} / {goal.toLocaleString()} kcal consumed
      </div>
    </div>
  )
}
