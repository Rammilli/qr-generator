import { useEffect, useState } from "react"
import { API_URL } from "../config"
import { useQR } from "../QRContext"

function MiniQR({ template }) {
  return (
    <div
      className="w-full aspect-square rounded-lg border border-slate-200 flex items-center justify-center relative overflow-hidden"
      style={{
        background: template.bgColor || "#ffffff"
      }}
    >
      <div className="w-[70%] h-[70%] grid grid-cols-5 gap-[2px]">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="rounded-[1px]"
            style={{
              background: i % 3 === 0 ? template.fgColor || "#000000" : "transparent"
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function Templates() {
  console.log("NEW TEMPLATE FILE LOADED")

  const [templates, setTemplates] = useState([])
  const { applyTemplate } = useQR()

  useEffect(() => {
    console.log("API_URL =", API_URL)

    fetch(`${API_URL}/templates`)
      .then(res => res.json())
      .then(data => {
        console.log("TEMPLATES API =", data)
        setTemplates(data)
      })
      .catch(err => console.error("Template load failed:", err))
  }, [])

  return (
    <div className="p-6">

      <div style={{ color: "red", fontSize: "28px", fontWeight: "bold" }}>
        TEMPLATE ACTIVE
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        {templates.slice(0, 6).map(t => (
          <button
            key={t.id}
            onClick={() => applyTemplate(t)}
            className="border rounded-xl p-2"
          >
            <MiniQR template={t} />
            <p className="text-xs mt-2">{t.name}</p>
          </button>
        ))}
      </div>

    </div>
  )
}