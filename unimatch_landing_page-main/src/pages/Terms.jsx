import React from 'react'

function Terms() {
  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Dark overlay for better readability */}
      <div className="fixed inset-0 bg-black/60 pointer-events-none z-0" />
      
      <div className="relative z-10 max-w-4xl mx-auto glass-card p-8 md:p-12">
        <h1 className="text-4xl font-bold gradient-text mb-4">Terms of Service</h1>
        <p className="text-sm text-gray-300 mb-2"><strong>Effective date:</strong> November 06, 2025</p>
        <p className="text-sm text-gray-300 mb-2"><strong>Contact:</strong> base.unimatch@gmail.com</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">1) Introduction</h2>
          <p className="text-gray-300 leading-relaxed">
            Welcome to Unimatch ("Unimatch," "we," "us," "our"). By creating an account or using the Unimatch app or site (the "Service"), you agree to these Terms of Service ("Terms"). If you do not agree, do not use the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">2) Eligibility</h2>
          <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-2">
            <li>You must be at least 18 years old and legally able to enter a binding contract.</li>
            <li>You must be enrolled in an eligible Hong Kong University and have a valid Hong Kong University Email</li>
            <li>You must be permitted to use the Service under the laws of Hong Kong SAR and any laws that apply to you.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">3) Your Account</h2>
          <p className="text-gray-300 leading-relaxed mb-2">
            Provide accurate information and keep your login secure. You are responsible for all activity on your account.
          </p>
          <p className="text-gray-300 leading-relaxed mb-2">
            You may delete your account in-app at any time.
          </p>
          <p className="text-gray-300 leading-relaxed">
            We may suspend or terminate accounts that violate these Terms or our guidelines, or for safety/operational reasons at any time.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">4) Acceptable Use</h2>
          <p className="text-gray-300 leading-relaxed">
            You agree not to: (a) upload illegal, harmful, hateful, obscene, infringing, or misleading content; (b) harass, threaten, impersonate, or dox others; (c) spam, scrape, or engage in automated data collection; (d) upload malware or attempt to bypass security; (e) use the Service for commercial solicitation without our consent. We reserve the right to remove or restrict any content that we believe violates these Terms, our community standards, or applicable law.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">5) Content & Licence</h2>
          <p className="text-gray-300 leading-relaxed mb-2">
            You own the photos, bios, messages, and other materials you post ("User Content").
          </p>
          <p className="text-gray-300 leading-relaxed mb-2">
            You grant Unimatch a non-exclusive, worldwide, royalty-free, sublicensable and transferable licence to host, store, display, reproduce, modify, adapt, publish, distribute, and otherwise use your User Content for the purposes of operating, improving, and promoting the Service.
          </p>
          <p className="text-gray-300 leading-relaxed mb-2">This includes:</p>
          <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-1 mb-2 ml-4">
            <li>displaying your profile and related content to other users; and</li>
            <li>using non-private profile elements (such as your photos, first name, age, or general location) in marketing, advertising, or promotional materials relating to Unimatch, both online and offline.</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mb-2">
            Unimatch will never use private messages, contact details, or sensitive information in any promotional or advertising material.
          </p>
          <p className="text-gray-300 leading-relaxed mb-2">
            You represent and warrant that you have all rights necessary to post and license your User Content and that it complies with these Terms and applicable law.
          </p>
          <p className="text-gray-300 leading-relaxed">
            We may remove, restrict, or disable access to any User Content that violates these Terms, our community standards, or applicable law.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">6) Community Safety</h2>
          <p className="text-gray-300 leading-relaxed">
            Respect consent and boundaries. Use in‑app reporting to flag safety issues. We may take actions including warnings, feature limits, or account removal.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">7) Subscriptions & Payments</h2>
          <p className="text-gray-300 leading-relaxed">
            When subscriptions or in‑app purchases are offered, prices will be shown before purchase, renewals will be clearly disclosed, and payments will be processed by Apple App Store / Google Play. Refunds follow the relevant store policies and any mandatory Hong Kong consumer protections.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">8) Privacy</h2>
          <p className="text-gray-300 leading-relaxed">
            Your personal data is handled under our separate Privacy Policy, compliant with Hong Kong's Personal Data (Privacy) Ordinance (Cap. 486).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">9) Third‑Party Services</h2>
          <p className="text-gray-300 leading-relaxed">
            The Service may link to or integrate third‑party services (e.g., analytics, cloud hosting, app stores). We are not responsible for third‑party terms or practices.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">10) Disclaimers</h2>
          <p className="text-gray-300 leading-relaxed">
            The Service is provided on an "as is" and "as available" basis without warranties. We do not guarantee matches, outcomes, or uninterrupted availability. Interactions with other users are your responsibility—please act with caution.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">11) Limitation of Liability</h2>
          <p className="text-gray-300 leading-relaxed">
            To the maximum extent permitted by Hong Kong law, Unimatch will not be liable for indirect, incidental, special, consequential, or exemplary damages. Our aggregate liability for all claims in any 12‑month period will not exceed the greater of (i) amounts you paid to us in that period (if any) or (ii) HKD 1,000.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">12) Indemnity</h2>
          <p className="text-gray-300 leading-relaxed">
            You will indemnify and hold harmless Unimatch and our team from claims arising out of your misuse of the Service, your User Content, or your breach of these Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">13) Changes</h2>
          <p className="text-gray-300 leading-relaxed">
            We may update these Terms from time to time. We will post the updated Terms with a new effective date and, where required, notify you in‑app. Continued use constitutes acceptance.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">14) Governing Law & Jurisdiction</h2>
          <p className="text-gray-300 leading-relaxed">
            These Terms are governed by the laws of the Hong Kong Special Administrative Region. The courts of Hong Kong have exclusive jurisdiction over disputes, subject to any mandatory rights you have under applicable law.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-3">15) Contact</h2>
          <p className="text-gray-300 leading-relaxed">
            Questions? Email base.unimatch@gmail.com
          </p>
        </section>
      </div>
    </div>
  )
}

export default Terms
