import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Eraser, Save } from 'lucide-react'

export interface SignaturePadRef {
  clear: () => void
  getDataURL: () => string
  isEmpty: () => boolean
}

interface SignaturePadProps {
  onSave?: (dataUrl: string) => void
  onEmptySave?: () => void
  onClear?: () => void
}

const SignaturePad = forwardRef<SignaturePadRef, SignaturePadProps>(({ onSave, onEmptySave, onClear }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawing = useRef(false)
  const lastPoint = useRef<{ x: number; y: number } | null>(null)
  const hasDrawn = useRef(false)

  useImperativeHandle(ref, () => ({
    clear: () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      ctx?.clearRect(0, 0, canvas.width, canvas.height)
      hasDrawn.current = false
    },
    getDataURL: () => canvasRef.current?.toDataURL('image/png') || '',
    isEmpty: () => !hasDrawn.current,
  }))

  const getPoint = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const rect = canvas.getBoundingClientRect()

    if ('touches' in e) {
      const touch = e.touches[0]
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      }
    }
    return {
      x: (e as MouseEvent).clientX - rect.left,
      y: (e as MouseEvent).clientY - rect.top,
    }
  }

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    isDrawing.current = true
    const point = getPoint(e)
    lastPoint.current = point
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    if (!isDrawing.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const point = getPoint(e)
    if (!point || !lastPoint.current) return

    ctx.beginPath()
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y)
    ctx.lineTo(point.x, point.y)
    ctx.strokeStyle = '#063D2F'
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()

    hasDrawn.current = true
    lastPoint.current = point
  }

  const stopDrawing = () => {
    isDrawing.current = false
    lastPoint.current = null
  }

  const handleClear = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx?.clearRect(0, 0, canvas.width, canvas.height)
    hasDrawn.current = false
    onClear?.()
  }

  const handleSave = () => {
    const canvas = canvasRef.current
    if (!canvas || !hasDrawn.current) {
      onEmptySave?.()
      return
    }
    const dataUrl = canvas.toDataURL('image/png')
    onSave?.(dataUrl)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.scale(dpr, dpr)
  }, [])

  return (
    <div className="flex flex-col gap-3">
      <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-forest-200 hover:border-gold/60 transition-colors duration-300 bg-white">
        <canvas
          ref={canvasRef}
          className="w-full h-40 cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 select-none">
          <span className="text-forest-400 text-sm font-medium">Sign here</span>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleClear}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-forest-200 text-forest-700 hover:border-red-300 hover:text-red-600 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <Eraser className="w-4 h-4" />
          Clear
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-800 text-white hover:bg-forest-700 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <Save className="w-4 h-4" />
          Save Signature
        </button>
      </div>
    </div>
  )
})

SignaturePad.displayName = 'SignaturePad'
export default SignaturePad
