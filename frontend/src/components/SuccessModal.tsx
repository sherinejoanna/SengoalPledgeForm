import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, XCircle } from 'lucide-react'

interface SuccessModalProps {
  isOpen: boolean
  status?: 'success' | 'error'
  errorMessage?: string
  onClose?: () => void
}

export default function SuccessModal({ isOpen, status = 'success', errorMessage, onClose }: SuccessModalProps) {
  const isSuccess = status === 'success'

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
            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${
              isSuccess 
                ? 'from-gold-dark via-gold to-sage' 
                : 'from-red-600 via-rose-500 to-orange-500'
            }`} />
            <div className={`absolute -top-16 -right-16 w-48 h-48 ${
              isSuccess ? 'bg-sage/10' : 'bg-red-500/10'
            } rounded-full blur-3xl`} />
            <div className={`absolute -bottom-16 -left-16 w-48 h-48 ${
              isSuccess ? 'bg-gold/10' : 'bg-orange-500/10'
            } rounded-full blur-3xl`} />

            {/* Checkmark / X icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 20 }}
                  className={`w-20 h-20 ${
                    isSuccess 
                      ? 'bg-gradient-to-br from-forest-600 to-forest-800 shadow-glow-green' 
                      : 'bg-gradient-to-br from-red-600 to-rose-700'
                  } rounded-full flex items-center justify-center`}
                  style={{
                    boxShadow: !isSuccess ? '0 0 30px rgba(220, 38, 38, 0.4)' : undefined
                  }}
                >
                  {isSuccess ? (
                    <CheckCircle2 className="w-10 h-10 text-gold" />
                  ) : (
                    <XCircle className="w-10 h-10 text-white" />
                  )}
                </motion.div>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ delay: 0.4, duration: 1, repeat: Infinity }}
                  className={`absolute inset-0 rounded-full border-2 ${
                    isSuccess ? 'border-gold/40' : 'border-red-500/40'
                  }`}
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
                {isSuccess ? 'Thank you for showing interest!' : 'Submission Failed'}
              </h2>
              <p className="text-forest-600 text-sm leading-relaxed mb-6">
                {isSuccess 
                  ? "We'll reach out to you regarding our first roll-out as soon as possible."
                  : "We encountered an issue saving your pledge. Please check your internet connection or try again."
                }
              </p>

              {/* Highlights or Error message details */}
              {isSuccess ? (
                <div className="bg-cream rounded-2xl p-4 mb-6 text-left">
                  <div className="flex flex-col gap-2">
                    {[`Pledge confirmed ✓`, `Collection team notified ✓`, `You'll earn ₹70/litre ✓`].map((item) => (
                      <div key={item} className="text-sm font-medium text-forest-700">{item}</div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-6 text-left">
                  <span className="text-xs font-bold text-red-800 uppercase block mb-1">Error Details</span>
                  <div className="font-mono text-xs text-red-600 break-words max-h-24 overflow-y-auto no-scrollbar">
                    {errorMessage || 'Database connection error or network failure.'}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3">
                {isSuccess ? (
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
                ) : (
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full bg-red-600 text-white font-bold py-3 rounded-full shadow-lg hover:bg-red-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    Go Back & Try Again
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
