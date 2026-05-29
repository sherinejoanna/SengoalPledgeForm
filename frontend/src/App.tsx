import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import IntroScreen from './components/IntroScreen'
import PledgeForm from './components/PledgeForm'

export default function App() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen font-sans bg-forest-900 overflow-hidden">
      <AnimatePresence mode="wait">
        {!showForm ? (
          <IntroScreen key="intro" onStart={() => setShowForm(true)} />
        ) : (
          <PledgeForm key="form" />
        )}
      </AnimatePresence>
    </div>
  )
}
