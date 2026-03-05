import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react"

const QRContext = createContext(null)

export const QR_TYPES = [
    { id: "link", label: "Link", icon: "🔗", placeholder: "https://example.com" },
    { id: "text", label: "Text", icon: "📝", placeholder: "Enter your text here" },
    { id: "vcard", label: "VCard", icon: "👤", placeholder: "Full Name" },
    { id: "pdf", label: "PDF", icon: "📄", placeholder: "https://example.com/file.pdf" },
    { id: "email", label: "Email", icon: "✉️", placeholder: "hello@example.com" },
    { id: "phone", label: "Phone", icon: "📞", placeholder: "+1 234 567 8900" },
    { id: "sms", label: "SMS", icon: "💬", placeholder: "+1 234 567 8900" },
    { id: "whatsapp", label: "WhatsApp", icon: "💚", placeholder: "+1 234 567 8900" },
    { id: "wifi", label: "WiFi", icon: "📶", placeholder: "Network Name (SSID)" },
    { id: "youtube", label: "YouTube", icon: "▶️", placeholder: "https://youtube.com/watch?v=..." },
]

export const DESIGN_TABS = [
    { id: "templates", label: "Templates" },
    { id: "logo", label: "Your Logo" },
    { id: "colors", label: "Colors" },
    { id: "frames", label: "Frames" },
    { id: "patterns", label: "Patterns" },
    { id: "background", label: "Background" },
    { id: "options", label: "Options" },
]

export const TEMPLATES = [
    { id: "classic", name: "Classic", fgColor: "#000000", bgColor: "#ffffff", pattern: "squares", frame: null, label: "SCAN ME" },
    { id: "ocean", name: "Ocean", fgColor: "#0369a1", bgColor: "#f0f9ff", pattern: "dots", frame: "rounded", label: "SCAN ME" },
    { id: "forest", name: "Forest", fgColor: "#166534", bgColor: "#f0fdf4", pattern: "rounded", frame: null, label: "SCAN ME" },
    { id: "sunset", name: "Sunset", fgColor: "#9a3412", bgColor: "#fff7ed", pattern: "dots", frame: "scan", label: "SCAN ME" },
    { id: "midnight", name: "Midnight", fgColor: "#e0e7ff", bgColor: "#1e1b4b", pattern: "squares", frame: null, label: "SCAN ME" },
    { id: "rose", name: "Rose", fgColor: "#881337", bgColor: "#fff1f2", pattern: "rounded", frame: "rounded", label: "SCAN ME" },
    { id: "grape", name: "Grape", fgColor: "#581c87", bgColor: "#faf5ff", pattern: "dots", frame: null, label: "SCAN ME" },
    { id: "slate", name: "Slate", fgColor: "#1e293b", bgColor: "#f8fafc", pattern: "squares", frame: "scan", label: "SCAN ME" },
    { id: "neon", name: "Neon", fgColor: "#00ff88", bgColor: "#0a0a1a", pattern: "dots", frame: null, label: "SCAN ME" },
]

const DEFAULT_STATE = {
    qrType: "link",
    content: "",
    // vcard fields
    vcardName: "", vcardEmail: "", vcardPhone: "", vcardOrg: "",
    // wifi fields
    wifiSSID: "", wifiPassword: "", wifiEncryption: "WPA",
    // design
    fgColor: "#000000",
    bgColor: "#ffffff",
    gradient: false,
    gradientColor: "#6366f1",
    pattern: "squares",
    logo: null,
    logoSize: 25,
    logoBorderRadius: 8,
    frame: null,
    frameLabel: "SCAN ME",
    frameLabelFont: "Arial",
    frameLabelSize: 100,
    frameLabelColor: "#000000",
    bgImage: null,
    errorCorrection: "H",
    quietZone: 4,
    outputFormat: "PNG",
    qrSize: 300,
    // preview result
    qrSvg: "",
    loading: false,
    error: "",
}

