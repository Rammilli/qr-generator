import Header from "./components/Header"
import Builder from "./components/Builder"

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="max-w-6xl mx-auto mt-10 px-4 pb-12">
        <h1 className="text-center text-3xl md:text-4xl font-bold mb-2">
          Your professional all-in-one QR Code solution
        </h1>
        <p className="text-center text-sm text-slate-500 mb-8">
          Create beautiful, high-quality QR codes with logos, colors and frames
          – ready for print or digital use.
        </p>

        <Builder />
      </main>
    </div>
  )
}