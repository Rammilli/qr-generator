import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react"
import { API_URL } from "./config"

const QRContext = createContext(null)

export const QR_TYPES = [
    { id: "link", label: "Link", icon: "🔗", placeholder: "https://example.com" },
    { id: "text", label: "Text", icon: "📝", placeholder: "Enter your text here" },
    { id: "vcard", label: "VCard", icon: "👤", placeholder: "Full Name" },
    { id: "pdf", label: "PDF", icon: "📄", placeholder: "https://example.com/file.pdf" },
]

const DEFAULT_STATE = {
    // content
    qrType: "link",
    content: "",
    // vcard
    vcardName: "", vcardEmail: "", vcardPhone: "", vcardOrg: "",
    // wifi
    wifiSSID: "", wifiPassword: "", wifiEncryption: "WPA",
    // design
    fgColor: "#000000",
    bgColor: "#ffffff",
    gradient: false,
    gradientColor: "#6366f1",
    gradientDirection: "horizontal",
    pattern: "squares",
    logo: null,
    logoSize: 25,
    logoBorderRadius: 8,
    frame: null,
    frameLabel: "SCAN ME",
    frameLabelFont: "Arial",
    frameLabelSize: 100,
    frameLabelColor: "#000000",
    frameColor: null,
    bgImage: null,
    errorCorrection: "H",
    quietZone: 4,
    outputFormat: "PNG",
    qrSize: 300,
    // result
    qrSvg: "",
    loading: false,
    error: "",
}

export function QRProvider({ children }) {
    const [state, setState] = useState(DEFAULT_STATE)
    const stateRef = useRef(state)
    stateRef.current = state
    const debounceRef = useRef(null)

    const update = useCallback((updates) => {
        setState(prev => ({ ...prev, ...updates }))
    }, [])

    // ── Core generate — reads from stateRef so it never goes stale ──────────
    const generateQR = useCallback(async () => {
        const s = stateRef.current
        const hasContent = s.content.trim() || s.vcardName.trim() || s.wifiSSID.trim()
        if (!hasContent) return

        setState(prev => ({ ...prev, loading: true, error: "" }))

        try {
            let data = s.content.trim()

            if (s.qrType === "vcard") {
                data = `BEGIN:VCARD\nVERSION:3.0\nFN:${s.vcardName}\nEMAIL:${s.vcardEmail}\nTEL:${s.vcardPhone}\nORG:${s.vcardOrg}\nEND:VCARD`
            } else if (s.qrType === "email") {
                data = `mailto:${s.content}`
            } else if (s.qrType === "phone") {
                data = `tel:${s.content}`
            } else if (s.qrType === "sms") {
                data = `sms:${s.content}`
            } else if (s.qrType === "whatsapp") {
                data = `https://wa.me/${s.content.replace(/\D/g, "")}`
            } else if (s.qrType === "wifi") {
                data = `WIFI:T:${s.wifiEncryption};S:${s.wifiSSID};P:${s.wifiPassword};;`
            }

            const payload = {
                data,
                type: s.qrType,
                fill_color: s.fgColor,
                back_color: s.bgColor,
                gradient_color: s.gradient ? s.gradientColor : null,
                gradient_direction: s.gradientDirection || "horizontal",
                logo: s.logo || null,
                logo_size: s.logoSize,
                frame: s.frame || null,
                frame_label: s.frameLabel || "SCAN ME",
                frame_label_font: s.frameLabelFont || "Arial",
                frame_label_color: s.frameLabelColor || "#000000",
                frame_color: s.frameColor || null,
                qr_size: s.qrSize,
                pattern: s.pattern || "squares",
                error_correction: s.errorCorrection || "H",
                quiet_zone: s.quietZone,
            }

            const res = await fetch(`${API_URL}/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                const msg = await res.text()
                throw new Error(msg || `Server error ${res.status}`)
            }

            const svg = await res.text()

            if (!svg || svg.length < 50) {
                throw new Error("Empty or invalid SVG returned from backend")
            }

            setState(prev => ({
                ...prev,
                qrSvg: svg,
                loading: false,
                error: ""
            }))
        } catch (err) {
            setState(prev => ({ ...prev, error: err.message || "Network error", loading: false }))
        }
    }, []) // intentionally empty — reads from stateRef

    // ── Auto-regen on any state change ──────────────────────────────────────
    useEffect(() => {
        const hasContent = state.content?.trim() || state.vcardName?.trim() || state.wifiSSID?.trim()
        if (!hasContent) return

        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(generateQR, 450)

        return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
    }, [
        state.content, state.vcardName, state.vcardEmail, state.vcardPhone, state.vcardOrg,
        state.wifiSSID, state.wifiPassword, state.wifiEncryption, state.qrType,
        state.fgColor, state.bgColor, state.gradient, state.gradientColor, state.gradientDirection,
        state.pattern, state.logo, state.logoSize,
        state.frame, state.frameLabel, state.frameLabelFont, state.frameLabelColor, state.frameColor,
        state.errorCorrection, state.quietZone, state.qrSize,
        generateQR
    ])

    // ── Apply a template preset ──────────────────────────────────────────────
    const applyTemplate = useCallback((tpl) => {
        update({
            fgColor: tpl.fgColor || "#000000",
            bgColor: tpl.bgColor || "#ffffff",
            pattern: tpl.pattern || "squares",
            frame: tpl.frame ?? null,
            frameLabel: tpl.label || "SCAN ME",
            frameLabelColor: tpl.frameLabelColor || "#000000",
            gradient: Boolean(tpl.gradientColor),
            gradientColor: tpl.gradientColor || "#6366f1",
        })
    }, [update])

    // ── Download ─────────────────────────────────────────────────────────────
    const downloadQR = useCallback((format = "svg") => {
        const { qrSvg, qrSize } = stateRef.current
        if (!qrSvg) return

        if (format === "svg") {
            const blob = new Blob([qrSvg], { type: "image/svg+xml" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url; a.download = "qrcode.svg"; a.click()
            URL.revokeObjectURL(url)
        } else {
            const svgBlob = new Blob([qrSvg], { type: "image/svg+xml;charset=utf-8" })
            const url = URL.createObjectURL(svgBlob)
            const img = new Image()
            img.onload = () => {
                const canvas = document.createElement("canvas")
                canvas.width = qrSize + 60
                canvas.height = qrSize + 60
                canvas.getContext("2d").drawImage(img, 0, 0)
                URL.revokeObjectURL(url)
                const a = document.createElement("a")
                a.href = canvas.toDataURL("image/png")
                a.download = "qrcode.png"; a.click()
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
