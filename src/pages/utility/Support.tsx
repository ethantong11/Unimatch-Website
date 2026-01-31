import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import supportContent from '../../content/support.json'
import FAQItem from '../../components/FAQItem'

const TERMS_QUESTION = 'Where can I read the full terms of service?'
const PRIVACY_QUESTION = 'Where can I read the Privacy Policy?'
const EVENTS_QUESTION = 'Where can I read the Events disclaimer?'

const normalize = (text: string) =>
  text.toLowerCase().trim().replace(/\s+/g, ' ')

const tokenize = (query: string) =>
  normalize(query)
    .split(' ')
    .filter((term) => term.length > 1)

const matchesAllTerms = (searchable: string, terms: string[]) =>
  terms.every((term) => searchable.includes(term))

const scoreMatch = (
  parts: {
    title: string
    question: string
    answer: string
    sectionTitle: string
    sectionDescription: string
  },
  terms: string[],
  normalizedQuery: string
) => {
  const scoreFor = (text: string, weight: number) =>
    terms.reduce(
      (score, term) => (text.includes(term) ? score + weight : score),
      0
    )

  const phraseBonus = Object.values(parts).some((text) =>
    text.includes(normalizedQuery)
  )

  return (
    scoreFor(parts.title, 5) +
    scoreFor(parts.question, 3) +
    scoreFor(parts.answer, 1) +
    scoreFor(parts.sectionTitle, 4) +
    scoreFor(parts.sectionDescription, 2) +
    (phraseBonus ? 6 : 0)
  )
}

const renderAnswer = (question: string, answer: string) => {
  if (question === TERMS_QUESTION) {
    return (
      <>
        You can access them from the app settings or our website{' '}
        <Link className="underline" to="/legal?policy=terms">
          here
        </Link>
        .
      </>
    )
  }

  if (question === PRIVACY_QUESTION) {
    return (
      <>
        You can access it from the app settings or our website{' '}
        <Link className="underline" to="/legal?policy=privacy">
          here
        </Link>
        .
      </>
    )
  }

  if (question === EVENTS_QUESTION) {
    return (
      <>
        You can access it from the app settings or our website{' '}
        <Link className="underline" to="/legal?policy=events-disclaimer">
          here
        </Link>
        .
      </>
    )
  }

  return answer
}

