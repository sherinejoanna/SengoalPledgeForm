import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import {
  Droplets, ShieldCheck, Leaf, Recycle, CheckCircle2,
  Loader2, Info,
  Wifi, Truck
} from 'lucide-react'
import SignaturePad from './SignaturePad'
import type { SignaturePadRef } from './SignaturePad'
import SuccessModal from './SuccessModal'

// ── Types ──────────────────────────────────────────────────────────────────────
interface FormData {
  fullName: string
  mobile: string
  email: string
  address: string
  pinCode: string
  oilType: string
  monthlyQty: string
  incentiveConsent: boolean
  voluntaryConsent: boolean
  signatureName: string
  pledgeDate: string
  agreeStore: boolean
  agreeHandOver: boolean
  agreeAvoidPouring: boolean
  agreeSupport: boolean
}

// ── Pledge items ───────────────────────────────────────────────────────────────
const pledgeItems = [
  { id: 'agreeStore', icon: Droplets, text: 'Store used cooking oil separately in a clean, sealed container' },
  { id: 'agreeHandOver', icon: ShieldCheck, text: 'Hand it over to our authorized collection team' },
  { id: 'agreeAvoidPouring', icon: Recycle, text: 'Avoid pouring used oil into drains, soil, or regular bins' },
  { id: 'agreeSupport', icon: Leaf, text: 'Support responsible, eco-friendly recycling' },
] as const

