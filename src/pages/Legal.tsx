import React, { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import legalContent from '../content/legal.json'

type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'orderedList'; items: string[] }
  | { type: 'subheading'; text: string }

type Section = {
  heading: string
  blocks: Block[]
}

type Policy = {
  id: string
  title: string
  effectiveDate: string
  contact: string
  sections: Section[]
}

const policies = legalContent.policies as Policy[]
const fallbackPolicyId = policies[0]?.id ?? 'terms'

function Legal() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activePolicyId = searchParams.get('policy') ?? fallbackPolicyId

  const activePolicy = useMemo(() => {
    return policies.find((policy) => policy.id === activePolicyId) ?? policies[0]
  }, [activePolicyId])

  const handlePolicyChange = (policyId: string) => {
    setSearchParams({ policy: policyId })
  }

  return (
    <div className="relative min-h-screen">
      <div className="relative z-content mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-3 py-24 sm:px-4 lg:px-6 lg:pl-[calc(16rem+2rem)]">
        <aside
          className="fixed left-4 right-4 z-10 bottom-[calc(0.5rem+env(safe-area-inset-bottom))] lg:fixed lg:left-auto lg:right-auto lg:top-44 lg:bottom-auto lg:w-64"
          style={{ left: 'max(1.5rem, calc(50% - 700px))' }}
        >
          <div className="rounded-[2rem] border border-black/5 bg-white/30 p-1.5 shadow-sm backdrop-blur-md dark:border-white/15 dark:bg-white/10 lg:border-transparent lg:bg-transparent lg:shadow-none lg:backdrop-blur-0 lg:rounded-none lg:p-0">
            <div className="flex flex-row flex-wrap gap-2 lg:flex-col">
              {policies.map((policy) => {
                const isActive = policy.id === activePolicy.id
                return (
                  <button
                    key={policy.id}
                    type="button"
                    onClick={() => handlePolicyChange(policy.id)}
                    className={`flex-1 rounded-[1.25rem] px-2.5 py-2 text-center text-sm transition-colors lg:flex-none lg:text-left ${
                      isActive
                        ? 'bg-[#0c0c0c] text-white dark:bg-white dark:text-[#0c0c0c]'
                        : 'text-[#0c0c0c]/60 hover:text-[#0c0c0c] dark:text-white/60 dark:hover:text-white'
                    }`}
                  >
                    <span className="block text-bodysmall">
                      {policy.title}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="max-w-3xl p-8 md:p-12">
            <h1 className="text-h1 md:text-h1-md mb-6">
              {activePolicy.title}
            </h1>
            <section className="mb-8">
              <p className="text-body mb-2">
                <strong>Effective date:</strong> {activePolicy.effectiveDate}
              </p>
              <p className="text-body mb-2">
                <strong>Contact:</strong> {activePolicy.contact}
              </p>
            </section>

            {activePolicy.sections.map((section) => (
              <section key={section.heading} className="mb-8">
                <h2 className="text-h2 mb-3">{section.heading}</h2>
                <div className="space-y-4">
                  {section.blocks.map((block, index) => {
                    if (block.type === 'paragraph') {
                      return (
                        <p key={`${section.heading}-p-${index}`} className="text-body">
                          {block.text}
                        </p>
                      )
                    }

                    if (block.type === 'subheading') {
                      return (
                        <h3 key={`${section.heading}-h-${index}`} className="text-h3">
                          {block.text}
                        </h3>
                      )
                    }

                    if (block.type === 'orderedList') {
                      return (
                        <ol
                          key={`${section.heading}-ol-${index}`}
                          className="list-decimal list-inside text-body space-y-1 ml-4"
                        >
                          {block.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ol>
                      )
                    }

                    return (
                      <ul
                        key={`${section.heading}-ul-${index}`}
                        className="list-disc list-inside text-body space-y-1 ml-4"
                      >
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Legal
