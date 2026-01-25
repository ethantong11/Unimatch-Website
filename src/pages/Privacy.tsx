import React from 'react'

function Privacy() {
  return (
    <div className="common-page">
      {/* Dark overlay for better readability */}
      <div className="common-overlay" />
      
      <div className="common-card">
        <h1 className="common-title">Privacy Policy</h1>
        
        <section className="common-section">
          <p className="common-meta"><strong>Effective date:</strong> Jan 1, 2026</p>
          <p className="common-meta"><strong>Contact:</strong> base.unimatch@gmail.com</p>
        </section>

        <section className="common-section">
          <h2 className="common-section-title">1) Purpose</h2>
          <p className="common-text mb-2">
            Hello! Welcome to Unimatch's privacy policy! Please take some time to read this before using our service.
          </p>
          <p className="common-text">
            This Privacy Policy explains how Unimatch ("we", "us") collects, uses, discloses, and protects personal data in accordance with the Personal Data (Privacy) Ordinance (Cap. 486) of Hong Kong and its Data Protection Principles.
          </p>
        </section>

        <section className="common-section">
          <h2 className="common-section-title">2) Data We Collect</h2>
          <ul className="common-list">
            <li><strong>Account & Profile:</strong> name or nickname, email, date of birth/age, gender, preferences, religion, photos, bio.</li>
            <li><strong>Usage & Interactions:</strong> matches, messages, reports, and in‑app actions.</li>
            <li><strong>Device & Technical:</strong> IP address, device identifiers, OS and app version, diagnostics, crash logs.</li>
            <li><strong>Location:</strong> coarse or precise location for nearby matching if you grant permission.</li>
            <li><strong>Payments:</strong> if/when enabled, processed by Apple/Google; we receive tokens/receipts, not full card details.</li>
          </ul>
        </section>

        <section className="common-section">
          <h2 className="common-section-title">3) Purposes of Use</h2>
          <ul className="common-list">
            <li>Provide, operate, and personalize the Service (Auto matching, Shots).</li>
            <li>Safety, security, moderation, and fraud prevention.</li>
            <li>Service analytics and improvement.</li>
            <li>Communications about updates, features, and support.</li>
            <li>Compliance with legal obligations and lawful requests.</li>
          </ul>
        </section>

        <section className="common-section">
          <h2 className="common-section-title">4) Legal Basis / DPP Alignment</h2>
          <p className="common-text">
            We collect and use data for purposes explained at or before collection (DPP1), limit use to those purposes or directly related purposes (DPP3), and take steps to ensure data is accurate (DPP2) and secure (DPP4).
          </p>
        </section>

        <section className="common-section">
          <h2 className="common-section-title">5) Sharing & Disclosure</h2>
          <ul className="common-list">
            <li><strong>Service Providers:</strong> Supabase (bound by confidentiality and PDPO‑aligned terms).</li>
            <li><strong>App Stores & Payments:</strong> Apple App Store / Google Play billing and receipts.</li>
            <li><strong>Legal:</strong> to comply with laws, enforce terms, or protect rights, safety, and security.</li>
          </ul>
          <p className="common-text mt-2">
            We do not sell personal data to third parties.
          </p>
        </section>

        <section className="common-section">
          <h2 className="common-section-title">6) Overseas Transfers</h2>
          <p className="common-text">
            Where data is transferred or accessed outside Hong Kong (e.g., regional cloud infrastructure), we take reasonable steps to ensure a level of protection that is broadly comparable to Hong Kong requirements.
          </p>
        </section>

        <section className="common-section">
          <h2 className="common-section-title">7) Retention</h2>
          <p className="common-text">
            We retain personal data only for as long as necessary for the purposes stated or to meet legal requirements. When you delete your account, we delete or anonymize data within a reasonable period, except where retention is required by law or to resolve disputes, prevent abuse, or enforce our Terms.
          </p>
        </section>

        <section className="common-section">
          <h2 className="common-section-title">8) Your Rights</h2>
          <ul className="common-list">
            <li>Request access to personal data we hold about you.</li>
            <li>Request correction of inaccurate data.</li>
            <li>Withdraw consent for optional processing (e.g., location).</li>
            <li>Deletion of your account.</li>
          </ul>
          <p className="common-text mt-2">
            To exercise rights, email base.unimatch@gmail.com. We may need to verify your identity.
          </p>
        </section>

        <section className="common-section">
          <h2 className="common-section-title">9) Security</h2>
          <p className="common-text">
            We implement administrative, technical, and physical safeguards, including encryption in transit, access controls, and regular reviews. No method of transmission or storage is 100% secure.
          </p>
        </section>

        <section className="common-section">
          <h2 className="common-section-title">10) Children</h2>
          <p className="common-text">
            The Service is for users 18+. We do not knowingly collect data from minors. Accounts suspected to be underage may be suspended and deleted.
          </p>
        </section>

        <section className="common-section">
          <h2 className="common-section-title">11) Cookies & Tracking</h2>
          <p className="common-text">
            We may use limited cookies or mobile SDKs for authentication, security, and analytics. You can control certain tracking via device settings; some features may not function without essential tracking.
          </p>
        </section>

        <section className="common-section">
          <h2 className="common-section-title">12) Changes</h2>
          <p className="common-text">
            We may update this Policy. We will post updates with a new effective date and, where required, notify you in‑app.
          </p>
        </section>

        <section className="common-section">
          <h2 className="common-section-title">13) Contact</h2>
          <p className="common-text">
            Questions about privacy? Contact base.unimatch@gmail.com
          </p>
        </section>
      </div>
    </div>
  )
}

export default Privacy
