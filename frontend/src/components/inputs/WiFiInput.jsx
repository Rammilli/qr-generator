import { useQR } from "../../QRContext"

const SECURITY_TYPES = ["WPA", "WEP", "nopass"]

export default function WiFiInput() {
  const { state, update } = useQR()
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Network Name (SSID)
        </label>
        <input
          type="text"
          placeholder="MyHomeNetwork"
          value={state.wifiSSID}
          onChange={e => update({ wifiSSID: e.target.value })}
          className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-3 rounded-xl text-sm transition"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Password
        </label>
        <input
          type="text"
          placeholder="••••••••"
          value={state.wifiPassword}
          onChange={e => update({ wifiPassword: e.target.value })}
          className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-3 rounded-xl text-sm transition"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Security Type
        </label>
        <div className="flex gap-2">
          {SECURITY_TYPES.map(type => (
            <button
              key={type}
              type="button"
              onClick={() => update({ wifiEncryption: type })}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition
                ${state.wifiEncryption === type
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300"
                }`}
            >
              {type === "nopass" ? "Open" : type}
            </button>
          ))}
        </div>
      </div>
      <p className="text-xs text-gray-400">Scanning will automatically connect to the network.</p>
    </div>
  )
}
