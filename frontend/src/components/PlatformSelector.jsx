import { PLATFORMS } from "../data/platforms"
import { useQR } from "../QRContext"

export default function PlatformSelector() {
  const { state, update, applyPlatform } = useQR()

  const handleSelect = (platformId) => {
    if (state.platform === platformId) {
      // toggle off
      applyPlatform(null)
    } else {
      applyPlatform(platformId)
    }
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Social Platform
        </label>
        {state.platform && (
          <button
            type="button"
            onClick={() => applyPlatform(null)}
            className="text-xs text-gray-400 hover:text-red-500 transition flex items-center gap-1"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-6 gap-1.5">
        {PLATFORMS.map((platform) => {
          const isSelected = state.platform === platform.id
          return (
            <button
              key={platform.id}
              type="button"
              title={platform.name}
              onClick={() => handleSelect(platform.id)}
              className={`relative flex flex-col items-center gap-1 p-1.5 rounded-xl border-2 transition-all
                ${isSelected
                  ? "border-blue-500 bg-blue-50 shadow-md scale-105"
                  : "border-transparent hover:border-gray-200 hover:bg-gray-50"
                }`}
              style={isSelected ? { borderColor: platform.color, background: platform.color + "15" } : {}}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: platform.color + "20" }}
                dangerouslySetInnerHTML={{
                  __html: platform.svgIcon.replace(
                    /currentColor/g,
                    platform.color
                  ).replace("<svg", `<svg width="18" height="18"`)
                }}
              />
              <span className="text-[9px] font-medium text-gray-500 leading-none text-center truncate w-full">
                {platform.name.split(" / ")[0]}
              </span>
              {isSelected && (
                <div
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white flex items-center justify-center"
                  style={{ background: platform.color }}
                >
                  <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {state.platform && (() => {
        const p = PLATFORMS.find(pl => pl.id === state.platform)
        return p ? (
          <div className="mt-3">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              {p.name} Profile URL
            </label>
            <input
              type="text"
              value={state.content}
              onChange={e => update({ content: e.target.value })}
              placeholder={p.urlTemplate}
              className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-3 rounded-xl text-sm transition font-mono"
            />
            <p className="text-xs text-gray-400 mt-1">
              Replace placeholder with your actual {p.placeholder}
            </p>
          </div>
        ) : null
      })()}
    </div>
  )
}
