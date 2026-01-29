import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

function Support() {
  const [expandedCard, setExpandedCard] = useState(null)

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white/85 backdrop-blur-md border border-black/5 rounded-3xl shadow-lg p-8 md:p-12 text-body">
          <h1 className="text-h1 md:text-h1-md mb-4">Support</h1>
          <p className="text-body mb-8">
            Find answers to common questions and learn how to manage your account.
          </p>

          {/* Data Management Section */}
          <section className="mb-8">
            <h2 className="text-h2 mb-4">Data Management</h2>

            {/* Deleting Your Account Card */}
            <div className="border border-black/10 rounded-lg overflow-hidden bg-white/80 backdrop-blur-sm shadow-sm">
              <button
                onClick={() => toggleCard('deleteAccount')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-black/5 transition-colors duration-200 text-left"
              >
                <span className="text-h3">Deleting Your Account</span>
                {expandedCard === 'deleteAccount' ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {expandedCard === 'deleteAccount' && (
                <div className="px-6 py-4 border-t border-black/10 bg-white/70">
                  <p className="text-body mb-4">
                    Follow these steps to permanently delete your Unimatch account:
                  </p>
                  <ol className="space-y-3 text-body">
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0c0c0c] text-bodysmall font-semibold mr-3 mt-0.5 flex-shrink-0">
                        1
                      </span>
                      <span>Open the Unimatch app</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0c0c0c] text-bodysmall font-semibold mr-3 mt-0.5 flex-shrink-0">
                        2
                      </span>
                      <span>Go to the profile page</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0c0c0c] text-bodysmall font-semibold mr-3 mt-0.5 flex-shrink-0">
                        3
                      </span>
                      <span>Tap on the settings icon on the top right corner</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0c0c0c] text-bodysmall font-semibold mr-3 mt-0.5 flex-shrink-0">
                        4
                      </span>
                      <span>Scroll to the bottom and you will find the "Delete Account" button</span>
                    </li>
                  </ol>
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-bodysmall">
                      <strong>Warning:</strong> Deleting your account is permanent and cannot be undone. All your data, matches, and messages will be permanently removed.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Contact Section */}
          <section className="mt-12 p-6 bg-white/75 border border-black/10 rounded-lg shadow-sm">
            <h3 className="text-h3 mb-2">Need More Help?</h3>
            <p className="text-body">
              If you have any questions or need assistance, please contact us at{' '}
              <a href="mailto:base.unimatch@gmail.com" className="underline">
                base.unimatch@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Support
