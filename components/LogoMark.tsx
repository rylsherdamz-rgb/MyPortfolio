// The "R" mark, drawn on the same 64-unit grid as app/icon.svg. `ink` is the
// frame and offset shadow; it defaults to the theme's line colour.
export default function LogoMark({
  className,
  ink = "var(--line)",
}: {
  className?: string
  ink?: string
}) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <rect x="8" y="8" width="54" height="54" fill={ink} />
      <rect x="2" y="2" width="54" height="54" fill={ink} />
      <rect x="6" y="6" width="46" height="46" fill="var(--accent)" />
      <path
        fill="#ffffff"
        fillRule="evenodd"
        d="M16 13H35.5Q44 13 44 21.5Q44 28 39 30.5L45 47H35.5L30.5 32.5H25V47H16ZM25 20.5V25.5H33Q35.5 25.5 35.5 23Q35.5 20.5 33 20.5Z"
      />
    </svg>
  )
}
