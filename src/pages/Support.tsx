import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

function Support() {
  const [expandedCard, setExpandedCard] = useState(null)

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId)
  }

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Dark overlay for better readability */}
      <div className="fixed inset-0 bg-black/60 pointer-events-none z-0" />
      
      <div className="relative z-10 max-w-4xl mx-auto glass-card p-8 md:p-12">
        <h1 className="text-4xl font-bold text-white mb-4">Support</h1>
        <p className="text-gray-300 mb-8">
          Find answers to common questions and learn how to manage your account.
        </p>

        {/* Data Management Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Data Management</h2>
          
          {/* Deleting Your Account Card */}
          <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800/30 backdrop-blur-sm">
            <button
              onClick={() => toggleCard('deleteAccount')}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700/30 transition-colors duration-200"
            >
              <span className="text-lg font-medium text-white">Deleting Your Account</span>
              {expandedCard === 'deleteAccount' ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {expandedCard === 'deleteAccount' && (
              <div className="px-6 py-4 border-t border-gray-700 bg-gray-900/30">
                <p className="text-gray-300 mb-4">
                  Follow these steps to permanently delete your Unimatch account:
                </p>
                <ol className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-600 text-white text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                      1
                    </span>
                    <span>Open the Unimatch app</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-600 text-white text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                      2
                    </span>
                    <span>Go to the profile page</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-600 text-white text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                      3
                    </span>
                    <span>Tap on the settings icon on the top right corner</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-600 text-white text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                      4
                    </span>
                    <span>Scroll to the bottom and you will find the "Delete Account" button</span>
                  </li>
                </ol>
                <div className="mt-4 p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
                  <p className="text-red-300 text-sm">
                    <strong>Warning:</strong> Deleting your account is permanent and cannot be undone. All your data, matches, and messages will be permanently removed.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="mt-12 p-6 bg-gray-800/30 border border-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-2">Need More Help?</h3>
          <p className="text-gray-300">
            If you have any questions or need assistance, please contact us at{' '}
            <a href="mailto:base.unimatch@gmail.com" className="text-purple-400 hover:text-purple-300 underline">
              base.unimatch@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}

export default Support
