import Panel from "./Panel"

export default function Frames() {
  return (
    <Panel>
      <p className="mb-3 text-sm">
        Wrap your QR code with a frame and call-to-action to increase scans.
      </p>
      <div className="grid grid-cols-2 gap-3 text-xs">
        {["No frame", "Rounded frame", "Sticker style", "CTA banner"].map(
          (label) => (
            <button
              key={label}
              type="button"
              className="border border-slate-200 rounded-lg px-3 py-2 text-left hover:border-primary hover:shadow-sm transition bg-white"
            >
              {label}
            </button>
          )
        )}
      </div>
    </Panel>
  )
}

