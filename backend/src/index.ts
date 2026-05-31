import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import http from 'http'
import pledgeRoutes from './routes/pledge.routes'
import healthRoutes from './routes/health.routes'
import { errorHandler } from './middlewares/errorHandler'
import { prisma } from './prisma'

dotenv.config()

const app = express()

// Trust proxy if we are behind a reverse proxy like Render
app.set('trust proxy', 1)

// 1. Basic Security
app.use(helmet())

// 2. CORS setup
app.use(cors({
  origin: '*', // Allows all origins to prevent connection issues. For prod, restrict to specific domain if needed.
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// 3. Body Parsing
// Ensure we handle larger payloads since signature data URL can be somewhat large
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// 4. Logging
app.use(morgan('dev'))

// 5. Rate Limiting (Optimized for 1000+ records in 15 mins)
// 2000 requests per 15 minutes = ~2.2 requests per second allowed per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
})

// Apply the rate limiting middleware to API calls only
app.use('/api/', apiLimiter)

// 6. Routes
app.get('/', (_req, res) => {
  res.redirect('/health')
})
app.use('/health', healthRoutes) // root level health check
app.use('/api/health', healthRoutes) // /api prefixed health check
app.use('/api/pledges', pledgeRoutes)

// 7. Global Error Handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

// Test DB connection on startup before listening
async function startServer() {
  try {
    console.log('⏳ Testing database connection...')
    await prisma.$queryRaw`SELECT 1`
    console.log('✅ Database connection successful!')
  } catch (err: any) {
    console.error('❌ Database connection FAILED on startup:', err.message)
    console.error('   Check that DATABASE_URL env var is set correctly on Render.')
    // Don't crash — let the server start anyway so health check can report the error
  }

  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
    startSelfPing()
  })

  // Graceful shutdown handling to ensure no data loss during Render restarts
  const gracefulShutdown = () => {
    console.log('Received kill signal, shutting down gracefully')
    server.close(() => {
      console.log('Closed out remaining connections')
      process.exit(0)
    })

    // Force close after 10 seconds
    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down')
      process.exit(1)
    }, 10000)
  }

  process.on('SIGTERM', gracefulShutdown)
  process.on('SIGINT', gracefulShutdown)
}

startServer()

// -- Self-Pinging Mechanism for Render --
// Render free tier instances spin down after 15 mins of inactivity.
// This function pings the health endpoint every 5 minutes (300,000 ms) to keep it alive.
function startSelfPing() {
  const PING_INTERVAL = 5 * 60 * 1000 // 5 minutes
  // Fallback URL if env var is not set, assuming local or standard render structure
  const SERVER_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`

  setInterval(() => {
    http.get(`${SERVER_URL}/health`, (res) => {
      console.log(`[Self-Ping] Status: ${res.statusCode} at ${new Date().toISOString()}`)
    }).on('error', (err) => {
      console.error(`[Self-Ping] Error: ${err.message}`)
    })
  }, PING_INTERVAL)
}
