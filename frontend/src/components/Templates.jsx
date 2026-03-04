import Panel from "./Panel"

export default function Templates() {
  return (
    <Panel>
      <p className="mb-3">
        Choose a starting layout for your QR code. You can still customize all
        colors and details later.
      </p>
      <div className="grid grid-cols-3 gap-3">
        {["Classic", "Rounded", "Minimal"].map((name) => (
          <button
            key={name}
            type="button"
            className="h-20 rounded-lg border border-slate-200 bg-white flex flex-col items-center justify-center text-xs font-medium text-slate-700 hover:border-primary hover:shadow-sm transition"
          >
            <div className="w-10 h-10 bg-slate-200 rounded-md mb-1" />
            {name}
          </button>
        ))}
      </div>
    </Panel>
  )
}

