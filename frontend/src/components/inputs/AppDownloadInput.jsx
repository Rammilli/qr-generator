import { useQR } from "../../QRContext"

export default function AppDownloadInput() {
  const { state, update } = useQR()
  return (
    <div className="space-y-3">
      <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-xs text-blue-700">
        <strong>Smart App Download</strong> — Enter both store links. The QR will encode both URLs.
        Users are guided to the right store based on their device.
      </div>
      <div>
        <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-gray-400">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.15-2.19 1.28-2.17 3.83.03 3.02 2.65 4.03 2.68 4.04l-.06.2zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          iOS App Store URL
        </label>
        <input
          type="url"
          placeholder="https://apps.apple.com/app/…"
          value={state.iosLink}
          onChange={e => update({ iosLink: e.target.value })}
          className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-3 rounded-xl text-sm transition"
        />
      </div>
      <div>
        <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-green-500">
            <path d="M17.523 15.341L5.386 2.192A1 1 0 0 0 3.75 3v18a1 1 0 0 0 1.636.808l12.137-9a1 1 0 0 0 0-1.467zM6.25 18.574V5.426L16.106 12 6.25 18.574z"/>
          </svg>
          Android Play Store URL
        </label>
        <input
          type="url"
          placeholder="https://play.google.com/store/apps/details?id=…"
          value={state.androidLink}
          onChange={e => update({ androidLink: e.target.value })}
          className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-3 rounded-xl text-sm transition"
        />
      </div>
    </div>
  )
}