// ── Main Component ─────────────────────────────────────────────────────────────
export default function PledgeForm() {
  const today = new Date().toISOString().split('T')[0]
  const sigPadRef = useRef<SignaturePadRef>(null)
  const [savedSignature, setSavedSignature] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sigError, setSigError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      pledgeDate: today,
      oilType: '',
      monthlyQty: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    if (!savedSignature) {
      setSigError(true)
      return
    }
    setSigError(false)
    setIsSubmitting(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://sengoalpledgeform.onrender.com/api'
      const response = await fetch(`${apiUrl}/pledges`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: data.fullName,
          mobile: data.mobile,
          email: data.email || undefined,
          address: data.address,
          pinCode: data.pinCode,
          oilType: data.oilType || undefined,
          monthlyQty: data.monthlyQty,
          signature: savedSignature,
          signatureName: data.signatureName || undefined,
          pledgeDate: data.pledgeDate,
        }),
      })

      const resData = await response.json()
      if (!response.ok) {
        throw new Error(resData.message || 'Failed to submit pledge')
      }

      setIsSubmitting(false)
      setShowSuccess(true)
      console.log('Form submitted successfully:', resData)
    } catch (err: any) {
      setIsSubmitting(false)
      alert(err.message || 'An error occurred while submitting the pledge. Please try again.')
      console.error('Submission error:', err)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="min-h-screen bg-cream pb-32"
    >
      {/* Page Header */}
      <div className="bg-forest-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/8 rounded-full blur-3xl" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-sage/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <img src="/logo.png" alt="Sengoal Logo" className="h-16 md:h-20 mb-8 object-contain drop-shadow-2xl rounded-full border-[1.5px] border-forest-800 bg-[#f4f3ef] px-3" />
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-5">
              <Recycle className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-semibold uppercase">Circular Economy Initiative</span>
            </div>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-3 leading-tight">
              Household UCO Collection
              <span className="text-gradient-gold block pb-2">Pledge</span>
            </h1>
            <p className="text-white/60 text-base md:text-lg mb-2">
              Join the Sustainable Used Cooking Oil Initiative
            </p>
            <p className="text-white/50 text-sm max-w-xl mx-auto leading-relaxed">
              Your used cooking oil doesn't have to go to waste, it can be recycled into sustainable aviation fuel, reducing pollution and powering a cleaner future.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 -mt-8 relative z-10">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          {/* ── I/We Agree To ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-white rounded-3xl shadow-card border border-forest-100 p-6 md:p-8 mb-8"
          >
            <h2 className="font-display font-bold text-xl text-forest-800 mb-1">I / We Agree To</h2>
            <p className="text-forest-500 text-sm mb-5">By submitting this form, you commit to the following:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {pledgeItems.map((item) => (
                <motion.label
                  key={item.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-3 bg-cream rounded-2xl p-4 border border-forest-100 hover:border-sage/60 hover:shadow-glow-sage transition-all duration-200 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    {...register(item.id, { required: 'Required' })}
                    className="w-5 h-5 accent-forest-700 mt-2 flex-shrink-0 cursor-pointer"
                  />
                  <div className="w-9 h-9 bg-forest-800 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                    <item.icon className="w-4 h-4 text-gold" />
                  </div>
                  <p className="text-forest-700 text-sm font-medium leading-relaxed group-hover:text-forest-900">{item.text}</p>
                </motion.label>
              ))}
            </div>
            {(errors.agreeStore || errors.agreeHandOver || errors.agreeAvoidPouring || errors.agreeSupport) && (
              <p className="text-red-500 text-xs mt-3">Please check all agreements to proceed.</p>
            )}
          </motion.div>

          {/* ── Participant Details ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-white rounded-3xl shadow-card border border-forest-100 p-6 md:p-8 mb-8"
          >
            <h2 className="font-display font-bold text-xl text-forest-800 mb-6">Participant Details</h2>
            <div className="grid sm:grid-cols-2 gap-5">

              {/* Full Name */}
              <div className="form-group">
                <label className="label-field">Full Name <span className="text-red-500">*</span></label>
                <input
                  {...register('fullName', { required: 'Full name is required' })}
                  placeholder="Enter your full name"
                  className={`input-field ${errors.fullName ? 'border-red-400' : ''}`}
                />
                {errors.fullName && <span className="text-red-500 text-xs mt-1">{errors.fullName.message}</span>}
              </div>

              {/* Mobile */}
              <div className="form-group">
                <label className="label-field">Mobile Number <span className="text-red-500">*</span></label>
                <input
                  {...register('mobile', {
                    required: 'Mobile number is required',
                    pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit mobile number' },
                  })}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className={`input-field ${errors.mobile ? 'border-red-400' : ''}`}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
                  }}
                />
                {errors.mobile && <span className="text-red-500 text-xs mt-1">{errors.mobile.message}</span>}
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="label-field">Email ID <span className="text-forest-400 font-normal">(Optional)</span></label>
                <input
                  {...register('email', {
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
                  })}
                  placeholder="your@email.com"
                  type="email"
                  className={`input-field ${errors.email ? 'border-red-400' : ''}`}
                />
                {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
              </div>

              {/* PIN Code */}
              <div className="form-group">
                <label className="label-field">PIN Code <span className="text-red-500">*</span></label>
                <input
                  {...register('pinCode', {
                    required: 'PIN code is required',
                    pattern: { value: /^\d{6}$/, message: 'Enter a valid 6-digit PIN code' },
                  })}
                  placeholder="6-digit PIN code"
                  maxLength={6}
                  className={`input-field ${errors.pinCode ? 'border-red-400' : ''}`}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
                  }}
                />
                {errors.pinCode && <span className="text-red-500 text-xs mt-1">{errors.pinCode.message}</span>}
              </div>

              {/* Address */}
              <div className="form-group sm:col-span-2">
                <label className="label-field">Address / Area <span className="text-red-500">*</span></label>
                <textarea
                  {...register('address', { required: 'Address is required' })}
                  placeholder="House No., Street, Area, City"
                  rows={2}
                  className={`input-field resize-none ${errors.address ? 'border-red-400' : ''}`}
                />
                {errors.address && <span className="text-red-500 text-xs mt-1">{errors.address.message}</span>}
              </div>

              {/* Oil Type */}
              <div className="form-group">
                <label className="label-field">Type of Oil Used <span className="text-forest-400 font-normal">(Optional)</span></label>
                <select {...register('oilType')} className="input-field bg-white appearance-none cursor-pointer">
                  <option value="">Select oil type</option>
                  {['Palm', 'Sunflower', 'Groundnut', 'Mixed', 'Other'].map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              {/* Monthly Qty */}
              <div className="form-group">
                <label className="label-field">Monthly UCO Quantity (approx.) <span className="text-red-500">*</span></label>
                <select
                  {...register('monthlyQty', { required: 'Please select a quantity' })}
                  className={`input-field bg-white appearance-none cursor-pointer ${errors.monthlyQty ? 'border-red-400' : ''}`}
                >
                  <option value="">Select quantity</option>
                  {['< 1L', '1–3L', '3–5L', '5L+'].map(q => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
                {errors.monthlyQty && <span className="text-red-500 text-xs mt-1">{errors.monthlyQty.message}</span>}
              </div>
            </div>
          </motion.div>

          {/* ── How Collection Works ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="bg-white rounded-3xl shadow-card border border-forest-100 p-6 md:p-8 mb-8"
          >
            <h2 className="font-display font-bold text-xl text-forest-800 mb-2">How Collection Works</h2>
            <p className="text-forest-500 text-sm mb-6 md:mb-10">Our smart IoT-enabled collection system monitors when your used cooking oil container is nearly full.</p>

            <div className="grid md:grid-cols-3 gap-8 md:gap-6 relative">
              {/* Connecting line (desktop only) */}
              <div className="hidden md:block absolute top-8 left-16 right-16 h-0.5 bg-forest-100 z-0" />

              <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-cream border-2 border-forest-100 flex items-center justify-center mb-4 group-hover:border-sage/60 group-hover:shadow-glow-sage transition-all duration-300 group-hover:-translate-y-1">
                  <Droplets className="w-7 h-7 text-forest-700 group-hover:text-gold transition-colors" />
                </div>
                <h3 className="font-bold text-forest-800 mb-2 text-sm">1. Store Used Oil</h3>
                <p className="text-forest-500 text-xs leading-relaxed max-w-[200px]">Pour your used cooking oil into the provided collection bottle.</p>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-cream border-2 border-forest-100 flex items-center justify-center mb-4 group-hover:border-sage/60 group-hover:shadow-glow-sage transition-all duration-300 group-hover:-translate-y-1">
                  <Wifi className="w-7 h-7 text-forest-700 group-hover:text-gold transition-colors" />
                </div>
                <h3 className="font-bold text-forest-800 mb-2 text-sm">2. Smart Fill Detection</h3>
                <p className="text-forest-500 text-xs leading-relaxed max-w-[200px]">Our IoT sensor detects when the bottle reaches around 90% capacity.</p>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-cream border-2 border-forest-100 flex items-center justify-center mb-4 group-hover:border-sage/60 group-hover:shadow-glow-sage transition-all duration-300 group-hover:-translate-y-1">
                  <Truck className="w-7 h-7 text-forest-700 group-hover:text-gold transition-colors" />
                </div>
                <h3 className="font-bold text-forest-800 mb-2 text-sm">3. Pickup Confirmation</h3>
                <p className="text-forest-500 text-xs leading-relaxed max-w-[200px]">You’ll receive a confirmation request, and once approved, our team will collect the oil from your location.</p>
              </div>
            </div>
          </motion.div>

          {/* ── Incentive Section ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-gradient-to-br from-gold/10 to-gold/5 border-2 border-gold/30 rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden glow-border"
          >
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gold/10 rounded-full blur-2xl" />
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 bg-gold rounded-2xl flex items-center justify-center flex-shrink-0">
                <Info className="w-6 h-6 text-forest-900" />
              </div>
              <div>
                <h3 className="font-display font-bold text-forest-800 text-lg mb-1">Incentive Details</h3>
                <p className="text-forest-700 text-sm leading-relaxed">
                  <strong className="text-2xl font-black text-forest-800">₹70</strong>{' '}
                  per litre will be paid for eligible used cooking oil collected under this initiative.
                </p>
              </div>
            </div>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                {...register('incentiveConsent', { required: 'Please acknowledge the incentive terms' })}
                className="w-5 h-5 accent-forest-700 mt-0.5 flex-shrink-0 cursor-pointer"
              />
              <span className="text-sm font-medium text-forest-700 leading-relaxed group-hover:text-forest-900">
                I/We understand that ₹70 per litre will be paid for eligible used cooking oil collected under this initiative.
              </span>
            </label>
            {errors.incentiveConsent && (
              <p className="text-red-500 text-xs mt-2 ml-8">{errors.incentiveConsent.message}</p>
            )}
          </motion.div>

          {/* ── Consent & Declaration ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="bg-white rounded-3xl shadow-card border border-forest-100 p-6 md:p-8 mb-8"
          >
            <h2 className="font-display font-bold text-xl text-forest-800 mb-5">Consent & Declaration</h2>
            <label className="flex items-start gap-3 cursor-pointer group bg-forest-50 rounded-2xl p-4 border border-forest-100 hover:border-forest-300 transition-colors">
              <input
                type="checkbox"
                {...register('voluntaryConsent', { required: 'Please provide your consent to proceed' })}
                className="w-5 h-5 accent-forest-700 mt-0.5 flex-shrink-0 cursor-pointer"
              />
              <span className="text-sm font-medium text-forest-700 leading-relaxed group-hover:text-forest-900">
                I/We voluntarily agree to participate in this UCO collection initiative, confirm the details above are accurate, and consent to being contacted for collection scheduling and project updates.
              </span>
            </label>
            {errors.voluntaryConsent && (
              <p className="text-red-500 text-xs mt-2">{errors.voluntaryConsent.message}</p>
            )}
          </motion.div>

          {/* ── Signature Section ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="bg-white rounded-3xl shadow-card border border-forest-100 p-6 md:p-8 mb-8"
          >
            <h2 className="font-display font-bold text-xl text-forest-800 mb-2">Signature</h2>
            <p className="text-forest-500 text-sm mb-5">Draw your signature below using mouse or touch</p>

            <SignaturePad
              ref={sigPadRef}
              onSave={(dataUrl) => {
                setSavedSignature(dataUrl)
                setSigError(false)
              }}
              onEmptySave={() => {
                setSigError(true)
              }}
              onClear={() => {
                setSavedSignature(null)
                setSigError(true)
              }}
            />

            {sigError && !savedSignature && (
              <p className="text-red-500 text-xs mt-3 ml-1">Please provide and save your signature to proceed.</p>
            )}

            {savedSignature && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-center gap-2 text-sm text-forest-600"
              >
                <CheckCircle2 className="w-4 h-4 text-leaf" />
                Signature saved successfully
              </motion.div>
            )}

            <div className="grid sm:grid-cols-2 gap-5 mt-6">
              <div className="form-group sm:col-span-2">
                <label className="label-field">Name (as signed)</label>
                <input
                  {...register('signatureName')}
                  placeholder="Type your name"
                  className="input-field"
                />
              </div>
            </div>
          </motion.div>

          {/* ── Submit Button ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3
                ${isSubmitting
                  ? 'bg-forest-300 text-white cursor-not-allowed'
                  : 'bg-forest-800 text-white shadow-lg hover:-translate-y-1 hover:shadow-xl'
                }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting Your Pledge...
                </>
              ) : (
                <>
                  Submit My Pledge
                </>
              )}
            </button>

            <p className="text-center text-forest-400 text-xs mt-4">
              By submitting, you agree to our Privacy Policy and Terms of Service.
            </p>
          </motion.div>
        </form>
      </div>

      {/* Success Modal */}
      <SuccessModal isOpen={showSuccess} />
    </motion.div>
  )
}
