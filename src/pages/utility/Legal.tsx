import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import legalContent from '../../content/legal.json'
import Tag from '../../components/Tag'

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
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const activePolicy = useMemo(() => {
    return policies.find((policy) => policy.id === activePolicyId) ?? policies[0]
  }, [activePolicyId])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [activePolicyId])

  const handlePolicyChange = (policyId: string) => {
    setSearchParams({ policy: policyId })
    setIsMenuOpen(false)
  }

  return (
    <div className="relative min-h-screen mx-auto flex-col gap-2xl py-5xl sm:px-md lg:px-lg lg:pl-[calc(16rem+2rem)]">
        <aside
          className="fixed left-4 right-4 z-10 bottom-[calc(0.5rem+env(safe-area-inset-bottom))] lg:fixed lg:left-auto lg:right-auto lg:top-44 lg:bottom-auto lg:w-64"
          style={{ left: 'max(1.5rem, calc(50% - 700px))' }}
        >
          {/* Mobile dropup */}
          <nav aria-label="Legal policies" className="lg:hidden">
            <div className="relative">
              {isMenuOpen ? (
                <div className="absolute bottom-full left-0 right-0 mb-sm rounded-3xl border border-outline-subtle bg-glass-subtle p-xs backdrop-blur-md drop-shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
                  <div className="flex flex-col gap-xs">
                    {policies.map((policy) => {
                      const isActive = policy.id === activePolicy.id
                      return (
                        <button
                          key={policy.id}
                          type="button"
                          onClick={() => handlePolicyChange(policy.id)}
                          className={`rounded-full p-sm text-left text-bodysmall transition-colors ${
                            isActive
                              ? 'bg-primary text-background'
                              : 'text-primary/60 hover:text-primary'
                          }`}
                        >
                          {policy.title}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-expanded={isMenuOpen}
                className="w-full rounded-[2rem] border border-outline-subtle bg-glass-subtle px-lg py-sm text-left text-sm backdrop-blur-md drop-shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
              >
                <span className="flex items-center justify-between gap-sm">
                  <span className="text-bodysmall">{activePolicy.title}</span>
                  <span className={`text-secondary transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}>
                    ▴
                  </span>
                </span>
              </button>
            </div>
          </nav>

          {/* Desktop list */}
          <nav
            aria-label="Legal policies"
            className="hidden lg:block rounded-[2rem] border border-outline-subtle bg-glass-subtle p-xs backdrop-blur-md lg:border-transparent lg:bg-transparent lg:backdrop-blur-0 lg:rounded-none lg:p-0"
          >
            <div className="flex flex-row flex-wrap gap-xs lg:flex-col">
              {policies.map((policy) => {
                const isActive = policy.id === activePolicy.id
                return (
                  <button
                    key={policy.id}
                    type="button"
                    onClick={() => handlePolicyChange(policy.id)}
                    className={`flex-1 rounded-[1.25rem] p-sm text-center text-sm transition-colors lg:flex-none lg:text-left ${
                      isActive
                        ? 'bg-primary text-background'
                        : 'text-primary/60 hover:text-primary'
                    }`}
                  >
                    <span className="block text-bodysmall">
                      {policy.title}
                    </span>
                  </button>
                )
              })}
            </div>
          </nav>
        </aside>

        <main className="max-w-5xl px-md sm:px-lg md:px-xl md:py-2xl lg:px-2xl">
          {/* Header Section */}
          <section className="mb-2xl">
            <h2 className="text-h2 mb-sm">
              {activePolicy.title}
            </h2>
            <Tag>
              Effective date: {activePolicy.effectiveDate}
            </Tag>
          </section>

          {/* Policy Content */}
          <section className="max-w-3xl">
            {activePolicy.sections.map((section) => (
              <section key={section.heading} className="mb-2xl">
                <h2 className="text-h3 mb-sm">{section.heading}</h2>
                <div className="space-y-md">
                  {section.blocks.map((block, index) => {
                    if (block.type === 'paragraph') {
                      return (
                        <p
                          key={`${section.heading}-p-${index}`}
                          className="text-body"
                        >
                          {block.text}
                        </p>
                      )
                    }

                    if (block.type === 'subheading') {
                      return (
                        <p
                          key={`${section.heading}-h-${index}`}
                          className="text-body font-semibold"
                        >
                          {block.text}
                        </p>
                      )
                    }

                    if (block.type === 'orderedList') {
                      return (
                        <ol
                          key={`${section.heading}-ol-${index}`}
                          className="list-decimal list-inside text-body space-y-xs ml-md"
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
                        className="list-disc list-inside text-body space-y-xs ml-md"
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
          </section>
        </main>
    </div>
  )
}

export default Legal
