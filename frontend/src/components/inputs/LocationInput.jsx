import { useQR } from "../../QRContext"

export default function LocationInput() {
  const { state, update } = useQR()
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Latitude
          </label>
          <input
            type="number"
            step="any"
            placeholder="40.7128"
            value={state.lat}
            onChange={e => update({ lat: e.target.value })}
            className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-3 rounded-xl text-sm transition"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Longitude
          </label>
          <input
            type="number"
            step="any"
            placeholder="-74.0060"
            value={state.lng}
            onChange={e => update({ lng: e.target.value })}
            className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-3 rounded-xl text-sm transition"
          />
        </div>
      </div>
      <p className="text-xs text-gray-400">
        Opens Google Maps at the specified coordinates.
        <br />
        Tip: right-click a map pin and copy coordinates.
      </p>
    </div>
  )
}
