export default function Header() {
  return (
    <header className="bg-darkbg text-white px-6 lg:px-10 py-4 flex justify-between items-center shadow">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold">
          QR
        </div>
        <span className="text-lg font-semibold tracking-tight">
          QR Generator
        </span>
      </div>

      <nav className="hidden md:flex gap-6 text-sm text-slate-200">
        <button type="button" className="hover:text-white">
          Solutions
        </button>
        <button type="button" className="hover:text-white">
          Features
        </button>
        <button type="button" className="hover:text-white">
          Resources
        </button>
        <button type="button" className="hover:text-white">
          Pricing
        </button>
      </nav>

      <div className="flex items-center gap-3 text-sm">
        <button
          type="button"
          className="px-3 py-1.5 rounded border border-slate-500 text-slate-100 hover:bg-slate-800"
        >
          Login
        </button>
        <button
          type="button"
          className="px-3 py-1.5 rounded bg-primary hover:bg-blue-500 text-white font-medium"
        >
          Register
        </button>
      </div>
    </header>
  )
}

