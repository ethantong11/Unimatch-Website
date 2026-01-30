import { useEffect, useMemo, useState } from 'react'
import supportContent from '../assets/support-content.json'

function Support() {
  const { meta, sections } = supportContent
  const [activeSectionTitle, setActiveSectionTitle] = useState(
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
      filteredSections.find(
        (section) => section.title === activeSectionTitle
      ) ?? filteredSections[0]
    )
  }, [activeSectionTitle, filteredSections])

  useEffect(() => {
    if (!activeSectionTitle && filteredSections[0]) {
      setActiveSectionTitle(filteredSections[0].title)
    }
  }, [activeSectionTitle, filteredSections])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f6f2ee] dark:bg-[#0c0c0c]">
      <div className="pointer-events-none absolute inset-0 sm:fixed">
        <div className="absolute -left-32 top-[-12rem] hidden h-96 w-96 rounded-full bg-[#f2c7a1]/80 blur-[120px] dark:bg-[#5a3c1f]/80 sm:block" />
        <div className="absolute right-[-10rem] bottom-[-14rem] hidden h-[30rem] w-[30rem] rounded-full bg-[#c79bff]/70 blur-[140px] dark:bg-[#4b2a7a]/80 sm:block" />
        <div className="absolute -left-10 top-6 h-44 w-44 rounded-full bg-[#caa8ff]/50 blur-[70px] dark:bg-[#4b2a7a]/50 sm:hidden" />
      </div>

      <div className="relative z-content mx-auto flex min-h-screen max-w-6xl flex-col items-center px-6 pb-24 pt-20 text-center sm:px-10">
        <h2 className="mt-16 sm:mt-36 text-h2 md:text-h2-md">
          How can we help you today?
        </h2>
        <p className="mt-3 max-w-2xl text-body text-muted-foreground hidden sm:block">
          Browse guidance for setup, matching, safety, billing, and everything
          else you need to get the most out of {meta.product}.
        </p>

        <div className="mt-10 w-full max-w-3xl">
          <label className="sr-only" htmlFor="support-search">
            Search support topics
          </label>
          <div className="flex items-center gap-3 rounded-full border border-white/60 bg-white/50 px-6 py-4 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.5)] sm:backdrop-blur dark:border-white/10 dark:bg-white/5">
            <svg
              aria-hidden="true"
              className="h-6 w-6 text-muted-foreground"
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
              className="w-full bg-transparent text-lg text-[#0c0c0c] outline-none placeholder:text-muted-foreground/70 caret-[#0c0c0c] dark:text-white dark:caret-white"
            />
          </div>
        </div>

        {normalizedQuery ? (
          <div className="mt-12 w-full max-w-5xl text-left">
            <div className="rounded-3xl border border-white/70 bg-white/50 p-4 sm:p-6 shadow-[0_20px_50px_-35px_rgba(0,0,0,0.45)] sm:backdrop-blur dark:border-white/10 dark:bg-white/5">
              <p className="text-bodysmall text-muted-foreground">
                Top matches
              </p>
              <div className="mt-4 flex flex-col gap-4">
                {matchedQuestions.length ? (
                  matchedQuestions.map((faq) => (
                    <details
                      key={`${faq.q}-${faq.a}`}
                      className="group rounded-xl border border-foreground/10 bg-white/50 p-3 sm:p-4 dark:border-white/10 dark:bg-white/5"
                    >
                      <summary className="flex list-none items-center justify-between text-body font-medium">
                        <span>{faq.q}</span>
                        <span className="text-lg text-muted-foreground transition-transform duration-200 group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <p className="mt-3 text-body text-muted-foreground">
                        {faq.a}
                      </p>
                    </details>
                  ))
                ) : (
                  <p className="text-body text-muted-foreground">
                    No matching questions found.
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 w-full max-w-5xl sm:mt-12">
            <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
              {filteredSections.map((section) => {
                const isActive = section.title === activeSectionTitle
                return (
                  <button
                    key={section.title}
                    type="button"
                    onClick={() => setActiveSectionTitle(section.title)}
                    aria-pressed={isActive}
                    className={[
                      'whitespace-nowrap rounded-full border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] shadow-sm transition sm:px-6 sm:py-4 sm:text-sm sm:font-medium',
                      isActive
                        ? 'border-[#1c1b1a] bg-[#1c1b1a] text-white dark:border-white dark:bg-white dark:text-[#0c0c0c]'
                        : 'border-white/70 bg-white/50 text-[#1c1b1a] hover:border-white hover:bg-white/70 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/20 dark:hover:bg-white/10',
                    ].join(' ')}
                  >
                    {section.title}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {!normalizedQuery && activeSection ? (
          <div className="mt-8 w-full max-w-5xl text-left sm:mt-14">
            <article className="rounded-3xl border border-white/70 bg-white/50 p-5 sm:p-8 shadow-[0_20px_50px_-35px_rgba(0,0,0,0.45)] sm:backdrop-blur dark:border-white/10 dark:bg-white/5">
              <p className="text-bodysmall text-muted-foreground">
                {activeSection.description}
              </p>
              <h2 className="mt-3 text-h2">{activeSection.title}</h2>
              <div className="mt-6 flex flex-col gap-4">
                {activeSection.topics.map((topic) => (
                  <article
                    key={topic.slug}
                    className="rounded-2xl border border-foreground/10 bg-white/50 p-4 sm:p-5 dark:border-white/10 dark:bg-white/5"
                  >
                    <h3 className="text-h3">{topic.title}</h3>
                    <div className="mt-4 space-y-4">
                      {[{ q: topic.summary, a: topic.body }, ...topic.faqs].map(
                        (faq) => (
                          <details
                            key={faq.q}
                            data-cursor="hover"
                            className="group rounded-xl border border-foreground/10 bg-white/50 p-3 sm:p-4 dark:border-white/10 dark:bg-white/5"
                          >
                            <summary className="flex list-none items-center justify-between text-body font-medium">
                              <span>{faq.q}</span>
                              <span className="text-lg text-muted-foreground transition-transform duration-200 group-open:rotate-45">
                                +
                              </span>
                            </summary>
                            <p className="mt-3 text-body text-muted-foreground">
                              {faq.a}
                            </p>
                          </details>
                        )
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </article>
          </div>
        ) : !normalizedQuery ? (
          <div className="mt-8 w-full max-w-5xl rounded-3xl border border-white/70 bg-white/50 p-5 sm:p-8 text-left text-body text-muted-foreground shadow-[0_20px_50px_-35px_rgba(0,0,0,0.45)] sm:backdrop-blur dark:border-white/10 dark:bg-white/5 sm:mt-14">
            No results. Try a different keyword.
          </div>
        ) : null}

        <a
          href="mailto:base.unimatch@gmail.com"
          className="mt-16 inline-flex items-center justify-center rounded-full border border-white/80 bg-white/50 px-6 py-3 text-sm uppercase tracking-[0.08em] transition hover:border-white hover:bg-white/70 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10"
        >
          Need more help? Email us at base.unimatch@gmail.com
        </a>
      </div>
    </div>
  )
}

export default Support