function Support() {
  const { meta, sections } = supportContent
  const [activeSectionId, setActiveSectionId] = useState(
    sections[0]?.title ?? ''
  )
  const [query, setQuery] = useState('')

  const normalizedQuery = normalize(query)

  const cards = useMemo(() => {
    return sections.flatMap((section) => {
      return section.topics.flatMap((topic) => {
        const topicFaqs = (topic.faqs ?? []).map((faq) => ({
          q: faq.q,
          a: faq.a,
        }))

        return topicFaqs.map((card) => {
          const searchable = normalize(
            [
              card.q,
              card.a,
              topic.title,
              section.title,
              section.description,
            ].join(' ')
          )

          return {
            ...card,
            sectionTitle: section.title,
            sectionDescription: section.description,
            topicTitle: topic.title,
            slug: topic.slug,
            searchable,
          }
        })
      })
    })
  }, [sections])

  const rankedCards = useMemo(() => {
    if (!normalizedQuery) {
      return []
    }

    const terms = tokenize(normalizedQuery)
    const matches = cards
      .filter((card) => matchesAllTerms(card.searchable, terms))
      .map((card) => {
        const score = scoreMatch(
          {
            title: normalize(card.topicTitle),
            question: normalize(card.q),
            answer: normalize(card.a),
            sectionTitle: normalize(card.sectionTitle),
            sectionDescription: normalize(card.sectionDescription),
          },
          terms,
          normalizedQuery
        )

        const phraseMatch = card.searchable.includes(normalizedQuery)
        return { ...card, score, phraseMatch }
      })
      .sort((a, b) => {
        if (a.phraseMatch !== b.phraseMatch) {
          return a.phraseMatch ? -1 : 1
        }
        if (b.score !== a.score) {
          return b.score - a.score
        }
        return a.q.length - b.q.length
      })

    const seen = new Set<string>()
    const deduped = []

    for (const match of matches) {
      const key = `${match.sectionTitle}|||${match.slug}|||${match.q}|||${match.a}`
      if (seen.has(key)) continue
      seen.add(key)
      deduped.push(match)
      if (deduped.length >= 20) break
    }

    return deduped
  }, [cards, normalizedQuery])

  const filteredSections = useMemo(() => {
    if (!normalizedQuery) {
      return sections
    }

    const terms = tokenize(normalizedQuery)

    return sections
      .map((section) => {
        const sectionSearchable = normalize(
          [section.title, section.description].join(' ')
        )
        const sectionMatches = matchesAllTerms(sectionSearchable, terms)

        const matchedTopics = section.topics.filter((topic) => {
          const topicSearchable = normalize(
            [
              topic.title,
              ...(topic.faqs ?? []).flatMap((faq) => [faq.q, faq.a]),
            ].join(' ')
          )
          return matchesAllTerms(topicSearchable, terms)
        })

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

  const activeSection = useMemo(() => {
    if (!filteredSections.length) {
      return undefined
    }
    return (
      filteredSections.find((section) => section.title === activeSectionId) ??
      filteredSections[0]
    )
  }, [activeSectionId, filteredSections])

  useEffect(() => {
    if (!normalizedQuery) {
      if (!filteredSections.some((section) => section.title === activeSectionId)) {
        setActiveSectionId(filteredSections[0]?.title ?? '')
      }
    }
  }, [normalizedQuery, filteredSections, activeSectionId])

  return (
    <div className="relative min-h-screen overflow-hidden bg-support">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 sm:fixed">
        <div className="absolute -left-32 top-[-12rem] hidden h-96 w-96 rounded-full bg-support-splotch-1 blur-[120px] sm:block" />
        <div className="absolute right-[-10rem] bottom-[-14rem] hidden h-[30rem] w-[30rem] rounded-full bg-support-splotch-2 blur-[140px] sm:block" />
        <div className="absolute -left-10 top-6 h-44 w-44 rounded-full bg-support-splotch-3 blur-[70px] sm:hidden" />
      </div>

      {/* Support content */}
      <main className="relative z-content mx-auto flex min-h-screen max-w-6xl flex-col items-center px-md pt-4xl pb-4xl text-center">
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
          <div
            className="flex items-center gap-sm rounded-full border border-glass-border bg-glass px-lg py-md sm:backdrop-blur"
            data-cursor="hover"
          >
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
                {rankedCards.length ? (
                  rankedCards.map((card) => (
                    <FAQItem
                      key={`${card.sectionTitle}-${card.slug}-${card.q}`}
                      question={card.q}
                      answer={renderAnswer(card.q, card.a)}
                    />
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
                      'whitespace-nowrap rounded-full border px-sm py-xs text-bodysmall transition sm:px-lg sm:py-md sm:text-body',
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
            <article className="rounded-3xl border border-glass-border-strong bg-glass p-md sm:p-lg sm:backdrop-blur">
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
                      {(topic.faqs ?? []).map((faq) => (
                        <FAQItem
                          key={faq.q}
                          question={faq.q}
                          answer={renderAnswer(faq.q, faq.a)}
                          dataCursor
                          summaryClassName="font-normal"
                        />
                      ))}
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
            className="mt-3xl inline-flex items-center justify-center rounded-full border border-glass-border-strong bg-glass px-lg py-sm text-body transition hover:border-glass-border-strong hover:bg-glass-hover"
          >
            Need more help? Email us at base.unimatch@gmail.com
          </a>
        </footer>
      </main>
    </div>
  )
}

export default Support
