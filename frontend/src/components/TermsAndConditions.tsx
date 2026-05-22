import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function TermsAndConditions() {
  const [isOpen, setIsOpen] = useState(false)

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
        <h2 className="font-display font-bold text-lg text-forest-800">Terms and Conditions</h2>
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
              <p className="font-bold mb-4 uppercase">
                PLATFORM & SERVICES TERMS AND CONDITIONS
              </p>
              <p className="mb-4">
                <strong>IMPORTANT LEGAL NOTICE:</strong> PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE ACCESSING OR USING THE SEYON PLATFORM, SEYON APP, OR ANY OF SEYON ENERGY'S SERVICES. BY DOWNLOADING THE APP, REGISTERING AN ACCOUNT, SCHEDULING A COLLECTION, RECEIVING A DELIVERY, OR OTHERWISE USING THE PLATFORM IN ANY MANNER, YOU UNCONDITIONALLY AGREE TO BE LEGALLY BOUND BY THESE TERMS. IF YOU DO NOT AGREE, YOU MUST IMMEDIATELY CEASE USE OF ALL SEYON SERVICES.
              </p>
              <p className="mb-4">
                <strong>FOOD SAFETY & HEALTH NOTICE:</strong> Seyon Energy operates under a RUCO Licence issued by the Food Safety and Standards Authority of India (FSSAI) and is subject to the Food Safety and Standards Act, 2006 and regulations framed thereunder. The Deepam cooking oil supplied through the Platform is a foodgrade product. Users who have specific dietary, health, or medical requirements are advised to consult a qualified medical professional independently before making dietary decisions.
              </p>

              <h3 className="font-bold text-forest-800 mt-6 mb-2">1. DEFINITIONS AND INTERPRETATION</h3>
              <p className="mb-2"><strong>1.1</strong> In these Terms, unless the context otherwise requires, the following terms shall carry the meanings assigned below:</p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li><strong>"Agreement"</strong> means these Terms and Conditions together with the Privacy Policy, UCO Quality Standards Schedule, Deepam Oil Product Specifications, Delivery Policy, and all other documents incorporated herein by reference, as amended from time to time.</li>
                <li><strong>"Applicable Law"</strong> means all applicable central and state statutes, rules, regulations, notifications, orders, and guidelines, including without limitation the Food Safety and Standards Act, 2006; the Food Safety and Standards (Licensing and Registration of Food Businesses) Regulations, 2011; the Information Technology Act, 2000 (as amended); the Consumer Protection Act, 2019; the Environment Protection Act, 1986; the Indian Contract Act, 1872; the Petroleum and Minerals Pipelines (Acquisition of Right of User in Land) Act, 1962; the Biofuels Policy notified by the Ministry of Petroleum and Natural Gas; the Extended Producer Responsibility (EPR) Framework for Waste Oil (MoEFCC, May 2024); and the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.</li>
                <li><strong>"B2B User"</strong> means a hotel, restaurant, caterer, food processing unit, institutional kitchen, quick-service restaurant, or other commercial food business that registers on the Platform for bulk UCO collection services.</li>
                <li><strong>"B2C User"</strong> or <strong>"Household User"</strong> means an individual consumer who registers on the Platform to participate in the household UCO collection programme and/or to receive Deepam oil deliveries.</li>
                <li><strong>"Biodiesel"</strong> means fatty acid methyl ester (FAME)-based biodiesel produced by the Company from collected UCO through transesterification, conforming to BIS Standard IS 15607 and any other applicable standard.</li>
                <li><strong>"Collection Agent"</strong> means an employee, contractor, or franchise operator authorised by Seyon Energy to physically collect UCO from Users at the scheduled collection point.</li>
                <li><strong>"Company"</strong>, <strong>"Seyon"</strong>, <strong>"We"</strong>, <strong>"Us"</strong>, or <strong>"Our"</strong> refers to Seyon Energy, a business unit of Sengoal, with its primary operations at the Anekal Biodiesel Processing Plant, [Registered Office Address], Anekal, Bangalore, Karnataka, India.</li>
                <li><strong>"Deepam Oil"</strong> means the FSSAI-certified, lab-tested fresh cooking oil supplied by the Company through the Platform under the Seyon Deepam brand.</li>
                <li><strong>"EPR Framework"</strong> means the Extended Producer Responsibility Framework for Waste Oil notified by the Ministry of Environment, Forest and Climate Change in May 2024, which imposes obligations on bulk UCO generators regarding lawful disposal of used cooking oil.</li>
                <li><strong>"Free Fatty Acid Content"</strong> or <strong>"FFA"</strong> means the percentage of free fatty acids in a sample of UCO, as determined by titration or equivalent certified analytical method, which is the primary quality parameter used to assess UCO's suitability for biodiesel production.</li>
                <li><strong>"IoT Sensor"</strong> or <strong>"Smart Collection Sensor"</strong> means the electronic fill-level detection device developed and deployed by the Company that attaches to the Seyon collection container and transmits fill-level data to the Platform.</li>
                <li><strong>"OMC"</strong> means the Oil Marketing Companies of the Government of India — Indian Oil Corporation Limited (IOCL), Bharat Petroleum Corporation Limited (BPCL), and Hindustan Petroleum Corporation Limited (HPCL) — which are the designated government buyers of biodiesel under the National Biofuel Policy.</li>
                <li><strong>"Platform"</strong> means the Seyon Energy website at [www.seyonenergy.in], the Seyon App (available on Android and iOS), and any other digital interface, API, or channel through which the Company delivers its Services.</li>
                <li><strong>"RUCO Licence"</strong> means the licence issued by FSSAI under the Repurpose Used Cooking Oil (RUCO) programme, which authorises the Company to collect, transport, and process UCO for biofuel production.</li>
                <li><strong>"Scheduled Pickup"</strong> means a UCO collection appointment confirmed by the Company through the Platform.</li>
                <li><strong>"Services"</strong> means all services provided by Seyon through the Platform, including household UCO collection, B2B UCO collection, Deepam Oil delivery, IoT sensor deployment and monitoring, pledge programme participation, and biodiesel supply.</li>
                <li><strong>"Total Polar Compounds"</strong> or <strong>"TPC"</strong> means the analytical measure of degraded oil compounds in used cooking oil, the threshold for which is regulated by FSSAI and serves as the primary indicator of oil unsuitability for food use.</li>
                <li><strong>"UCO"</strong> means used cooking oil — cooking oil that has been previously used in food preparation by the User and is returned to the Company for conversion into biodiesel.</li>
                <li><strong>"UCO Payment"</strong> means the per-litre monetary consideration paid by the Company to eligible Users for accepted UCO, at such rate as published by the Company on the Platform from time to time.</li>
                <li><strong>"User"</strong>, <strong>"You"</strong>, or <strong>"Your"</strong> means any individual or entity — whether B2C, B2B, or institutional — that accesses or uses the Platform or Services.</li>
              </ul>
              <p className="mb-4"><strong>1.2</strong> Unless the context requires otherwise: references to a statute or regulation include that statute or regulation as amended from time to time; the singular includes the plural and vice versa; headings are for reference only and do not affect interpretation; and the word 'including' means 'including without limitation.'</p>

              <h3 className="font-bold text-forest-800 mt-6 mb-2">2. ELIGIBILITY AND CAPACITY TO CONTRACT</h3>
              <p className="mb-2"><strong>2.1</strong> The Platform is open to: (a) individual persons who are at least eighteen (18) years of age and legally competent to enter into contracts under the Indian Contract Act, 1872; and (b) duly incorporated or registered entities that have authorised a competent representative to accept these Terms on their behalf.</p>
              <p className="mb-2"><strong>2.2</strong> B2B Users additionally represent and warrant that: (a) they hold all required FSSAI licences and registrations applicable to their food business; (b) they are legally obligated under the EPR Framework to ensure lawful disposal of UCO generated in their premises; and (c) by engaging with the Company's RUCOlicensed collection service, they are fulfilling, and not abdicating, their own regulatory obligations under Applicable Law.</p>
              <p className="mb-4"><strong>2.3</strong> The Company reserves the right to verify the identity and eligibility of any User before confirming registration or permitting access to any Service. Submission of false or misleading information shall constitute a material breach of this Agreement.</p>

              <h3 className="font-bold text-forest-800 mt-6 mb-2">3. UCO COLLECTION SERVICES — HOUSEHOLD (B2C) USERS</h3>
              <p className="mb-2"><strong>3.1 Nature of the Service:</strong> The Company offers Household Users the facility to return UCO accumulated from domestic cooking activities. In consideration of each accepted delivery of UCO, the Company shall pay the User the applicable UCO Payment rate as published on the Platform at the time of the Scheduled Pickup. This service constitutes a purchase of UCO by the Company from the User; it does not constitute a waste disposal service, a public utility, or a municipal service.</p>
              <p className="mb-2"><strong>3.2 UCO Quality Standards and Acceptance Criteria:</strong> The Company shall only accept UCO that satisfies the following minimum quality criteria, as verified by the Collection Agent or by field testing at the time of collection:</p>
              <ul className="list-disc pl-5 mb-2 space-y-1">
                <li>The UCO shall be derived solely from the cooking of food items in a domestic kitchen. UCO containing industrial lubricants, mineral oils, non-food-grade substances, paint thinners, solvents, pesticides, water, or any adulterant whatsoever shall be unconditionally rejected.</li>
                <li>The UCO shall be collected and stored in a clean, sealed, food-grade container. UCO stored in open, uncleaned, or contaminated vessels shall be subject to rejection at the Company's discretion.</li>
                <li>The FFA content of the UCO shall not exceed twenty-five percent (25%). UCO with FFA exceeding this threshold may be accepted at a reduced UCO Payment rate or rejected, at the Company's sole discretion.</li>
                <li>The UCO shall be free of excessive water, solid food debris, or biological contaminants. A visible water separation layer of more than five percent (5%) of total volume shall render the UCO liable to rejection or price adjustment.</li>
                <li>Minimum accepted volume per pickup: two hundred millilitres (200 ml). The Company is not obligated to dispatch a Collection Agent for quantities below this threshold.</li>
              </ul>
              <p className="mb-2"><strong>3.3</strong> The Company's Collection Agent shall have the absolute right to reject any UCO that does not meet the above criteria or that the Agent reasonably suspects has been adulterated. A rejection decision made in good faith by the Collection Agent shall be final and binding. No UCO Payment shall be made for rejected UCO, and the rejected UCO shall be returned to the User.</p>
              <p className="mb-2"><strong>3.4 UCO Payment Terms:</strong></p>
              <ul className="list-none pl-5 mb-2 space-y-1">
                <li><strong>3.4.1</strong> The UCO Payment rate is variable and shall be as published on the Platform at the time of the Scheduled Pickup. Publication on the Platform constitutes adequate notice of the applicable rate.</li>
                <li><strong>3.4.2</strong> UCO Payment shall be credited to the User's registered bank account, UPI ID, or Platform wallet (as applicable) within seven (7) business days of successful collection and quality acceptance.</li>
                <li><strong>3.4.3</strong> The Company reserves the right to adjust the UCO Payment rate at any time without prior notice, subject to publishing the revised rate on the Platform before its application. Your continued participation in the collection programme following such publication constitutes acceptance of the revised rate.</li>
                <li><strong>3.4.4</strong> In the event of a dispute regarding volume accepted, the measurement recorded by the Collection Agent at the point of collection shall be the determinative figure.</li>
              </ul>
              <p className="mb-2"><strong>3.5 Scheduling and Pickup Obligations:</strong></p>
              <ul className="list-none pl-5 mb-2 space-y-1">
                <li><strong>3.5.1</strong> Pickups shall be scheduled through the Seyon App only. The Company shall endeavour to fulfil confirmed Scheduled Pickups within the time window indicated at the time of booking, subject to operational feasibility, route density, and force majeure events.</li>
                <li><strong>3.5.2</strong> If a User is unavailable at the time of a confirmed Scheduled Pickup, the Collection Agent shall make one (1) attempt to contact the User by phone. If contact cannot be established within ten (10) minutes, the Collection Agent may proceed to the next location. A missed pickup due to User unavailability shall not entitle the User to any compensation.</li>
                <li><strong>3.5.3</strong> The Company may, without liability, reschedule, delay, or cancel a Scheduled Pickup due to operational constraints, insufficient route density, weather, or force majeure events, subject to notifying the User through the App as soon as reasonably practicable.</li>
              </ul>
              <p className="mb-4"><strong>3.6 Health Representation by User:</strong> By participating in the UCO collection programme, the User represents that the UCO being returned was oil that was used for domestic cooking purposes in the User's own household. The User further acknowledges that the FSSAI, through its RUCO programme and TPC-based standards, classifies the reuse of degraded cooking oil as a public health risk, and that returning UCO to the Company instead of reusing it is consistent with FSSAI's health guidelines. The Company does not make any representation regarding the personal health outcomes of individual Users.</p>

              <h3 className="font-bold text-forest-800 mt-6 mb-2">4. UCO COLLECTION SERVICES — COMMERCIAL / B2B USERS</h3>
              <p className="mb-2"><strong>4.1 B2B Enrolment and Agreement:</strong> B2B Users seeking UCO collection services shall enter into a separate B2B Collection Agreement with the Company, which shall govern the specific collection frequency, container specifications, contractual volume commitments, pricing, and RUCO compliance documentation. These Terms shall apply to all B2B Users in addition to, and not in substitution of, the B2B Collection Agreement.</p>
              <p className="mb-2"><strong>4.2 EPR Compliance Obligation:</strong> B2B Users who are 'bulk users' within the meaning of the EPR Framework for Waste Oil (MoEFCC, May 2024) acknowledge that they bear an independent statutory obligation to ensure that UCO generated in their premises is disposed of through a licensed collector such as the Company. By contracting with the Company for RUCO-licensed collection, B2B Users satisfy their EPR disposal obligation only in respect of the UCO actually collected by the Company. The Company bears no liability for any regulatory consequence arising from UCO that the B2B User disposes of through any channel other than the Company.</p>
              <p className="mb-2"><strong>4.3 B2B UCO Quality and Drumming:</strong> B2B Users shall segregate UCO by oil type where practicable (palm, sunflower, mustard, groundnut, coconut) and shall not mix UCO with animal fat, tallow, or non-cooking waste oils unless specifically authorised in writing by the Company. B2B Users shall be responsible for maintaining collection drums supplied by the Company in clean, functional condition and shall return all Company-owned drums on demand.</p>
              <p className="mb-4"><strong>4.4 Documentation and RUCO Compliance Records:</strong> The Company shall provide B2B Users with a RUCO-compliant collection receipt for each pickup, documenting the volume collected, date, vehicle number, and Collection Agent identity. B2B Users are advised to retain these records for a minimum of three (3) years for the purpose of demonstrating EPR compliance to regulatory authorities.</p>

              <h3 className="font-bold text-forest-800 mt-6 mb-2">5. DEEPAM COOKING OIL DELIVERY SERVICES</h3>
              <p className="mb-2"><strong>5.1 Product Description and Food Safety Compliance:</strong> Deepam Oil is a food-grade cooking oil supplied under the Seyon Deepam brand. All Deepam Oil products are sourced from FSSAI-licensed suppliers, tested in accordance with the Food Safety and Standards (Food Products Standards and Food Additives) Regulations, 2011, and delivered in sealed, tamper-evident packaging bearing the applicable FSSAI licence number, batch details, and best-before date. The Company holds a valid FSSAI licence for the distribution of the Deepam Oil product.</p>
              <p className="mb-2"><strong>5.2 Order, Delivery, and Acceptance:</strong></p>
              <ul className="list-none pl-5 mb-2 space-y-1">
                <li><strong>5.2.1</strong> Orders for Deepam Oil shall be placed through the Platform. The Company shall endeavour to fulfil confirmed orders within the delivery window specified at the time of ordering. Delivery timelines are indicative and not guaranteed. Delays arising from force majeure, supply chain disruption, or logistics constraints shall not entitle the User to compensation.</li>
                <li><strong>5.2.2</strong> On delivery, the User or an authorised adult recipient at the delivery address shall inspect the product for visible damage, tamper-evidence, and conformity with the order. Acceptance of delivery without raising a complaint at the time of delivery shall constitute confirmation of satisfactory receipt.</li>
                <li><strong>5.2.3</strong> The Company does not deliver Deepam Oil to: (a) addresses outside the Company's active service zones as published on the Platform; or (b) persons who are not registered Users in good standing.</li>
              </ul>
              <p className="mb-2"><strong>5.3 Product Quality Complaints and Returns:</strong></p>
              <ul className="list-none pl-5 mb-2 space-y-1">
                <li><strong>5.3.1</strong> A User who discovers that a delivered Deepam Oil product is defective, adulterated, leaking, mislabelled, or past its best-before date must notify the Company through the App or at [legal@seyonenergy.in] within fortyeight (48) hours of delivery, with a photograph of the defective product and packaging.</li>
                <li><strong>5.3.2</strong> Upon verification of a valid complaint, the Company shall, at its election, replace the defective product or refund the purchase price. The Company shall arrange for collection of the defective product.</li>
                <li><strong>5.3.3</strong> Seyon Energy shall not be liable for adverse health outcomes or physical harm arising from: (a) use of the product beyond its best-before date; (b) improper storage by the User after delivery; (c) use of the product by a person with a known allergy or sensitivity to the oil type; (d) mixing of Deepam Oil with other substances by the User; or (e) use of the product in a manner inconsistent with ordinary domestic cooking purposes.</li>
              </ul>
              <p className="mb-4"><strong>5.4 Health Disclaimer — Cooking Oil:</strong> The supply of Deepam Oil by the Company is not a medical intervention and does not constitute dietary advice. The Company does not represent or warrant that consumption of Deepam Oil will prevent, mitigate, or cure any medical condition, including cardiovascular disease. Users with specific dietary requirements, health conditions, or medical advice concerning fat intake should consult a qualified medical professional independently. The public health data referenced in the Company's communications regarding the risks of reused cooking oil is derived from peer-reviewed scientific literature and government health publications; it is educational in nature and does not constitute personalised medical advice.</p>

              <h3 className="font-bold text-forest-800 mt-6 mb-2">6. IOT SMART COLLECTION SENSOR — TERMS OF USE</h3>
              <p className="mb-2"><strong>6.1 Device Ownership and Deployment:</strong> The IoT Smart Collection Sensor deployed at a User's premises remains the exclusive property of Seyon Energy at all times. The User is granted a non-exclusive, revocable licence to use the device solely for the purpose of monitoring fill levels of the UCO collection container and facilitating Scheduled Pickups. No property rights are transferred to the User.</p>
              <p className="mb-2"><strong>6.2 Data Collected by the IoT Sensor:</strong> The IoT Sensor collects and transmits the following data to the Platform: (a) fill-level percentage of the collection container at configurable polling intervals; (b) device identifier; (c) timestamp of each reading; and (d) household zone code (anonymised). The sensor does not collect audio, video, biometric, or any other personal data. All sensor data is processed in accordance with the Company's Privacy Policy.</p>
              <p className="mb-2"><strong>6.3 User Obligations Regarding the IoT Sensor:</strong> The User shall: (a) not tamper with, dismantle, modify, or attempt to reverse-engineer the IoT Sensor; (b) not obstruct or cover the sensor in a manner that prevents accurate fill-level readings; (c) not expose the sensor to extremes of temperature, moisture, or chemical exposure beyond ordinary domestic conditions; (d) promptly notify the Company if the sensor is damaged, lost, or stolen; and (e) permit the Company to access the premises at a mutually agreed time to retrieve the sensor upon termination of the Service.</p>
              <p className="mb-4"><strong>6.4 Sensor Malfunction and Liability:</strong> The Company shall endeavour to maintain sensor functionality but does not guarantee uninterrupted operation. A sensor malfunction shall not entitle the User to a UCO Payment for any unfulfilled pickup arising from the malfunction. The Company's liability for any loss caused by a sensor malfunction shall be limited to replacement or repair of the device.</p>

              <h3 className="font-bold text-forest-800 mt-6 mb-2">7. COMMUNITY PLEDGE PROGRAMME</h3>
              <p className="mb-2"><strong>7.1</strong> The Seyon Community Pledge Programme invites Household Users to formally commit to returning UCO on a regular basis in exchange for priority Scheduled Pickups, promotional benefits, and any other incentives described on the Platform at the time of registration. Participation is voluntary and free of charge.</p>
              <p className="mb-2"><strong>7.2</strong> A pledge does not create a binding contractual obligation on the User to return any specific quantity of UCO. It is a statement of intent and a commitment of good faith. However, Users who abuse the pledge programme by consistently scheduling pickups without UCO, providing false volume estimates, or engaging in any conduct that imposes operational costs on the Company without commensurate UCO supply may be suspended from the programme at the Company's sole discretion.</p>
              <p className="mb-4"><strong>7.3</strong> Survey data, anonymised participation statistics, and aggregate pledge volume data collected through the programme may be used by the Company for the purposes of investor presentations, academic research collaborations, regulatory submissions, and press communications. Individual User identities shall not be disclosed without express consent.</p>

              <h3 className="font-bold text-forest-800 mt-6 mb-2">8. SEYON APP — TERMS OF USE</h3>
              <p className="mb-2"><strong>8.1</strong> The Seyon App is the primary interface through which Users access all Services. By downloading and using the App, You agree to these Terms in their entirety. The App is made available for download on platforms subject to those platforms' own terms, which are independent of and not superseded by this Agreement.</p>
              <p className="mb-2"><strong>8.2</strong> You shall not: (a) use the App to impersonate another User or any person; (b) submit fraudulent UCO volumes, false quality declarations, or fictitious delivery addresses; (c) attempt to manipulate UCO Payment calculations; (d) use automated tools, bots, or scripts to interact with the App; (e) access or attempt to access other Users' accounts or data; or (f) use the App for any purpose that constitutes a breach of Applicable Law.</p>
              <p className="mb-2"><strong>8.3</strong> The Company reserves the right to suspend or terminate a User's App access without notice if it reasonably believes the User has engaged in fraudulent, abusive, or illegal activity through the App.</p>
              <p className="mb-4"><strong>8.4</strong> Push notifications, WhatsApp messages, and SMS communications sent by the App are service communications integral to the delivery of the Services. By registering on the App, You consent to receiving such communications. You may manage notification preferences within the App settings, but disabling certain notifications (such as pickup scheduling alerts) may impair the delivery of Services.</p>

              <h3 className="font-bold text-forest-800 mt-6 mb-2">9. REGULATORY COMPLIANCE — FSSAI, RUCO, AND EPR</h3>
              <p className="mb-2"><strong>9.1</strong> The Company operates under a RUCO Licence issued by FSSAI, which authorises it to collect, transport, and process UCO for biofuel production. This licence imposes obligations of quality tracking, vehicle certification, record-keeping, and chain-of-custody documentation on the Company. The Company's Services are structured to comply with these obligations.</p>
              <p className="mb-2"><strong>9.2</strong> Users are advised that: (a) the RUCO programme is a regulatory initiative of FSSAI aimed at diverting UCO from food reuse and informal disposal into the formal biofuel supply chain; (b) the FSSAI's Total Polar Compounds standard makes it unlawful for any food business operator to use cooking oil that has exceeded the prescribed TPC threshold; and (c) the Company's services are designed to assist Users in achieving compliance with the spirit of these regulations.</p>
              <p className="mb-4"><strong>9.3</strong> The Company shall not be liable for any regulatory penalty imposed on a User by FSSAI, MoEFCC, or any other authority in respect of UCO generated, stored, or disposed of by the User outside the scope of the Company's Services.</p>

              <h3 className="font-bold text-forest-800 mt-6 mb-2">10. PAYMENT TERMS, PRICING, AND REFUNDS</h3>
              <p className="mb-2"><strong>10.1</strong> All monetary transactions on the Platform — including Deepam Oil purchases and UCO Payments — are processed through RBI-authorised payment gateways. The Company shall not store complete payment instrument details.</p>
              <p className="mb-2"><strong>10.2</strong> Prices for Deepam Oil products are as published on the Platform and are inclusive of applicable GST. The Company reserves the right to revise product prices at any time. Orders placed prior to a price revision shall be fulfilled at the price applicable at the time of order confirmation.</p>
              <p className="mb-2"><strong>10.3</strong> Refunds for Deepam Oil purchases shall be processed only in the following circumstances: (a) delivery of a defective or adulterated product as verified under Clause 5.3; (b) non-delivery of a confirmed order due to the Company's operational failure; or (c) such other circumstances as required by the Consumer Protection Act, 2019. Approved refunds shall be credited to the original payment instrument within ten (10) business days.</p>
              <p className="mb-4"><strong>10.4</strong> UCO Payments are not subject to reversal once credited to the User's account, except where the Company subsequently discovers through quality re-testing that accepted UCO was adulterated or did not meet the standards declared at the time of collection, in which case the Company reserves the right to recover the UCO Payment by deducting it from future UCO Payments owed to the User.</p>

              <h3 className="font-bold text-forest-800 mt-6 mb-2">11. INTELLECTUAL PROPERTY RIGHTS</h3>
              <p className="mb-2"><strong>11.1</strong> The Platform, App, Seyon brand, Deepam brand, all software, algorithms, collection route data, sensor technology, UCO quality testing protocols, and all other materials constituting the Services are the exclusive intellectual property of Seyon Energy / Sengoal, protected under the Copyright Act, 1957, the Trade Marks Act, 1999, and all other applicable intellectual property laws.</p>
              <p className="mb-2"><strong>11.2</strong> Any User-generated data, including UCO volumes submitted, cooking habits surveys completed, and pledge programme responses, are owned by the User but the User grants the Company a perpetual, royaltyfree, non-exclusive licence to use such data in anonymised and aggregated form for research, regulatory, academic, and commercial purposes.</p>
              <p className="mb-4"><strong>11.3</strong> Users shall not reproduce, distribute, or commercially exploit the Company's Intellectual Property — including the Seyon App, brand materials, research reports, or IoT technology — without prior written authorisation.</p>

              <h3 className="font-bold text-forest-800 mt-6 mb-2">12. DATA PRIVACY AND DIGITAL PERSONAL DATA PROTECTION</h3>
              <p className="mb-2"><strong>12.1</strong> The Company processes personal data in accordance with its Privacy Policy, incorporated herein by reference. The Company is committed to compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and all rules framed thereunder.</p>
              <p className="mb-2"><strong>12.2</strong> Data collected through the Platform, App, and IoT Sensors — including name, address, phone number, UPI details, cooking oil usage patterns, UCO volume data, and location data for pickup scheduling — is processed for the purpose of delivering the Services, improving operational efficiency, conducting research, and fulfilling regulatory obligations. Data is not sold to third parties.</p>
              <p className="mb-4"><strong>12.3</strong> Location data collected by the App is used exclusively for UCO pickup routing and delivery scheduling. The App requests location access at the time of scheduling a pickup and does not continuously track User location in the background without explicit consent.</p>

              <h3 className="font-bold text-forest-800 mt-6 mb-2">13. HEALTH, ENVIRONMENTAL, AND SUSTAINABILITY CLAIMS</h3>
              <p className="mb-2"><strong>13.1</strong> The Company's communications reference peer-reviewed scientific literature — including publications by the Indian Council of Medical Research (ICMR), studies published in the Journal of Family Medicine and Primary Care, and CVD prevalence data from MDPI-published systematic reviews — to contextualise the public health rationale for its UCO collection model. These references are accurate as of the date of their publication and are cited for educational and informational purposes only.</p>
              <p className="mb-2"><strong>13.2</strong> The Company makes no guarantee that: (a) individual participation in the UCO collection programme will produce measurable personal health benefits; (b) the cessation of cooking oil reuse will prevent or treat any cardiovascular condition; or (c) the use of Deepam Oil will produce health outcomes superior to other FSSAIcompliant cooking oils.</p>
              <p className="mb-4"><strong>13.3</strong> Environmental impact claims — including carbon offset estimates and water contamination prevention metrics — are based on internationally recognised benchmarks and are stated as indicative estimates. They do not constitute verified carbon credits or regulatory environmental clearances.</p>

              <h3 className="font-bold text-forest-800 mt-6 mb-2">14. DISCLAIMER OF WARRANTIES</h3>
              <p className="mb-2"><strong>14.1</strong> To the fullest extent permissible under Applicable Law, the Platform, App, and all Services are provided on an 'as is' and 'as available' basis. The Company disclaims all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
              <p className="mb-4"><strong>14.2</strong> The Company does not warrant: (a) uninterrupted or error-free operation of the App or IoT Sensors; (b) that Scheduled Pickups will always occur at the exact time booked; (c) that UCO Payment rates will remain constant; or (d) that Deepam Oil will always be available for delivery in all service zones.</p>

              <h3 className="font-bold text-forest-800 mt-6 mb-2">15. LIMITATION OF LIABILITY</h3>
              <p className="mb-2"><strong>15.1</strong> To the maximum extent permitted by Applicable Law, the Company shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising from: (a) missed or delayed Scheduled Pickups; (b) IoT Sensor malfunction; (c) delayed UCO Payment; (d) delayed Deepam Oil delivery; or (e) any reliance by the User on health or environmental information published on the Platform.</p>
              <p className="mb-2"><strong>15.2</strong> The Company's aggregate liability to any User in respect of all claims arising under this Agreement in any twelve-month period shall not exceed the total value of UCO Payments received by that User from the Company in the same period, or the total value of Deepam Oil purchases made by that User in the same period, whichever is greater.</p>
              <p className="mb-4"><strong>15.3</strong> Nothing in this Clause shall limit liability for death or personal injury caused by the Company's proven negligence, for fraud or fraudulent misrepresentation, or for any other liability that cannot be excluded or limited under Applicable Law including the Consumer Protection Act, 2019.</p>

              <h3 className="font-bold text-forest-800 mt-6 mb-2">16. INDEMNIFICATION</h3>
              <p className="mb-4"><strong>16.1</strong> You agree to indemnify and hold harmless the Company, its directors, employees, Collection Agents, and partners from and against any claims, losses, liabilities, damages, and legal costs arising from: (a) Your misrepresentation of UCO quality or volume; (b) Your adulteration of UCO; (c) Your misuse of the IoT Sensor; (d) Your violation of Applicable Law, including food safety or EPR regulations; (e) physical damage caused to a Collection Agent or Company vehicle at Your premises; or (f) any fraudulent transaction initiated by You through the Platform.</p>

              <h3 className="font-bold text-forest-800 mt-6 mb-2">17. TERM AND TERMINATION</h3>
              <p className="mb-2"><strong>17.1</strong> This Agreement commences upon Your first use of the Platform and continues until terminated. You may terminate Your account at any time through the App settings. The Company may terminate or suspend Your account immediately for: (a) adulteration or fraudulent misrepresentation of UCO; (b) abuse of the UCO Payment system; (c) damage to Company property including containers or IoT Sensors; (d) violation of FSSAI, EPR, or other regulatory requirements applicable to Your use; or (e) any other material breach of this Agreement.</p>
              <p className="mb-2"><strong>17.2</strong> On termination, You must return all Company-owned equipment including collection containers and IoT Sensors. Outstanding UCO Payments owed to You shall be settled within thirty (30) days of termination, subject to any verified deductions. Outstanding product payments owed by You to the Company shall become immediately due.</p>
              <p className="mb-4"><strong>17.3</strong> Clauses 11 (Intellectual Property), 12 (Data Privacy), 13 (Health Claims), 15 (Limitation of Liability), 16 (Indemnification), 18 (Dispute Resolution), and 19 (Governing Law) shall survive termination of this Agreement.</p>

              <h3 className="font-bold text-forest-800 mt-6 mb-2">18. FORCE MAJEURE</h3>
              <p className="mb-4"><strong>18.1</strong> The Company shall not be in breach of this Agreement or liable for any delay or non-performance of its obligations to the extent caused by a Force Majeure Event, defined as any event beyond the Company's reasonable control including acts of God, floods, fire, epidemic, pandemic, civil unrest, governmental action, fuel shortages, logistics strikes, disruption to the national biodiesel procurement system, or failure of third-party technology infrastructure. The Company shall notify affected Users as soon as reasonably practicable and shall resume performance as quickly as circumstances permit.</p>

              <h3 className="font-bold text-forest-800 mt-6 mb-2">19. DISPUTE RESOLUTION</h3>
              <p className="mb-2"><strong>19.1</strong> The parties shall first attempt to resolve any dispute through good-faith negotiation for a period of thirty (30) days following written notice of the dispute by one party to the other.</p>
              <p className="mb-2"><strong>19.2</strong> If unresolved, the dispute shall be referred to sole arbitration under the Arbitration and Conciliation Act, 1996, as amended. The seat and venue of arbitration shall be Bangalore, Karnataka. The arbitration shall be conducted in English. The arbitral award shall be final and binding.</p>
              <p className="mb-4"><strong>19.3</strong> For disputes involving amounts not exceeding the jurisdictional limit of the District Consumer Disputes Redressal Commission, Users may alternatively approach the appropriate Consumer Commission under the Consumer Protection Act, 2019. Nothing in this Agreement abridges a User's rights as a consumer under Applicable Law.</p>

              <h3 className="font-bold text-forest-800 mt-6 mb-2">20. GOVERNING LAW AND JURISDICTION</h3>
              <p className="mb-4"><strong>20.1</strong> This Agreement is governed by the laws of the Republic of India. Subject to Clause 19 above, the parties submit to the exclusive jurisdiction of the courts at Bangalore, Karnataka, India.</p>

              <h3 className="font-bold text-forest-800 mt-6 mb-2">21. AMENDMENTS</h3>
              <p className="mb-4"><strong>21.1</strong> The Company may amend these Terms at any time by publishing the revised version on the Platform. For material amendments, the Company shall provide not less than seven (7) days' notice via App notification or email to the registered address. Your continued use of the Platform following the effective date of any amendment constitutes acceptance thereof.</p>

              <h3 className="font-bold text-forest-800 mt-6 mb-2">22. MISCELLANEOUS PROVISIONS</h3>
              <p className="mb-2"><strong>22.1 Entire Agreement:</strong> This Agreement, together with the Privacy Policy and any B2B Collection Agreement, constitutes the entire agreement between the parties and supersedes all prior understandings.</p>
              <p className="mb-2"><strong>22.2 Severability:</strong> If any provision is held invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p>
              <p className="mb-2"><strong>22.3 No Waiver:</strong> Failure to enforce any provision shall not constitute a waiver of the right to enforce it in the future.</p>
              <p className="mb-2"><strong>22.4 Assignment:</strong> You may not assign your rights under this Agreement. The Company may assign this Agreement in connection with a merger, acquisition, or business reorganisation without Your consent.</p>
              <p className="mb-2"><strong>22.5 Electronic Contract:</strong> This Agreement constitutes a valid electronic contract under the Information Technology Act, 2000. No handwritten signature is required.</p>
              <p className="mb-4"><strong>22.6 Language:</strong> This Agreement is executed in English. In the event of a conflict between the English version and any translation provided for convenience, the English version shall prevail.</p>

              <h3 className="font-bold text-forest-800 mt-6 mb-2">23. GRIEVANCE OFFICER AND CONSUMER ESCALATION</h3>
              <p className="mb-2"><strong>23.1</strong> In accordance with the Information Technology Act, 2000 and the IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, the Company has designated a Grievance Officer:<br/>
              Name: [Name of Grievance Officer]<br/>
              Designation: Grievance Officer, Seyon Energy (Sengoal)<br/>
              Email: [Email]<br/>
              Operational Address: [Registered Office Address], Anekal, Bangalore, Karnataka, India</p>
              <p className="mb-2"><strong>23.2</strong> Complaints regarding UCO collection, Deepam Oil quality, IoT Sensor issues, UCO Payment disputes, or App functionality shall be directed to the Grievance Officer. The Grievance Officer shall acknowledge all complaints within twenty-four (24) hours and resolve them within fifteen (15) days of receipt, in accordance with Applicable Law.</p>
              <p className="mb-4"><strong>23.3</strong> For FSSAI-related food safety complaints, the User may additionally contact the FSSAI Consumer Helpline or file a complaint with the concerned Food Safety Officer for the jurisdiction.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
