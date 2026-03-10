import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react"
import { API_URL } from "./config"
import { getPlatform, platformLogoDataUri } from "./data/platforms"

const QRContext = createContext(null)

export const QR_TYPES = [
    { id: "link", label: "Link", icon: "🔗", placeholder: "https://example.com" },
    { id: "text", label: "Text", icon: "📝", placeholder: "Enter your text here" },
    { id: "vcard", label: "vCard", icon: "👤", placeholder: "Full Name" },
    { id: "pdf", label: "PDF", icon: "📄", placeholder: "https://example.com/file.pdf" },
    { id: "phone", label: "Phone", icon: "📞", placeholder: "+1 234 567 8900" },
    { id: "email", label: "Email", icon: "✉️", placeholder: "email@example.com" },
    { id: "sms", label: "SMS", icon: "💬", placeholder: "+1 234 567 8900" },
    { id: "whatsapp", label: "WhatsApp", icon: "💚", placeholder: "+1 234 567 8900" },
    { id: "wifi", label: "WiFi", icon: "📶", placeholder: "Network name" },
    { id: "location", label: "Location", icon: "📍", placeholder: "40.7128" },
    { id: "event", label: "Event", icon: "📅", placeholder: "Event title" },
    { id: "app", label: "App", icon: "📱", placeholder: "App Store URL" },
    { id: "social", label: "Social", icon: "🌐", placeholder: "Select platform" },
]

const DEFAULT_STATE = {
    qrType: "link",
    content: "",
    platform: null,

    fgColor: "#000000",
    bgColor: "#ffffff",
    gradient: false,
    gradientColor: "#6366f1",
    gradientDirection: "horizontal",
    pattern: "squares",

    logo: null,
    logoSize: 18,

    frame: null,
    frameLabel: "SCAN ME",
    frameLabelColor: "#000000",
    frameColor: null,

    qrSvg: "",
    loading: false,
    error: "",

    templateId: null,
}

export function QRProvider({ children }) {
    const [state, setState] = useState(DEFAULT_STATE)
    const stateRef = useRef(state)
    stateRef.current = state

    const debounceRef = useRef(null)

    const update = useCallback((updates) => {
        setState(prev => ({ ...prev, ...updates }))
    }, [])

    const generateQR = useCallback(async () => {
        const s = stateRef.current
        if (!s.content.trim()) return

        setState(prev => ({ ...prev, loading: true, error: "" }))

        try {
            let finalLogo = s.logo;
            if (finalLogo && (finalLogo.startsWith("data:image/svg+xml") || finalLogo.startsWith("http"))) {
                try {
                    finalLogo = await new Promise((resolve, reject) => {
                        const img = new Image();
                        img.crossOrigin = "Anonymous";
                        img.onload = () => {
                            const canvas = document.createElement("canvas");
                            canvas.width = img.width || 512;
                            canvas.height = img.height || 512;
                            const ctx = canvas.getContext("2d");
                            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                            resolve(canvas.toDataURL("image/png"));
                        };
                        img.onerror = reject;
                        img.src = finalLogo;
                    });
                } catch (e) {
                    console.error("Failed to convert logo to PNG:", e);
                }
            }

            const payload = {
  data: s.content,
  type: s.qrType,
  fill_color: s.fgColor,
  back_color: s.bgColor,
  gradient_color: s.gradient ? s.gradientColor : null,
  gradient_direction: s.gradientDirection || "horizontal",
  logo: finalLogo,
  logo_size: s.logoSize,
  frame: s.frame,
  frame_label: s.frameLabel,
  frame_label_color: s.frameLabelColor,
  frame_color: s.frameColor,
  pattern: s.pattern,
}

            const res = await fetch(`${API_URL}/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            const svg = await res.text()

            setState(prev => ({
                ...prev,
                qrSvg: svg,
                loading: false,
            }))
        } catch (err) {
            setState(prev => ({
                ...prev,
                error: err.message,
                loading: false,
            }))
        }
    }, [])

    useEffect(() => {
        if (!state.content.trim()) return

        if (debounceRef.current) clearTimeout(debounceRef.current)

        debounceRef.current = setTimeout(generateQR, 300)

        return () => clearTimeout(debounceRef.current)
    }, [
        state.content,
        state.fgColor,
        state.bgColor,
        state.pattern,
        state.frame,
        state.frameLabel,
        state.frameLabelColor,
        state.frameColor,
        state.gradient,
        state.gradientColor,
        state.templateId,
        state.logo,
        state.logoSize,
        state.gradientDirection,
        generateQR
    ])

    const applyTemplate = useCallback((tpl) => {
        update({
            fgColor: tpl.fgColor || "#000000",
            bgColor: tpl.bgColor || "#ffffff",
            pattern: tpl.pattern || "squares",
            frame: tpl.frame ?? null,
            frameLabel: tpl.frameLabel || "SCAN ME",
            frameLabelColor: tpl.frameLabelColor || "#000000",
            gradient: tpl.gradient ?? false,
            gradientColor: tpl.gradientColor || "#6366f1",
            frameColor: tpl.frameColor || null,
            templateId: Date.now(),
        })
    }, [update])

    const applyPlatform = useCallback((platformId) => {
        const p = getPlatform(platformId)
        if (!p) return

        update({
            platform: platformId,
            logo: platformLogoDataUri(p),
            content: p.urlTemplate,
            ...p.templatePreset,
        })
    }, [update])

    return (
        <QRContext.Provider value={{ state, update, generateQR, applyTemplate, applyPlatform }}>
            {children}
        </QRContext.Provider>
    )
}

export function useQR() {
    return useContext(QRContext)
}