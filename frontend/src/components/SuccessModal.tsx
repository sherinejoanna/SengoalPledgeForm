import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

interface SuccessModalProps {
  isOpen: boolean
}

export default function SuccessModal({ isOpen }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-forest-900/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background decoration */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gold-dark via-gold to-sage" />
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-sage/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gold/10 rounded-full blur-3xl" />

            {/* Checkmark */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 20 }}
                  className="w-20 h-20 bg-gradient-to-br from-forest-600 to-forest-800 rounded-full flex items-center justify-center shadow-glow-green"
                >
                  <CheckCircle2 className="w-10 h-10 text-gold" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ delay: 0.4, duration: 1, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-gold/40"
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h2 className="font-display font-extrabold text-2xl text-forest-800 mb-3 leading-tight">
                Thank You For Joining The<br />
                <span className="text-gradient-gold">Circular Energy Movement</span>
              </h2>
              <p className="text-forest-600 text-sm leading-relaxed mb-6">
                Your pledge has been successfully submitted. Our team will contact you soon regarding collection scheduling.
              </p>

              {/* Highlights */}
              <div className="bg-cream rounded-2xl p-4 mb-6 text-left">
                <div className="flex flex-col gap-2">
                  {[`Pledge confirmed ✓`, `Collection team notified ✓`, `You'll earn ₹70/litre ✓`].map((item) => (
                    <div key={item} className="text-sm font-medium text-forest-700">{item}</div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    window.close();
                    document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#063D2F;color:white;font-family:sans-serif;text-align:center;padding:20px;"><h2>Thank you! You may now close this tab.</h2></div>';
                  }}
                  className="w-full bg-gold-dark text-forest-800 font-bold py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
