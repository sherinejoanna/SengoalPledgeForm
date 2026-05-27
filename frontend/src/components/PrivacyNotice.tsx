import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface PrivacyNoticeProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  register: any
  error?: any
}

export default function PrivacyNotice({ isOpen, setIsOpen, register, error }: PrivacyNoticeProps) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.05, duration: 0.5 }}
      className="bg-white rounded-3xl shadow-card border border-forest-100 mb-8 overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 md:p-8 text-left bg-forest-50/50 hover:bg-forest-50 transition-colors"
      >
        <h2 className="font-display font-bold text-lg text-forest-800">Consent & Privacy Notice</h2>
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-forest-100">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-forest-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-forest-600" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-6 md:px-8 md:pb-8"
          >
            <div className="pt-4 border-t border-forest-100 max-h-96 overflow-y-auto prose prose-sm prose-forest text-xs text-forest-600 leading-relaxed pr-2 custom-scrollbar">
              <div className="font-bold text-forest-900 text-sm mb-2 tracking-wide uppercase">
                SEYON ENERGY
              </div>
              <div className="font-bold text-forest-800 text-sm mb-4">
                Pledge Programme — Consent & Privacy Notice
                <span className="block text-[10px] font-normal text-forest-500 normal-case mt-0.5">
                  Version 1.0 &middot; April 2026 &middot; Prepared by Catalyst Automation Labs
                </span>
              </div>

              {/* Metadata Table */}
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border-collapse border border-forest-100 rounded-xl overflow-hidden text-left">
                  <tbody>
                    <tr className="border-b border-forest-100">
                      <td className="px-4 py-2 bg-forest-50/50 font-semibold w-1/3 text-forest-800 border-r border-forest-100">Document</td>
                      <td className="px-4 py-2 text-forest-700">Pledge Form Consent & Privacy Notice</td>
                    </tr>
                    <tr className="border-b border-forest-100">
                      <td className="px-4 py-2 bg-forest-50/50 font-semibold w-1/3 text-forest-800 border-r border-forest-100">Applies to</td>
                      <td className="px-4 py-2 text-forest-700">All users submitting the Seyon Energy household UCO pledge form</td>
                    </tr>
                    <tr className="border-b border-forest-100">
                      <td className="px-4 py-2 bg-forest-50/50 font-semibold w-1/3 text-forest-800 border-r border-forest-100">Legal basis</td>
                      <td className="px-4 py-2 text-forest-700">Digital Personal Data Protection Act (DPDP), India, 2023</td>
                    </tr>
                    <tr className="border-b border-forest-100">
                      <td className="px-4 py-2 bg-forest-50/50 font-semibold w-1/3 text-forest-800 border-r border-forest-100">Data owner</td>
                      <td className="px-4 py-2 text-forest-700">Seyon Energy / Sengoal — Anekal, Bangalore</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 bg-forest-50/50 font-semibold w-1/3 text-forest-800 border-r border-forest-100">Contact</td>
                      <td className="px-4 py-2 text-forest-700">privacy@seyonenergy.in</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Section 1 */}
              <h3 className="font-bold text-forest-800 mt-6 mb-2">1. Who We Are</h3>
              <p className="mb-4">
                Seyon Energy (operating under Sengoal) is a RUCO-licensed used cooking oil (UCO) collection and biodiesel production company based in Anekal, Bangalore, Karnataka. Our pledge programme invites households to commit to returning used cooking oil monthly in exchange for fresh cooking oil delivery and a monetary incentive of up to ₹70 per litre.
                <br />
                This notice explains what personal data we collect when you submit a pledge form, how we use it, and what rights you have under the Digital Personal Data Protection Act (DPDP), India, 2023.
              </p>

              {/* Section 2 */}
              <h3 className="font-bold text-forest-800 mt-6 mb-2">2. What Data We Collect</h3>
              <p className="mb-4">
                When you submit the Seyon Energy pledge form — whether online or via the offline QR code — we collect the following personal data:
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border-collapse border border-forest-100 text-[11px] text-left">
                  <thead>
                    <tr className="bg-forest-50/80 text-forest-800 text-left border-b border-forest-100 font-bold">
                      <th className="px-4 py-2 w-1/4 border-r border-forest-100">Data Field</th>
                      <th className="px-4 py-2 w-1/2 border-r border-forest-100">Why We Collect It</th>
                      <th className="px-4 py-2 w-1/4">Legal Basis</th>
                    </tr>
                  </thead>
                  <tbody className="text-forest-700 divide-y divide-forest-100">
                    <tr>
                      <td className="px-4 py-2 font-semibold border-r border-forest-100">Full Name</td>
                      <td className="px-4 py-2 border-r border-forest-100">To identify the pledging household and personalise communication</td>
                      <td className="px-4 py-2 text-forest-600">Consent (DPDP S.6)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold border-r border-forest-100">Residential Address</td>
                      <td className="px-4 py-2 border-r border-forest-100">To verify serviceability (within 15km of Anekal plant) and schedule UCO pickups</td>
                      <td className="px-4 py-2 text-forest-600">Consent + Contractual necessity</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold border-r border-forest-100">WhatsApp Number</td>
                      <td className="px-4 py-2 border-r border-forest-100">To send pickup notifications, campaign updates, and the ₹70/litre incentive alerts</td>
                      <td className="px-4 py-2 text-forest-600">Consent (DPDP S.6)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold border-r border-forest-100">Estimated Monthly UCO Volume (litres)</td>
                      <td className="px-4 py-2 border-r border-forest-100">To plan collection logistics and report aggregate supply data to investors</td>
                      <td className="px-4 py-2 text-forest-600">Consent</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold border-r border-forest-100">Preferred Cooking Oil Type</td>
                      <td className="px-4 py-2 border-r border-forest-100">To fulfil the fresh oil delivery component of the pledge exchange</td>
                      <td className="px-4 py-2 text-forest-600">Consent + Contractual necessity</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold border-r border-forest-100">Whether Fresh Oil Delivery is Requested</td>
                      <td className="px-4 py-2 border-r border-forest-100">To determine which households require the delivery service</td>
                      <td className="px-4 py-2 text-forest-600">Consent</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Section 3 */}
              <h3 className="font-bold text-forest-800 mt-6 mb-2">3. How We Use Your Data</h3>
              <p className="mb-2">We use your personal data only for the following purposes:</p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li><strong>Operations:</strong> To enrol you in the Seyon Energy UCO pledge programme and confirm your participation.</li>
                <li><strong>Logistics:</strong> To schedule UCO collection pickups from your home when your tin is full (triggered automatically via our IoT sensor system).</li>
                <li><strong>Communication:</strong> To send WhatsApp messages including pickup confirmations, programme updates, and health tips on safe cooking oil use.</li>
                <li><strong>Research & Reporting:</strong> To generate anonymised, aggregated statistics for investor reporting, grant applications, and academic research (e.g., &apos;97 families in Electronic City have pledged 340 litres/month&apos;). Your name and contact details are never included in these reports.</li>
                <li><strong>App Onboarding:</strong> To contact you about the Seyon App when it launches, and to offer you early access as a founding pledge family.</li>
              </ul>
              <p className="mb-2">We do <strong>NOT</strong> use your data for:</p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>Selling or sharing your information with advertisers or third-party marketing companies.</li>
                <li>Any purpose unrelated to the UCO pledge and fresh oil delivery programme.</li>
                <li>Automated decision-making that produces legal or significant effects on you.</li>
              </ul>

              {/* Section 4 */}
              <h3 className="font-bold text-forest-800 mt-6 mb-2">4. Who Has Access to Your Data</h3>
              <p className="mb-2">Access to pledge data is strictly limited to:</p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li><strong>Gopika &mdash; Pledge Drive Lead:</strong> manages in-person pledge collection and family follow-up.</li>
                <li><strong>Sherine &mdash; Technology Lead:</strong> maintains the backend database and Trello pledge tracker (Board 3).</li>
                <li><strong>Kaavya &mdash; Campaign Manager:</strong> reviews aggregate data for investor reporting.</li>
              </ul>
              <p className="mb-4">
                Your data is stored in a secured backend database (managed by Sherine) and mirrored to a private Trello board accessible only to named team members. No pledge data is publicly visible on the Seyon website or any public platform.
              </p>

              {/* Section 5 */}
              <h3 className="font-bold text-forest-800 mt-6 mb-2">5. How Long We Keep Your Data</h3>
              <p className="mb-4">
                We retain your personal data for as long as you are an active participant in the Seyon Energy pledge programme. If you withdraw your pledge or request deletion, your personally identifiable data will be removed within 30 days. Anonymised aggregate records (e.g., total litres pledged by zone) may be retained for research and reporting purposes after deletion.
              </p>

              {/* Section 6 */}
              <h3 className="font-bold text-forest-800 mt-6 mb-2">6. Your Rights Under DPDP 2023</h3>
              <p className="mb-4">
                Under the Digital Personal Data Protection Act (DPDP), India, 2023, you have the following rights:
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border-collapse border border-forest-100 text-[11px] text-left">
                  <thead>
                    <tr className="bg-forest-50/80 text-forest-800 text-left border-b border-forest-100 font-bold">
                      <th className="px-4 py-2 w-1/3 border-r border-forest-100">Right</th>
                      <th className="px-4 py-2 w-2/3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-forest-700 divide-y divide-forest-100">
                    <tr>
                      <td className="px-4 py-2 font-semibold border-r border-forest-100">Right to Access</td>
                      <td className="px-4 py-2">You may request a copy of all personal data Seyon Energy holds about you at any time.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold border-r border-forest-100">Right to Correction</td>
                      <td className="px-4 py-2">You may request correction of inaccurate or outdated personal data.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold border-r border-forest-100">Right to Erasure</td>
                      <td className="px-4 py-2">You may request deletion of your personal data. We will process this within 30 days.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold border-r border-forest-100">Right to Withdraw Consent</td>
                      <td className="px-4 py-2">You may withdraw your consent at any time by contacting us. Withdrawal does not affect the lawfulness of processing before withdrawal.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold border-r border-forest-100">Right to Grievance Redressal</td>
                      <td className="px-4 py-2">You may raise a complaint with our designated Data Protection Officer at privacy@seyonenergy.in. If unresolved, you may escalate to the Data Protection Board of India once constituted.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Section 7 */}
              <h3 className="font-bold text-forest-800 mt-6 mb-2">7. The Consent Checkbox &mdash; Exact Wording</h3>
              <p className="mb-2">
                The following text must appear verbatim on the pledge form, with a mandatory checkbox that must be ticked before submission is allowed:
              </p>
              <div className="bg-forest-50 border border-forest-100 rounded-2xl p-4 mb-4 text-forest-700 font-medium">
                <p className="mb-2">
                  <strong>[ ] I agree to Seyon Energy (Sengoal) collecting and storing my name, address, WhatsApp number, and estimated used cooking oil volume for the purpose of the UCO Pledge Programme. I understand that:</strong>
                </p>
                <ol className="list-decimal pl-5 space-y-1 mt-2 text-forest-600">
                  <li>My data will not be sold to third parties or used for advertising.</li>
                  <li>I can withdraw this consent and request deletion of my data at any time by contacting privacy@seyonenergy.in.</li>
                  <li>Anonymised aggregate data (e.g., total litres pledged) may be used in investor and research reports.</li>
                  <li>I have read and understood the full Consent & Privacy Notice at seyonenergy.in/privacy.</li>
                </ol>
                <p className="text-[10px] text-forest-400 mt-3 font-normal italic">
                  This checkbox must be unticked by default and cannot be pre-checked. Form submission must be blocked if this box is unchecked.
                </p>
              </div>

              {/* Section 8 */}
              <h3 className="font-bold text-forest-800 mt-6 mb-2">8. Data Security Measures</h3>
              <p className="mb-2">Seyon Energy implements the following technical and organisational measures to protect pledge data:</p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>All form submissions are transmitted over HTTPS (TLS 1.2 or higher).</li>
                <li>Pledge data is stored in a password-protected backend database accessible only to named team members.</li>
                <li>Trello Board 3 (Pledge Tracker) is set to private and accessible only to the Seyon team.</li>
                <li>No pledge data is stored in personal WhatsApp chats, personal email inboxes, or publicly shared Google Sheets.</li>
                <li>In the event of a data breach, affected individuals will be notified within 72 hours.</li>
              </ul>

              {/* Section 9 */}
              <h3 className="font-bold text-forest-800 mt-6 mb-2">9. Contact & Grievance Officer</h3>
              <p className="mb-4">For any questions, data access requests, or deletion requests, contact:</p>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border-collapse border border-forest-100 text-[11px] text-left">
                  <tbody>
                    <tr className="border-b border-forest-100">
                      <td className="px-4 py-2 bg-forest-50/50 font-semibold w-1/3 text-forest-800 border-r border-forest-100">Email</td>
                      <td className="px-4 py-2 font-mono text-forest-700">privacy@seyonenergy.in</td>
                    </tr>
                    <tr className="border-b border-forest-100">
                      <td className="px-4 py-2 bg-forest-50/50 font-semibold w-1/3 text-forest-800 border-r border-forest-100">Response time</td>
                      <td className="px-4 py-2 text-forest-700">Within 7 business days for access/correction requests; 30 days for deletion</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 bg-forest-50/50 font-semibold w-1/3 text-forest-800 border-r border-forest-100">Escalation</td>
                      <td className="px-4 py-2 text-forest-700">Data Protection Board of India (once constituted under DPDP 2023)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="text-[10px] text-forest-400 mt-8 text-center border-t border-forest-100 pt-4">
                This document was prepared by Catalyst Automation Labs for Seyon Energy. Version 1.0 &middot; April 2026.
              </div>
            </div>

            {/* Checkbox for Agreement (Outside scrollable text, but inside expanded accordion) */}
            <div className="mt-6 pt-4 border-t border-forest-100">
              <div className="p-4 bg-forest-50 rounded-2xl border border-forest-100">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    {...register('agreePrivacy', { required: 'You must agree to the Consent & Privacy Notice to proceed' })}
                    className="w-5 h-5 accent-forest-700 mt-0.5 flex-shrink-0 cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-forest-800 leading-relaxed group-hover:text-forest-900">
                    I have read and unconditionally agree to all the terms of the Consent & Privacy Notice.
                  </span>
                </label>
                {error && (
                  <p className="text-red-500 text-xs mt-2 font-semibold">{error.message}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
