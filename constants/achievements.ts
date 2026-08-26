export type Achievement = {
  title: string
  subtitle: string
  year: string
  icon: string
  highlight?: boolean
}

export const certifications: Achievement[] = [
  {
    title: "Meta Back-End Developer Professional Certificate",
    subtitle: "Backend engineering, APIs, and databases",
    year: "2026",
    icon: "simple-icons:meta",
  },
  {
    title: "Google Cybersecurity Professional Certificate",
    subtitle: "Security fundamentals, threat detection, incident response",
    year: "2026",
    icon: "mdi:shield-check",
  },
  {
    title: "Google IT Support Professional Certificate",
    subtitle: "Systems administration, networking, troubleshooting",
    year: "2026",
    icon: "mdi:laptop",
  },
  {
    title: "Google Cloud Arcade Facilitator 2026",
    subtitle: "Selected to lead and facilitate cloud learning",
    year: "2026",
    icon: "mdi:cloud-check",
    highlight: true,
  },
]

export const honors: Achievement[] = [
  {
    title: "Champion: AWS Agentic Football Hackathon",
    subtitle: "AWS User Group e:Novators PH: agentic AI track",
    year: "2026",
    icon: "mdi:trophy",
    highlight: true,
  },
  {
    title: "Blue Team Champion: SEEN 2026",
    subtitle: "Cyber Rumble CTF: defensive security track",
    year: "2026",
    icon: "mdi:shield-crown",
    highlight: true,
  },
  {
    title: "Top 10 Finalist: Agora Hackathon Philippines",
    subtitle: "ClawdBot: next-gen AI sales agent",
    year: "2026",
    icon: "mdi:trophy-outline",
  },
  {
    title: "Finalist: Cryptita Builder Showcase",
    subtitle: "Built and presented live in the showcase",
    year: "2026",
    icon: "mdi:rocket-launch",
  },
  {
    title: "Finalist: Startup QC Student Competition",
    subtitle: "Squad 3: student founder track",
    year: "2026",
    icon: "mdi:rocket-launch",
  },
]

export const stats = [
  { value: "3+", label: "Years building" },
  { value: "40+", label: "Repos shipped" },
  { value: "5", label: "Hackathon finals" },
  { value: "4", label: "Certifications" },
]