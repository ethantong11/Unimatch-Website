import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

function Support() {
  const [expandedCard, setExpandedCard] = useState(null)

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId)
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-[#0c0c0c]">
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(130% 120% at 20% 10%, #f537b5 0%, rgba(245, 55, 181, 0) 50%)',
            'radial-gradient(120% 110% at 70% 8%, #f78a3a 0%, rgba(247, 138, 58, 0) 55%)',
            'radial-gradient(140% 120% at 50% 0%, #b54bff 0%, rgba(181, 75, 255, 0) 52%)',
            'linear-gradient(180deg, #f9f8fb 45%, #fdfdfd 100%)',
          ].join(', '),
          filter: 'blur(36px)',
          transform: 'scale(1.08)',
        }}
      />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white/85 backdrop-blur-md border border-black/5 rounded-3xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-medium text-[#0c0c0c] mb-4">Support</h1>
          <p className="text-gray-700 mb-8">
            Find answers to common questions and learn how to manage your account.
          </p>

          {/* Data Management Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#0c0c0c] mb-4">Data Management</h2>
            
            {/* Deleting Your Account Card */}
            <div className="border border-black/10 rounded-lg overflow-hidden bg-white/80 backdrop-blur-sm shadow-sm">
              <button
                onClick={() => toggleCard('deleteAccount')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-black/5 transition-colors duration-200 text-left"
              >
                <span className="text-lg font-medium text-[#0c0c0c]">Deleting Your Account</span>
                {expandedCard === 'deleteAccount' ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {expandedCard === 'deleteAccount' && (
                <div className="px-6 py-4 border-t border-black/10 bg-white/70">
                  <p className="text-gray-700 mb-4">
                    Follow these steps to permanently delete your Unimatch account:
                  </p>
                  <ol className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0c0c0c] text-white text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                        1
                      </span>
                      <span>Open the Unimatch app</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0c0c0c] text-white text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                        2
                      </span>
                      <span>Go to the profile page</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0c0c0c] text-white text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                        3
                      </span>
                      <span>Tap on the settings icon on the top right corner</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0c0c0c] text-white text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                        4
                      </span>
                      <span>Scroll to the bottom and you will find the "Delete Account" button</span>
                    </li>
                  </ol>
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">
                      <strong>Warning:</strong> Deleting your account is permanent and cannot be undone. All your data, matches, and messages will be permanently removed.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Contact Section */}
          <section className="mt-12 p-6 bg-white/75 border border-black/10 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-[#0c0c0c] mb-2">Need More Help?</h3>
            <p className="text-gray-700">
              If you have any questions or need assistance, please contact us at{' '}
              <a href="mailto:base.unimatch@gmail.com" className="text-[#0c0c0c] underline">
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
