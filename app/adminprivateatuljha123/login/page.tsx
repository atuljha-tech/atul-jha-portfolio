'use client'

import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validate = () => {
    const e: { email?: string; password?: string } = {}
    if (!email) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email'
    if (!password) e.password = 'Password is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const json = await res.json()
      if (!res.ok) {
        toast.error(json.error || 'Login failed')
        return
      }
      toast.success('Welcome back!')
      window.location.href = '/adminprivateatuljha123'
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(139,92,246,0.08) 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
      </div>

      <div className="relative w-full max-w-md">
        <div className="relative">
          <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-30 blur" />
          <div className="relative bg-[#0D1424] rounded-2xl border border-slate-800/50 p-8">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl" />

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500/20 to-purple-500/20 border border-purple-500/20 mb-4">
                <Lock className="w-6 h-6 text-purple-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-1">Admin Login</h1>
              <p className="text-sm text-slate-400">Sign in to manage your portfolio</p>
            </div>

            {/* autocomplete="off" on form + new-password trick prevents browser autofill */}
            <form onSubmit={onSubmit} autoComplete="off" className="space-y-5">

              {/* Hidden honeypot fields trick browsers into not autofilling the real ones */}
              <input type="text" name="username_fake" style={{ display: 'none' }} tabIndex={-1} readOnly />
              <input type="password" name="password_fake" style={{ display: 'none' }} tabIndex={-1} readOnly />

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="admin-input pl-10"
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    data-form-type="other"
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="admin-input pl-10 pr-10"
                    autoComplete="new-password"
                    data-form-type="other"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spinner" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-slate-600 mt-6">
              Protected by JWT authentication
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
