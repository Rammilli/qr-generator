import { useState, useEffect, useRef, useCallback } from "react"
import Tabs from "./tabs"
import Accordion from "./accordion"
import Preview from "./Preview"
import Templates from "./Templates"
import Logo from "./Logo"
import Colors from "./Colors"
import Frames from "./Frames"
import Patterns from "./Patterns"
import Background from "./Background"
import Options from "./Options"

const DEFAULT_DESIGN = {
  fgColor: "#000000",
  bgColor: "#ffffff",
  gradient: false,
  gradientColor: "#6366f1",
  gradientDirection: "horizontal",
  pattern: "squares",
  logo: null,
  logoSize: 25,
  frame: null,
  frameLabel: "SCAN ME",
  frameLabelFont: "Arial",
  frameLabelColor: "#000000",
  frameColor: null,
  bgImage: null,
  errorCorrection: "H",
  quietZone: 4,
  qrSize: 300,
}

const SECTIONS = [
  "Design Templates", "Your Logo", "Your Colors",
  "Custom Frames", "Patterns", "Background", "Options"
]

export default function Builder() {
  const [type, setType] = useState("link")
  const [data, setData] = useState("")
  const [design, setDesign] = useState(DEFAULT_DESIGN)
  const [qr, setQr] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [open, setOpen] = useState("Design Templates")

  const debounce = useRef(null)

  const patchDesign = useCallback((updates) => {
    setDesign(prev => ({ ...prev, ...updates }))
  }, [])

  const generate = useCallback(async (currentData, currentType, d) => {
    const content = currentData?.trim() || ""
    if (!content) return
    setLoading(true); setError("")
    try {
      const res = await fetch("http://127.0.0.1:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: content,
          type: currentType,
          fill_color: d.fgColor,
          back_color: d.bgColor,
          gradient_color: d.gradient ? d.gradientColor : null,
          gradient_direction: d.gradientDirection,
          logo: d.logo || null,
          logo_size: d.logoSize,
          frame: d.frame || null,
          frame_label: d.frameLabel || "SCAN ME",
          frame_label_font: d.frameLabelFont || "Arial",
          frame_label_color: d.frameLabelColor || "#000000",
          frame_color: d.frameColor || null,
          qr_size: d.qrSize,
          pattern: d.pattern,
          error_correction: d.errorCorrection,
          quiet_zone: d.quietZone,
        }),
      })
      if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)
      setQr(await res.text())
    } catch (e) {
      setError(e.message || "Failed to reach backend")
    } finally {
      setLoading(false)
    }
  }, [])

  // Debounced auto-regen whenever data, type, or any design option changes
  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current)
    debounce.current = setTimeout(() => generate(data, type, design), 500)
    return () => clearTimeout(debounce.current)
  }, [data, type, design, generate])

  const handleToggle = (section) => {
    setOpen(prev => prev === section ? null : section)
  }

  const getPlaceholder = () => {
    if (type === "text") return "Enter text to encode…"
    if (type === "vcard") return "Paste vCard content…"
    if (type === "pdf") return "https://example.com/file.pdf"
    return "https://example.com"
  }

  const sectionMap = {
    "Design Templates": <Templates design={design} patchDesign={patchDesign} />,
    "Your Logo": <Logo design={design} patchDesign={patchDesign} />,
    "Your Colors": <Colors design={design} patchDesign={patchDesign} />,
    "Custom Frames": <Frames design={design} patchDesign={patchDesign} />,
    "Patterns": <Patterns design={design} patchDesign={patchDesign} />,
    "Background": <Background design={design} patchDesign={patchDesign} />,
    "Options": <Options design={design} patchDesign={patchDesign} />,
  }

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-8 bg-white rounded-2xl shadow-lg overflow-hidden">

      {/* ── LEFT: editor ──────────────────────────────────────── */}
      <div className="p-6 overflow-y-auto max-h-[88vh]">

        {/* Type tabs */}
        <Tabs setType={setType} active={type} />

        {/* Content input */}
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mt-5 mb-1.5">
          Content
        </label>
        <input
          type="text"
          placeholder={getPlaceholder()}
          value={data}
          onChange={e => setData(e.target.value)}
          className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-3 rounded-xl text-sm transition"
        />
        <p className="text-xs text-gray-400 mt-1.5 mb-5">
          QR updates automatically as you type
        </p>

        {/* Accordion sections */}
        <div className="space-y-2">
          {SECTIONS.map(s => (
            <Accordion
              key={s}
              title={s}
              isOpen={open === s}
              onToggle={() => handleToggle(s)}
            >
              {sectionMap[s]}
            </Accordion>
          ))}
        </div>
      </div>

      {/* ── RIGHT: preview ────────────────────────────────────── */}
      <Preview
        qr={qr}
        loading={loading}
        error={error}
        design={design}
      />
    </div>
  )
}