import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

function Support() {
  const [expandedCard, setExpandedCard] = useState(null)

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId)
  }

  return (
    <div className="common-page">
      {/* Dark overlay for better readability */}
      <div className="common-overlay" />
      
      <div className="common-card">
        <h1 className="common-title">Support</h1>
        <p className="common-text mb-8">
          Find answers to common questions and learn how to manage your account.
        </p>

        {/* Data Management Section */}
        <section className="common-section">
          <h2 className="common-section-title mb-4">Data Management</h2>
          
          {/* Deleting Your Account Card */}
          <div className="support-card">
            <button
              onClick={() => toggleCard('deleteAccount')}
              className="support-card-button"
            >
              <span className="text-lg font-medium text-white">Deleting Your Account</span>
              {expandedCard === 'deleteAccount' ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {expandedCard === 'deleteAccount' && (
              <div className="support-card-panel">
                <p className="common-text mb-4">
                  Follow these steps to permanently delete your Unimatch account:
                </p>
                <ol className="support-steps">
                  <li className="support-step">
                    <span className="support-step-badge">
                      1
                    </span>
                    <span>Open the Unimatch app</span>
                  </li>
                  <li className="support-step">
                    <span className="support-step-badge">
                      2
                    </span>
                    <span>Go to the profile page</span>
                  </li>
                  <li className="support-step">
                    <span className="support-step-badge">
                      3
                    </span>
                    <span>Tap on the settings icon on the top right corner</span>
                  </li>
                  <li className="support-step">
                    <span className="support-step-badge">
                      4
                    </span>
                    <span>Scroll to the bottom and you will find the "Delete Account" button</span>
                  </li>
                </ol>
                <div className="support-warning">
                  <p className="support-warning-text">
                    <strong>Warning:</strong> Deleting your account is permanent and cannot be undone. All your data, matches, and messages will be permanently removed.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="support-contact">
          <h3 className="text-xl font-semibold text-white mb-2">Need More Help?</h3>
          <p className="common-text">
            If you have any questions or need assistance, please contact us at{' '}
            <a href="mailto:base.unimatch@gmail.com" className="support-link">
              base.unimatch@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}

export default Support
