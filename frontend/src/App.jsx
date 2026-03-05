import { QRProvider } from "./QRContext"
import QREditor from "./components/editor/QREditor"
import QRPreview from "./components/editor/QRPreview"

export default function App() {
  return (
    <QRProvider>
      <div className="min-h-screen bg-slate-100 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">
            Professional QR Code Generator
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Create beautiful QR codes with logos, colors and frames
          </p>

          <div className="grid lg:grid-cols-[1fr_300px] gap-8 bg-white rounded-2xl shadow-lg p-6">
            <QREditor />
            <QRPreview />
          </div>
        </div>
      </div>
    </QRProvider>
  )
}