// ─── Number Formatting ─────────────────────────────────────────────────────
export function formatNumber(n, decimals = 1) {
  if (n === null || n === undefined) return '—'
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(decimals)}M`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(decimals)}K`
  return Number(n).toFixed(decimals)
}

export function formatPercent(n, decimals = 1) {
  if (n === null || n === undefined) return '—'
  return `${Number(n).toFixed(decimals)}%`
}

export function formatTons(n) {
  if (n === null || n === undefined) return '—'
  return `${formatNumber(n)} tCO₂e`
}

// ─── Date Formatting ────────────────────────────────────────────────────────
export function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  }).format(new Date(dateStr))
}

export function formatRelativeTime(dateStr) {
  if (!dateStr) return '—'
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins  = Math.floor(diff / 60_000)
  const hours = Math.floor(diff / 3_600_000)
  const days  = Math.floor(diff / 86_400_000)
  if (mins < 1)   return 'just now'
  if (mins < 60)  return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7)   return `${days}d ago`
  return formatDate(dateStr)
}

// ─── ESG Score Color ─────────────────────────────────────────────────────────
export function scoreColor(score) {
  if (score >= 75) return 'var(--color-success)'
  if (score >= 50) return 'var(--color-warning)'
  return 'var(--color-danger)'
}

export function scoreGrade(score) {
  if (score >= 90) return 'AAA'
  if (score >= 80) return 'AA'
  if (score >= 70) return 'A'
  if (score >= 60) return 'BBB'
  if (score >= 50) return 'BB'
  if (score >= 40) return 'B'
  return 'CCC'
}

// ─── Change direction ────────────────────────────────────────────────────────
export function changeClass(val, inverseGood = false) {
  if (val > 0) return inverseGood ? 'down' : 'up'
  if (val < 0) return inverseGood ? 'up' : 'down'
  return 'neutral'
}

export function changeArrow(val) {
  if (val > 0) return '↑'
  if (val < 0) return '↓'
  return '→'
}

// ─── Generate months labels ───────────────────────────────────────────────────
export function lastNMonths(n = 6) {
  const months = []
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date()
    d.setMonth(d.getMonth() - i)
    months.push(d.toLocaleString('default', { month: 'short' }))
  }
  return months
}

// ─── Random helpers for demo data ────────────────────────────────────────────
export function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

export function randomInt(min, max) {
  return Math.floor(randomBetween(min, max))
}

// ─── Clamp ────────────────────────────────────────────────────────────────────
export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max)
}

// ─── Get initials ─────────────────────────────────────────────────────────────
export function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}
