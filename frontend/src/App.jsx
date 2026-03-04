import { QRProvider } from "./QRContext"
import Header from "./components/Header"
import Hero from "./components/sections/Hero"

export default function App() {
  return (
    <QRProvider>
      <div className="min-h-screen bg-darkbg text-white overflow-x-hidden">
        <Header />
        <main>
          <Hero />
        </main>
      </div>
    </QRProvider>
  )
}