export function QRProvider({ children }) {
    const [state, setState] = useState(DEFAULT_STATE)
    // Use ref so generateQR always has the latest state without being recreated
    const stateRef = useRef(state)
    stateRef.current = state
    const debounceRef = useRef(null)

    const update = useCallback((updates) => {
        setState(prev => ({ ...prev, ...updates }))
    }, [])

    // Core generate function — reads from stateRef so it never goes stale
    const generateQR = useCallback(async (overrideState) => {
        const current = overrideState || stateRef.current
        const hasContent = current.content || current.vcardName || current.wifiSSID
        if (!hasContent) return

        setState(prev => ({ ...prev, loading: true, error: "" }))

        try {
            let data = current.content

            if (current.qrType === "vcard") {
                data = `BEGIN:VCARD\nVERSION:3.0\nFN:${current.vcardName}\nEMAIL:${current.vcardEmail}\nTEL:${current.vcardPhone}\nORG:${current.vcardOrg}\nEND:VCARD`
            } else if (current.qrType === "email") {
                data = `mailto:${current.content}`
            } else if (current.qrType === "phone") {
                data = `tel:${current.content}`
            } else if (current.qrType === "sms") {
                data = `sms:${current.content}`
            } else if (current.qrType === "whatsapp") {
                data = `https://wa.me/${current.content.replace(/\D/g, "")}`
            } else if (current.qrType === "wifi") {
                data = `WIFI:T:${current.wifiEncryption};S:${current.wifiSSID};P:${current.wifiPassword};;`
            }

            // VITE_API_URL is set to Render backend URL in production (e.g. https://qrcraft-backend.onrender.com)
            // Locally: set in frontend/.env as VITE_API_URL=http://127.0.0.1:8000
            const API_URL = import.meta.env.VITE_API_URL || ""

            const res = await fetch(`${API_URL}/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    data,
                    type: current.qrType,
                    fill_color: current.fgColor,
                    back_color: current.bgColor,
                    logo: current.logo,
                    logo_size: current.logoSize,
                    frame: current.frame,
                    frame_label: current.frameLabel,
                    frame_label_font: current.frameLabelFont,
                    frame_label_color: current.frameLabelColor,
                    qr_size: current.qrSize,
                    pattern: current.pattern,
                    error_correction: current.errorCorrection,
                    quiet_zone: current.quietZone,
                }),
            })

            if (!res.ok) {
                const msg = await res.text()
                throw new Error(msg || "Failed to generate QR")
            }

            const svg = await res.text()
            setState(prev => ({ ...prev, qrSvg: svg, loading: false }))
        } catch (err) {
            setState(prev => ({ ...prev, error: err.message || "Something went wrong", loading: false }))
        }
    }, []) // stable — uses stateRef

    // ─── Auto-regenerate whenever any design/content changes ───────────────────
    useEffect(() => {
        const s = stateRef.current
        const hasContent = s.content || s.vcardName || s.wifiSSID
        if (!hasContent) return

        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
            generateQR(stateRef.current)
        }, 500)

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current)
        }
    }, [
        // content triggers
        state.content, state.vcardName, state.vcardEmail, state.vcardPhone, state.vcardOrg,
        state.wifiSSID, state.wifiPassword, state.wifiEncryption, state.qrType,
        // design triggers
        state.fgColor, state.bgColor, state.pattern,
        state.logo, state.logoSize,
        state.frame, state.frameLabel, state.frameLabelFont, state.frameLabelColor,
        state.errorCorrection, state.quietZone, state.qrSize,
        generateQR,
    ])

    const applyTemplate = useCallback((tpl) => {
        update({
            fgColor: tpl.fgColor,
            bgColor: tpl.bgColor,
            pattern: tpl.pattern,
            frame: tpl.frame,
            frameLabel: tpl.label,
        })
    }, [update])

    const downloadQR = useCallback((format = "svg") => {
        const { qrSvg } = stateRef.current
        if (!qrSvg) return

        if (format === "svg") {
            const blob = new Blob([qrSvg], { type: "image/svg+xml" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "qrcode.svg"
            a.click()
            URL.revokeObjectURL(url)
        } else {
            const img = new Image()
            const svgBlob = new Blob([qrSvg], { type: "image/svg+xml;charset=utf-8" })
            const url = URL.createObjectURL(svgBlob)
            img.onload = () => {
                const canvas = document.createElement("canvas")
                const s = stateRef.current
                canvas.width = s.qrSize + 60
                canvas.height = s.qrSize + 60
                const ctx = canvas.getContext("2d")
                ctx.drawImage(img, 0, 0)
                URL.revokeObjectURL(url)
                const a = document.createElement("a")
                a.href = canvas.toDataURL("image/png")
                a.download = "qrcode.png"
                a.click()
            }
            img.src = url
        }
    }, [])

    return (
        <QRContext.Provider value={{ state, update, generateQR, applyTemplate, downloadQR }}>
            {children}
        </QRContext.Provider>
    )
}

export function useQR() {
    const ctx = useContext(QRContext)
    if (!ctx) throw new Error("useQR must be used within QRProvider")
    return ctx
}
