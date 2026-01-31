import React, { useMemo } from 'react'
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

  const activePolicy = useMemo(() => {
    return policies.find((policy) => policy.id === activePolicyId) ?? policies[0]
  }, [activePolicyId])

  const handlePolicyChange = (policyId: string) => {
    setSearchParams({ policy: policyId })
  }

  return (
    <div className="relative min-h-screen mx-auto flex-col gap-2xl py-5xl sm:px-md lg:px-lg lg:pl-[calc(16rem+2rem)]">
        <aside
          className="fixed left-4 right-4 z-10 bottom-[calc(0.5rem+env(safe-area-inset-bottom))] lg:fixed lg:left-auto lg:right-auto lg:top-44 lg:bottom-auto lg:w-64"
          style={{ left: 'max(1.5rem, calc(50% - 700px))' }}
        >
          <div className="rounded-[2rem] border border-outline-subtle bg-glass-subtle p-xs backdrop-blur-md lg:border-transparent lg:bg-transparent lg:backdrop-blur-0 lg:rounded-none lg:p-0">
            <div className="flex flex-row flex-wrap gap-xs lg:flex-col">
              {policies.map((policy) => {
                const isActive = policy.id === activePolicy.id
                return (
                  <button
                    key={policy.id}
                    type="button"
                    onClick={() => handlePolicyChange(policy.id)}
                    className={`flex-1 rounded-[1.25rem] px-sm py-xs text-center text-sm transition-colors lg:flex-none lg:text-left ${
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
          </div>
        </aside>

        <main className="max-w-5xl px-md sm:px-lg md:px-xl md:py-2xl lg:px-2xl">
          {/* Header Section */}
          <section className="mb-2xl">
            <h2 className="text-h2 mb-xs">
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
                        <h3
                          key={`${section.heading}-h-${index}`}
                          className="text-h3"
                        >
                          {block.text}
                        </h3>
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
