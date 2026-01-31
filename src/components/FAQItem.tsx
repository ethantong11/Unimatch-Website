import React from 'react'

type FAQItemProps = {
  question: string
  answer: React.ReactNode
  className?: string
  dataCursor?: boolean
  summaryClassName?: string
}

function FAQItem({
  question,
  answer,
  className,
  dataCursor,
  summaryClassName,
}: FAQItemProps) {
  return (
    <details
      data-cursor={dataCursor ? 'hover' : undefined}
      className={['group rounded-xl border border-glass-border-strong bg-glass p-sm sm:p-md', className]
        .filter(Boolean)
        .join(' ')}
    >
      <summary
        className={[
          'flex list-none items-center justify-between text-body font-medium',
          summaryClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span>{question}</span>
        <span className="text-lg text-secondary transition-transform duration-300 ease-in-out group-open:rotate-45">
          +
        </span>
      </summary>
      <p className="mt-sm text-body text-secondary">{answer}</p>
    </details>
  )
}

export default FAQItem
