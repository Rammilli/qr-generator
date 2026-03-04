import { useState } from "react"

export default function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  const headerClasses = open
    ? "bg-primary text-white"
    : "bg-slate-50 text-slate-800 hover:bg-slate-100"

  return (
    <div className="border border-slate-200 rounded-lg mb-3 overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-medium ${headerClasses}`}
      >
        <span>{title}</span>
        <span className="text-xs opacity-80">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="p-4 bg-white text-sm text-slate-700">{children}</div>
      )}
    </div>
  )
}