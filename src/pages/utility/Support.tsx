import { useMemo, useState } from 'react'
import supportContent from '../../content/support.json'
import FAQItem from '../../components/FAQItem'

function Support() {
  const { meta, sections } = supportContent
  const [activeSectionId, setActiveSectionId] = useState(
    sections[0]?.title ?? ''
  )
  const [query, setQuery] = useState('')

  const normalizedQuery = query.trim().toLowerCase()

  const filteredSections = useMemo(() => {
    if (!normalizedQuery) {
      return sections
    }

    return sections
      .map((section) => {
        const matchedTopics = section.topics.filter((topic) => {
          const searchable = [
            topic.title,
            topic.summary,
            topic.body,
            ...(topic.faqs?.flatMap((faq) => [faq.q, faq.a]) ?? []),
          ]
            .join(' ')
            .toLowerCase()
          return searchable.includes(normalizedQuery)
        })

        const sectionMatches =
          section.title.toLowerCase().includes(normalizedQuery) ||
          section.description.toLowerCase().includes(normalizedQuery)

        if (sectionMatches || matchedTopics.length > 0) {
          return {
            ...section,
            topics: sectionMatches ? section.topics : matchedTopics,
          }
        }

        return null
      })
      .filter(Boolean) as typeof sections
  }, [normalizedQuery, sections])

  const matchedQuestions = useMemo(() => {
    if (!normalizedQuery) {
      return []
    }

    const matches: Array<{ q: string; a: string }> = []

    filteredSections.forEach((section) => {
      section.topics.forEach((topic) => {
        const topicFaqs = [{ q: topic.summary, a: topic.body }, ...topic.faqs]
        topicFaqs.forEach((faq) => {
          const searchable = `${faq.q} ${faq.a}`.toLowerCase()
          if (searchable.includes(normalizedQuery)) {
            matches.push({ q: faq.q, a: faq.a })
          }
        })
      })
    })

    return matches
  }, [filteredSections, normalizedQuery])

  const activeSection = useMemo(() => {
    if (!filteredSections.length) {
      return undefined
    }
    return (
      filteredSections.find((section) => section.title === activeSectionId) ??
      filteredSections[0]
    )
  }, [activeSectionId, filteredSections])

  return (
    <main className="relative min-h-screen overflow-hidden bg-support">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 sm:fixed">
        <div className="absolute -left-32 top-[-12rem] hidden h-96 w-96 rounded-full bg-support-splotch-1 blur-[120px] sm:block" />
        <div className="absolute right-[-10rem] bottom-[-14rem] hidden h-[30rem] w-[30rem] rounded-full bg-support-splotch-2 blur-[140px] sm:block" />
        <div className="absolute -left-10 top-6 h-44 w-44 rounded-full bg-support-splotch-3 blur-[70px] sm:hidden" />
      </div>

      {/* Support content */}
      <section className="relative z-content mx-auto flex min-h-screen max-w-6xl flex-col items-center px-lg pb-5xl pt-4xl text-center sm:px-2xl">
        {/* Header */}
        <header>
          <h2 className="mt-3xl sm:mt-6xl text-h2">
            How can we help you today?
          </h2>
        </header>

        {/* Search */}
        <section className="mt-2xl w-full max-w-3xl">
          <label className="sr-only" htmlFor="support-search">
            Search support topics
          </label>
          <div className="flex items-center gap-sm rounded-full border border-glass-border bg-glass px-lg py-md sm:backdrop-blur">
            <svg
              aria-hidden="true"
              className="h-6 w-6 text-secondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35m1.35-4.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
            <input
              id="support-search"
              type="text"
              placeholder="Search support topics"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full bg-transparent text-primary outline-none placeholder:text-secondary/70 caret-primary"
            />
          </div>
        </section>

        {/* Search results or categories */}
        {normalizedQuery ? (
          <section className="mt-2xl w-full max-w-5xl text-left">
            <div className="rounded-3xl border border-glass-border-strong bg-glass p-md sm:p-lg sm:backdrop-blur">
              <p className="text-bodysmall text-secondary">
                Top matches
              </p>
              <div className="mt-md flex flex-col gap-md">
                {matchedQuestions.length ? (
                  matchedQuestions.map((faq) => (
                    <FAQItem key={`${faq.q}-${faq.a}`} question={faq.q} answer={faq.a} />
                  ))
                ) : (
                  <p className="text-body text-secondary">
                    No matching questions found.
                  </p>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section className="mt-md w-full max-w-5xl sm:mt-2xl">
            <nav aria-label="Support categories" className="no-scrollbar flex gap-sm overflow-x-auto pb-xs sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
              {filteredSections.map((section) => {
                const isActive = section.title === activeSectionId
                return (
                  <button
                    key={section.title}
                    type="button"
                    onClick={() => setActiveSectionId(section.title)}
                    aria-pressed={isActive}
                    className={[
                      'whitespace-nowrap rounded-full border px-sm py-xs transition sm:px-lg sm:py-md sm:text-sm',
                      isActive
                        ? 'border-surface-strong bg-surface-strong text-surface-strong-foreground'
                        : 'border-glass-border-strong bg-glass text-primary hover:border-glass-border-strong hover:bg-glass-hover',
                    ].join(' ')}
                  >
                    {section.title}
                  </button>
                )
              })}
            </nav>
          </section>
        )}

        {/* Active category content */}
        {!normalizedQuery && activeSection ? (
          <section className="mt-2xl w-full max-w-5xl text-left sm:mt-3xl">
            <article className="rounded-3xl border border-glass-border-strong bg-glass p-lg sm:p-xl sm:backdrop-blur">
              <p className="text-bodysmall text-secondary">
                {activeSection.description}
              </p>
              <h2 className="mt-sm text-h2">{activeSection.title}</h2>
              <div className="mt-lg flex flex-col gap-md">
                {activeSection.topics.map((topic) => (
                  <article
                    key={topic.slug}
                    className="rounded-2xl border border-glass-border-strong bg-glass p-md sm:p-lg"
                  >
                    <h3 className="text-h3">{topic.title}</h3>
                    <div className="mt-md space-y-md">
                      {[{ q: topic.summary, a: topic.body }, ...topic.faqs].map(
                        (faq) => (
                          <FAQItem
                            key={faq.q}
                            question={faq.q}
                            answer={faq.a}
                            dataCursor
                            summaryClassName="font-normal"
                          />
                        )
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </article>
          </section>
        ) : !normalizedQuery ? (
          <section className="mt-2xl w-full max-w-5xl rounded-3xl border border-glass-border-strong bg-glass p-lg sm:p-xl text-left text-body text-secondary sm:backdrop-blur sm:mt-3xl">
            No results. Try a different keyword.
          </section>
        ) : null}

        {/* Footer CTA */}
        <footer>
          <a
            href="mailto:base.unimatch@gmail.com"
            className="mt-3xl inline-flex items-center justify-center rounded-full border border-glass-border-strong bg-glass px-lg py-sm transition hover:border-glass-border-strong hover:bg-glass-hover"
          >
            Need more help? Email us at base.unimatch@gmail.com
          </a>
        </footer>
      </section>
    </main>
  )
}

export default Support
