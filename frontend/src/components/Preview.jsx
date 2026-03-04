export default function Preview({ qr }) {
  const hasQr = Boolean(qr)

  return (
    <div className="flex flex-col items-center justify-between bg-lightbg rounded-2xl p-6 lg:p-8 min-h-[340px]">
      <div className="w-full flex flex-col items-center gap-4">
        <div className="text-sm font-semibold text-slate-700">Preview</div>

        <div className="w-56 h-56 bg-white rounded-xl shadow-card flex items-center justify-center border border-slate-100">
          {hasQr ? (
            <div
              className="w-52 h-52"
              dangerouslySetInnerHTML={{ __html: qr }}
            />
          ) : (
            <span className="text-xs text-slate-400">QR will appear here</span>
          )}
        </div>

        <div className="flex gap-3 mt-2">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 rounded bg-primary text-white text-xs font-medium hover:bg-blue-600 transition"
          >
            Download QR
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 rounded bg-slate-800 text-white text-xs font-medium hover:bg-black transition"
          >
            Dynamic QR
          </button>
        </div>
      </div>

      <div className="mt-6 w-full flex flex-wrap justify-center gap-4 text-[11px] text-slate-500">
        <span>Generate free QR Codes</span>
        <span>Unlimited validity</span>
        <span>For commercial use</span>
        <span>Without registration</span>
        <span>Design &amp; logo</span>
      </div>
    </div>
  )
}

