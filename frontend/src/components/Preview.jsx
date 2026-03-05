function downloadFile(svgStr, format) {
  if (!svgStr) return
  if (format === "svg") {
    const blob = new Blob([svgStr], { type: "image/svg+xml" })
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(blob),
      download: "qrcode.svg"
    })
    a.click()
    setTimeout(() => URL.revokeObjectURL(a.href), 5000)
  } else {
    // PNG: draw the SVG into a canvas via Image, then download
    const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(svgBlob)
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.naturalWidth || 600
      canvas.height = img.naturalHeight || 600
      const ctx = canvas.getContext("2d")
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const a = Object.assign(document.createElement("a"), {
        href: canvas.toDataURL("image/png"),
        download: "qrcode.png"
      })
      a.click()
      URL.revokeObjectURL(url)
    }
    img.onerror = () => {
      // fallback: just download SVG if PNG conversion fails
      downloadFile(svgStr, "svg")
      URL.revokeObjectURL(url)
    }
    img.src = url
  }
}

export default function Preview({ qr, loading, error, design }) {
  const hasQR = Boolean(qr) && qr.length > 50

  return (
    <div className="bg-slate-50 border-l border-slate-200 p-6 flex flex-col items-center gap-4 sticky top-0 h-[88vh]">

      {/* Title */}
      <div className="text-center">
        <p className="text-sm font-bold text-slate-700">QR Preview</p>
        <div className="flex items-center justify-center gap-1.5 mt-1">
          <span className={`w-2 h-2 rounded-full ${loading ? "bg-amber-400" : error ? "bg-red-400" : hasQR ? "bg-green-400" : "bg-slate-300"
            }`} />
          <span className="text-[11px] text-slate-400">
            {loading ? "Generating…" : error ? "Error" : hasQR ? "Ready" : "Type content to generate"}
          </span>
        </div>
      </div>

      {/* QR box — dangerouslySetInnerHTML so the embedded base64 PNG inside SVG renders */}
      <div className="relative w-56 h-56 bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center overflow-hidden shadow-sm">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 z-10 gap-2">
            <svg style={{ animation: "spin 0.7s linear infinite" }} width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#e2e8f0" strokeWidth="3" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <span className="text-xs text-slate-400">Generating…</span>
          </div>
        )}

        {hasQR ? (
          /* 
           * IMPORTANT: use dangerouslySetInnerHTML — NOT <img src="blob:...">
           * The backend SVG embeds PNG as base64 inside <image href="data:image/png;..."/>
           * Browsers block that when loaded via <img src="blob:"> due to SVG security restrictions.
           * Inline rendering via dangerouslySetInnerHTML has no such restriction.
           * The CSS class .qr-svg-wrapper forces the SVG to fill the container.
           */
          <div
            className="qr-svg-wrapper"
            dangerouslySetInnerHTML={{ __html: qr }}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-300 text-center p-4">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <path d="M14 14h2m2 0h2M14 17v2m4-2v2M16 20h2" strokeLinecap="round" />
            </svg>
            <p className="text-xs text-slate-400 leading-snug">Enter content<br />to generate QR</p>
          </div>
        )}
      </div>

      {/* Download */}
      {hasQR && (
        <div className="flex gap-2 w-56">
          <button type="button" onClick={() => downloadFile(qr, "png")}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition">
            ↓ PNG
          </button>
          <button type="button" onClick={() => downloadFile(qr, "svg")}
            className="flex-1 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold py-2.5 rounded-xl border border-slate-200 transition">
            ↓ SVG
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="w-56 bg-red-50 border border-red-200 rounded-xl p-3 text-xs">
          <p className="font-bold text-red-600 mb-1">⚠ Failed</p>
          <p className="text-red-500 break-all mb-2">{error}</p>
          <p className="text-slate-400">
            Backend not running?<br />
            <code className="font-mono">uvicorn app.main:app --reload</code>
          </p>
        </div>
      )}

      {!error && !hasQR && (
        <p className="text-[11px] text-slate-400 text-center leading-relaxed">
          ✓ Free · ✓ No watermark<br />✓ High-res · ✓ Commercial use
        </p>
      )}
    </div>
  )
}