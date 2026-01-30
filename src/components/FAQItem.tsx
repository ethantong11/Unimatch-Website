import React from 'react'

type FAQItemProps = {
  question: string
  answer: string
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
      className={['group rounded-xl border border-glass-border-strong bg-glass p-3 sm:p-4', className]
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
      <p className="mt-3 text-body text-secondary">{answer}</p>
    </details>
  )
}

export default FAQItem
