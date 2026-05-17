import { motion } from 'framer-motion'
import { Recycle, ArrowRight } from 'lucide-react'

// ── Eco Particles ──────────────────────────────────────────────────────────────
const particles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  size: Math.random() * 8 + 4,
  duration: Math.random() * 4 + 4,
  delay: Math.random() * 5,
  opacity: Math.random() * 0.4 + 0.1,
}))

export default function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden hero-bg bg-forest-900"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-32 w-64 h-64 md:w-96 md:h-96 bg-sage/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 -right-32 w-64 h-64 md:w-96 md:h-96 bg-gold/15 rounded-full blur-3xl"
        />
      </div>

      {/* Eco particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-sage/60"
            style={{
              left: `${p.x}%`,
              bottom: '-20px',
              width: p.size,
              height: p.size,
              opacity: p.opacity,
            }}
            animate={{ y: [0, -window.innerHeight - 50], opacity: [p.opacity, 0] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full z-10 flex flex-col items-center justify-center h-full">
        {/* Centered — Text */}
        <div className="text-center flex flex-col items-center justify-center max-h-full">
          <motion.img
            src="/logo.png"
            alt="Sengoal Logo"
            className="h-14 sm:h-16 md:h-20 lg:h-24 mb-6 sm:mb-8 lg:mb-10 object-contain drop-shadow-2xl rounded-full border-[1.5px] border-forest-800 bg-[#f4f3ef] px-3 sm:px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 mb-4 sm:mb-6 backdrop-blur-md"
          >
            <Recycle className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
            <span className="text-gold text-xs sm:text-sm font-semibold tracking-wide uppercase">First Step Towards a Circular Economy</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] sm:leading-[1.05] mb-4 sm:mb-6"
          >
            Your Used Cooking Oil Can
            <span className="block text-gradient-gold mt-1">Power a Greener Future</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-white/70 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mb-8 sm:mb-10"
          >
            Join Sengoal's sustainable used cooking oil initiative.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={onStart}
              className="group flex items-center justify-center gap-2 sm:gap-3 bg-gold-dark text-forest-900 font-extrabold px-8 py-4 sm:px-10 sm:py-5 rounded-full shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-base sm:text-lg"
            >
              Take The Pledge
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
