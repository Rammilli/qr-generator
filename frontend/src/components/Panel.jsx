export default function Panel({ title, children }) {
  return (
    <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
      {title && (
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          {title}
        </h3>
      )}
      <div className="text-sm text-slate-700">{children}</div>
    </div>
  )
}

