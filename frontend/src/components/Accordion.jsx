import { useState } from "react"

/**
 * Accordion — supports both self-managed (legacy) and parent-managed open state
 * Pass isOpen + onToggle for parent-managed (single-open) behavior.
 */
export default function Accordion({ title, children, isOpen, onToggle }) {
  const [selfOpen, setSelfOpen] = useState(false)
  const controlled = isOpen !== undefined && onToggle !== undefined
  const open = controlled ? isOpen : selfOpen
  const toggle = controlled ? onToggle : () => setSelfOpen(o => !o)

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <button
        type="button"
        onClick={toggle}
        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition
          ${open ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-50"}`}
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="border-t border-slate-100 p-4 text-sm text-slate-600">
          {children}
        </div>
      )}
    </div>
  )
}