import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function AuthPage() {
  const [tab, setTab]           = useState('register')   // 'login' | 'register'
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [success, setSuccess]   = useState('')

  // Login fields
  const [loginEmail, setLoginEmail]       = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showLoginPw, setShowLoginPw]     = useState(false)

  // Register fields
  const [regName, setRegName]         = useState('')
  const [regCompany, setRegCompany]   = useState('')
  const [regEmail, setRegEmail]       = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirm, setRegConfirm]   = useState('')
  const [showRegPw, setShowRegPw]     = useState(false)

  const { signIn, signUp } = useAuthStore()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(''); setSuccess('')
    if (!loginEmail || !loginPassword) { setError('Please fill in all fields.'); return }
    setLoading(true)
    try {
      await signIn(loginEmail, loginPassword)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError(''); setSuccess('')
    if (!regName || !regEmail || !regPassword || !regConfirm) { setError('Please fill in all required fields.'); return }
    if (regPassword !== regConfirm) { setError('Passwords do not match.'); return }
    if (regPassword.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    try {
      await signUp(regEmail, regPassword, regName, regCompany)
      setSuccess('Account created! Please check your email to confirm, then sign in.')
      setTab('login')
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-bg-orb auth-bg-orb-1" aria-hidden="true" />
      <div className="auth-bg-orb auth-bg-orb-2" aria-hidden="true" />

      <div className="auth-container">
        {/* Brand */}
        <div className="auth-brand fade-in-up">
          <div className="auth-brand-icon" aria-hidden="true">🌍</div>
          <h1 className="auth-brand-name">EcoSphere</h1>
          <p className="auth-brand-sub">ESG Management &amp; Sustainability Platform</p>
        </div>

        <div className="auth-card fade-in-up-delay-1 fade-in-up">
          {/* Tabs */}
          <div className="auth-tabs" role="tablist">
            <button
              id="auth-tab-register"
              role="tab"
              aria-selected={tab === 'register'}
              className={`auth-tab ${tab === 'register' ? 'active' : ''}`}
              onClick={() => { setTab('register'); setError(''); setSuccess('') }}
            >
              Create Account
            </button>
            <button
              id="auth-tab-login"
              role="tab"
              aria-selected={tab === 'login'}
              className={`auth-tab ${tab === 'login' ? 'active' : ''}`}
              onClick={() => { setTab('login'); setError(''); setSuccess('') }}
            >
              Sign In
            </button>
          </div>

          {/* Error / Success banners */}
          {error && (
            <div className="alert-banner danger" style={{ marginBottom: 'var(--space-4)' }} role="alert">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="alert-banner success" style={{ marginBottom: 'var(--space-4)' }} role="alert">
              <span>✅</span>
              <span>{success}</span>
            </div>
          )}

          {/* ─── Login Form ─── */}
          {tab === 'login' && (
            <form id="login-form" onSubmit={handleLogin} noValidate>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="login-email">Email Address</label>
                  <div className="form-input-icon">
                    <span className="input-icon">✉️</span>
                    <input
                      id="login-email"
                      type="email"
                      className="form-input"
                      placeholder="you@company.com"
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="login-password">Password</label>
                  <div className="form-input-icon" style={{ position: 'relative' }}>
                    <span className="input-icon">🔒</span>
                    <input
                      id="login-password"
                      type={showLoginPw ? 'text' : 'password'}
                      className="form-input"
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                      style={{ paddingRight: '3rem' }}
                    />
                    <button
                      type="button"
                      id="login-toggle-pw"
                      onClick={() => setShowLoginPw(v => !v)}
                      style={{
                        position: 'absolute', right: '0.75rem', top: '50%',
                        transform: 'translateY(-50%)', background: 'none',
                        border: 'none', cursor: 'pointer', fontSize: '0.9rem',
                        color: 'var(--text-muted)', padding: '4px'
                      }}
                      aria-label={showLoginPw ? 'Hide password' : 'Show password'}
                    >
                      {showLoginPw ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <button
                  id="login-submit-btn"
                  type="submit"
                  className="btn btn-primary btn-full btn-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner" style={{ width: 18, height: 18 }} />
                      Signing in…
                    </>
                  ) : (
                    'Sign In to EcoSphere'
                  )}
                </button>
              </div>

              <div className="auth-divider">
                <span className="auth-divider-text">New to EcoSphere?</span>
              </div>

              <button
                id="switch-to-register-btn"
                type="button"
                className="btn btn-secondary btn-full"
                onClick={() => setTab('register')}
              >
                Create a free account
              </button>
            </form>
          )}

          {/* ─── Register Form ─── */}
          {tab === 'register' && (
            <form id="register-form" onSubmit={handleRegister} noValidate>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div className="grid-2" style={{ gap: 'var(--space-3)' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-name">Full Name *</label>
                    <input
                      id="reg-name"
                      type="text"
                      className="form-input"
                      placeholder="Jane Smith"
                      value={regName}
                      onChange={e => setRegName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-company">Company</label>
                    <input
                      id="reg-company"
                      type="text"
                      className="form-input"
                      placeholder="Acme Corp"
                      value={regCompany}
                      onChange={e => setRegCompany(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reg-email">Work Email *</label>
                  <div className="form-input-icon">
                    <span className="input-icon">✉️</span>
                    <input
                      id="reg-email"
                      type="email"
                      className="form-input"
                      placeholder="you@company.com"
                      value={regEmail}
                      onChange={e => setRegEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reg-password">Password *</label>
                  <div className="form-input-icon" style={{ position: 'relative' }}>
                    <span className="input-icon">🔒</span>
                    <input
                      id="reg-password"
                      type={showRegPw ? 'text' : 'password'}
                      className="form-input"
                      placeholder="Min. 6 characters"
                      value={regPassword}
                      onChange={e => setRegPassword(e.target.value)}
                      required
                      style={{ paddingRight: '3rem' }}
                    />
                    <button
                      type="button"
                      id="reg-toggle-pw"
                      onClick={() => setShowRegPw(v => !v)}
                      style={{
                        position: 'absolute', right: '0.75rem', top: '50%',
                        transform: 'translateY(-50%)', background: 'none',
                        border: 'none', cursor: 'pointer', fontSize: '0.9rem',
                        color: 'var(--text-muted)', padding: '4px'
                      }}
                      aria-label={showRegPw ? 'Hide password' : 'Show password'}
                    >
                      {showRegPw ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reg-confirm">Confirm Password *</label>
                  <div className="form-input-icon">
                    <span className="input-icon">🔑</span>
                    <input
                      id="reg-confirm"
                      type="password"
                      className="form-input"
                      placeholder="Re-enter password"
                      value={regConfirm}
                      onChange={e => setRegConfirm(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  id="register-submit-btn"
                  type="submit"
                  className="btn btn-primary btn-full btn-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner" style={{ width: 18, height: 18 }} />
                      Creating account…
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>

              <p className="auth-footer-text">
                By signing up you agree to our{' '}
                <span style={{ color: 'var(--color-primary)', cursor: 'pointer' }}>Terms of Service</span>
                {' & '}
                <span style={{ color: 'var(--color-primary)', cursor: 'pointer' }}>Privacy Policy</span>
              </p>
            </form>
          )}
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 'var(--space-6)' }}>
          🔒 Enterprise-grade security · SOC 2 compliant · GDPR ready
        </p>
      </div>
    </div>
  )
}
