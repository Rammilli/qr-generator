import { useEffect, useState } from "react"
import { useQR } from "../../QRContext"
import { RiDownloadLine, RiFilePdfLine, RiQrCodeLine, RiLoader4Line } from "react-icons/ri"

const PERKS = ["Free forever", "No watermark", "High resolution", "Commercial use"]

/** Convert SVG string → object URL for use in <img> — gives proper object-fit scaling */
function useSvgUrl(svgString) {
    const [url, setUrl] = useState(null)

    useEffect(() => {
        if (!svgString) { setUrl(null); return }
        const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" })
        const objUrl = URL.createObjectURL(blob)
        setUrl(objUrl)
        return () => URL.revokeObjectURL(objUrl)
    }, [svgString])

    return url
}

export default function QRPreview() {
    const { state, downloadQR } = useQR()
    const hasQR = Boolean(state.qrSvg)
    const qrImgUrl = useSvgUrl(state.qrSvg)

    // Logo overlay size proportional to the 185px inner display area
    const INNER = 185
    const logoSize = Math.round((state.logoSize / 100) * INNER)
    const logoPad = 6

    return (
        <div className="flex flex-col items-center gap-5">

            {/* Live indicator */}
            <div className="flex items-center gap-2 text-[11px] text-white/40 uppercase tracking-widest font-semibold">
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${state.loading ? "bg-yellow-400" : "bg-emerald-400"} animate-pulse`} />
                {state.loading ? "Generating…" : "Live Preview"}
            </div>

            {/* ─── QR Frame ────────────────────────────────────────────── */}
            <div className="relative">
                {/* Soft glow */}
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/15 to-accent/15 blur-2xl pointer-events-none" />

                {/* Outer frame — white card with scanner corners */}
                <div
                    className="relative bg-white rounded-2xl"
                    style={{ width: 220, height: 220, boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}
                >
                    {/* Corner scanner markers — PhonePe style */}
                    {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos, i) => (
                        <div key={i} className={`absolute ${pos} w-7 h-7 pointer-events-none`}>
                            <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {i === 0 && <><path d="M2 14 V2 H14" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" /></>}
                                {i === 1 && <><path d="M26 14 V2 H14" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" /></>}
                                {i === 2 && <><path d="M2 14 V26 H14" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" /></>}
                                {i === 3 && <><path d="M26 14 V26 H14" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" /></>}
                            </svg>
                        </div>
                    ))}

                    {/* Loading spinner overlay */}
                    {state.loading && (
                        <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/80 rounded-2xl">
                            <RiLoader4Line className="text-primary text-3xl animate-spin" />
                        </div>
                    )}

                    {/* Inner content area with consistent padding */}
                    <div className="absolute inset-0 flex items-center justify-center" style={{ padding: 16 }}>
                        {hasQR && qrImgUrl ? (
                            <div className="relative w-full h-full flex items-center justify-center">
                                {/* QR image — object-fit:contain keeps it sharp & centred */}
                                <img
                                    src={qrImgUrl}
                                    alt="QR Code"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                        imageRendering: "crisp-edges",
                                        display: "block",
                                    }}
                                    draggable={false}
                                />

                                {/* Logo centred over QR */}
                                {state.logo && (
                                    <div
                                        className="absolute"
                                        style={{
                                            width: logoSize + logoPad * 2,
                                            height: logoSize + logoPad * 2,
                                            backgroundColor: "white",
                                            borderRadius: state.logoBorderRadius + logoPad,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            boxShadow: "0 0 0 2px rgba(255,255,255,0.95)",
                                        }}
                                    >
                                        <img
                                            src={state.logo}
                                            alt="Logo"
                                            style={{
                                                width: logoSize,
                                                height: logoSize,
                                                objectFit: "contain",
                                                borderRadius: state.logoBorderRadius,
                                                display: "block",
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-3 text-center w-full h-full">
                                <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center animate-float">
                                    <RiQrCodeLine className="text-2xl text-primary/50" />
                                </div>
                                <p className="text-[11px] text-gray-300 font-medium leading-snug">
                                    Enter content &amp;<br />click Generate
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Download buttons */}
            <div className="flex gap-2 w-full" style={{ maxWidth: 220 }}>
                <button
                    type="button"
                    onClick={() => downloadQR("png")}
                    disabled={!hasQR || state.loading}
                    className="flex-1 flex items-center justify-center gap-1.5 btn-primary py-2.5 rounded-xl text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <RiDownloadLine size={14} /> PNG
                </button>
                <button
                    type="button"
                    onClick={() => downloadQR("svg")}
                    disabled={!hasQR || state.loading}
                    className="flex-1 flex items-center justify-center gap-1.5 btn-secondary py-2.5 rounded-xl text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <RiFilePdfLine size={14} /> SVG
                </button>
            </div>

            {/* Perks */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 w-full" style={{ maxWidth: 220 }}>
                {PERKS.map((p) => (
                    <div key={p} className="flex items-center gap-1.5 text-[10px] text-white/35">
                        <div className="w-3 h-3 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                            <svg className="w-1.5 h-1.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        {p}
                    </div>
                ))}
            </div>
        </div>
    )
}
