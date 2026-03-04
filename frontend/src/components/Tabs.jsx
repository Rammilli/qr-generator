import { useState } from "react"

export default function Tabs({ setType }) {
  const [active, setActive] = useState("link")

  const changeTab = (t) => {
    setActive(t)
    if (setType) {
      setType(t)
    }
  }

  const commonClasses =
    "px-4 py-2 rounded-full text-xs font-medium border transition-colors"

  const activeClasses = "bg-primary text-white border-primary shadow-sm"
  const inactiveClasses =
    "bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200"

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        type="button"
        onClick={() => changeTab("link")}
        className={`${commonClasses} ${
          active === "link" ? activeClasses : inactiveClasses
        }`}
      >
        Link
      </button>

      <button
        type="button"
        onClick={() => changeTab("text")}
        className={`${commonClasses} ${
          active === "text" ? activeClasses : inactiveClasses
        }`}
      >
        Text
      </button>

      <button
        type="button"
        onClick={() => changeTab("vcard")}
        className={`${commonClasses} ${
          active === "vcard" ? activeClasses : inactiveClasses
        }`}
      >
        vCard
      </button>

      <button
        type="button"
        onClick={() => changeTab("pdf")}
        className={`${commonClasses} ${
          active === "pdf" ? activeClasses : inactiveClasses
        }`}
      >
        PDF
      </button>
    </div>
  )
}