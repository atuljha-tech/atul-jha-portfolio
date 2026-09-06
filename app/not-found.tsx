import Link from 'next/link'
import { ArrowLeft, AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07050E] flex items-center justify-center px-6 relative overflow-hidden text-center">
      <div className="bg-glow-purple w-[500px] h-[500px] top-1/4 -left-20" />
      <div className="bg-glow-gold w-[400px] h-[400px] bottom-1/4 -right-20" />

      <div className="relative z-10 max-w-md w-full bg-[#0E0B19] rounded-3xl border border-purple-500/30 p-10 shadow-2xl shadow-black">
        <div className="w-16 h-16 rounded-2xl bg-[#130F23] border border-purple-500/40 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-amber-400" />
        </div>
        <h1 className="text-6xl font-black text-white font-mono mb-2">404</h1>
        <h2 className="text-xl font-bold text-amber-300 uppercase tracking-wider mb-3">PAGE NOT FOUND</h2>
        <p className="text-slate-400 text-xs font-mono mb-8 uppercase">
          THE RESOURCE OR ROUTE YOU ARE LOOKING FOR DOES NOT EXIST.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-linear-to-r from-amber-500 via-purple-600 to-purple-800 text-white text-xs font-mono font-bold tracking-widest uppercase shadow-xl hover:scale-105 transition-all border border-amber-400/40"
        >
          <ArrowLeft className="w-4 h-4 text-amber-300" /> RETURN HOME
        </Link>
      </div>
    </div>
  )
}
