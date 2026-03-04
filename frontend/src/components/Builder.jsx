import { useState } from "react"
import Tabs from "./Tabs"
import Accordion from "./Accordion"
import Preview from "./Preview"
import Templates from "./Templates"
import Logo from "./Logo"
import Colors from "./Colors"
import Frames from "./Frames"
import Patterns from "./Patterns"
import Background from "./Background"
import Options from "./Options"

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

export default function Builder() {
  const [type, setType] = useState("link")
  const [data, setData] = useState("")
  const [qr, setQr] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const generateQR = async () => {
    if (!data.trim()) {
      setError("Please enter some data to encode.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, type }),
      })

      if (!res.ok) {
        const message = await res.text()
        throw new Error(message || "Failed to generate QR code")
      }

      const svg = await res.text()
      setQr(svg)
    } catch (err) {
      setError(err.message || "Something went wrong while generating the QR")
    } finally {
      setLoading(false)
    }
  }

  const getPlaceholder = () => {
    if (type === "text") return "Enter text to encode"
    if (type === "vcard") return "Paste vCard content"
    if (type === "pdf") return "https://example.com/file.pdf"
    return "https://example.com"
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-6 lg:p-8 rounded-2xl shadow-card">
      {/* LEFT BUILDER */}
      <div>
        <Tabs setType={setType} />

        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 mt-1">
          {type === "link" && "Destination URL"}
          {type === "text" && "Text content"}
          {type === "vcard" && "vCard data"}
          {type === "pdf" && "PDF link"}
        </label>

        <input
          type="text"
          placeholder={getPlaceholder()}
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="w-full border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none p-3 rounded-lg text-sm"
        />

        <p className="text-[11px] text-slate-400 mt-1">
          The destination will be encoded into a high-quality QR code.
        </p>

        {error && (
          <p className="mt-2 text-xs text-red-500 bg-red-50 border border-red-100 rounded px-3 py-2">
            {error}
          </p>
        )}

        <div className="mt-6 space-y-3">
          <Accordion title="Design Templates">
            <Templates />
          </Accordion>

          <Accordion title="Your Logo">
            <Logo />
          </Accordion>

          <Accordion title="Your Colors">
            <Colors />
          </Accordion>

          <Accordion title="Custom Frames">
            <Frames />
          </Accordion>

          <Accordion title="Patterns">
            <Patterns />
          </Accordion>

          <Accordion title="Background">
            <Background />
          </Accordion>

          <Accordion title="Options">
            <Options />
          </Accordion>
        </div>

        <button
          onClick={generateQR}
          disabled={loading}
          className="w-full bg-primary hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white py-3 rounded-lg mt-6 text-sm font-semibold shadow-md transition-colors"
        >
          {loading ? "Generating..." : "Generate QR"}
        </button>
      </div>

      {/* RIGHT PREVIEW */}
      <Preview qr={qr} />
    </div>
  )
}