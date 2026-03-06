import { useQR } from "../../QRContext"

export default function EventInput() {
  const { state, update } = useQR()
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Event Title
        </label>
        <input
          type="text"
          placeholder="Product Launch 2025"
          value={state.eventTitle}
          onChange={e => update({ eventTitle: e.target.value })}
          className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-3 rounded-xl text-sm transition"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Location <span className="text-gray-300 font-normal normal-case">(optional)</span>
        </label>
        <input
          type="text"
          placeholder="123 Main St, New York"
          value={state.eventLocation}
          onChange={e => update({ eventLocation: e.target.value })}
          className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-3 rounded-xl text-sm transition"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Date
          </label>
          <input
            type="date"
            value={state.eventDate}
            onChange={e => update({ eventDate: e.target.value })}
            className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-3 rounded-xl text-sm transition"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Time
          </label>
          <input
            type="time"
            value={state.eventTime}
            onChange={e => update({ eventTime: e.target.value })}
            className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-3 rounded-xl text-sm transition"
          />
        </div>
      </div>
      <p className="text-xs text-gray-400">Generates a VEVENT / iCal QR code. Scanning adds the event to the calendar.</p>
    </div>
  )
}
