import { email } from "@/constants/socials"

export const developer = {
  name: "Richie Christian De Guzman",
  email,
  location: "Antipolo, Rizal, Philippines",
}

export type PolicySection = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export type PublishedApp = {
  slug: string
  name: string
  tagline: string
  description: string
  icon: string
  // Phone screenshots (portrait, 1:2), shown in order on the app page.
  screenshots: { src: string; alt: string }[]
  category: string
  packageName: string
  // "coming-soon" hides the Play Store button until the listing is live.
  status: "live" | "coming-soon"
  playStoreUrl: string
  sourceUrl?: string
  minAndroid: string
  features: { title: string; body: string }[]
  permissions: { name: string; why: string }[]
  dataSafety: { label: string; value: string }[]
  // ISO date. Bump it whenever the policy text changes.
  policyUpdated: string
  privacy: PolicySection[]
  extraTerms?: PolicySection[]
  deletion: { steps: string[]; notes: string[] }
}

export const apps: PublishedApp[] = [
  {
    slug: "seishin",
    name: "Seishin",
    tagline: "Your calendar, tasks and notes, with an AI assistant that lives on your phone.",
    description:
      "Seishin is an offline-first life manager for Android. Plan your day on a timeline, keep tasks and notes in one place, scan printed schedules with the camera, and ask an AI assistant to add things for you. There is no account and no Seishin server: everything you create stays on your device.",
    icon: "/apps/seishin/icon.png",
    screenshots: [
      { src: "/apps/seishin/screenshots/03-tasks.png", alt: "Tasks grouped into Overdue, Today and Upcoming" },
      { src: "/apps/seishin/screenshots/02-agenda.png", alt: "Agenda view listing today's tasks and events" },
      { src: "/apps/seishin/screenshots/09-upcoming.png", alt: "Upcoming view with tasks and the next events" },
      { src: "/apps/seishin/screenshots/04-add-task.png", alt: "Adding a task with Today, Tomorrow and Next week chips" },
      { src: "/apps/seishin/screenshots/05-task-detail.png", alt: "A checklist task with progress and reminder settings" },
      { src: "/apps/seishin/screenshots/06-notes.png", alt: "Coloured notes grid with a pinned note" },
      { src: "/apps/seishin/screenshots/07-alarm.png", alt: "Full-screen event alarm with Snooze and Dismiss" },
      { src: "/apps/seishin/screenshots/08-themes.png", alt: "Theme and accent colour settings" },
    ],
    category: "Productivity",
    packageName: "com.seishin.app",
    status: "coming-soon",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.seishin.app",
    sourceUrl: "https://github.com/rylsherdamz-rgb/Seishin",
    minAndroid: "Android 6.0+",
    features: [
      {
        title: "Calendar that thinks in days",
        body: "Timeline, agenda and upcoming views with recurring events, all-day items and quick add like “Gym tomorrow 6pm for 1h”.",
      },
      {
        title: "Tasks that won't let you forget",
        body: "Due dates, priorities and persistent reminders you can mark done or snooze right from the notification.",
      },
      {
        title: "Notes with attachments",
        body: "Colored notes with photos and files, plus YouTube summaries from a pasted link.",
      },
      {
        title: "Scan a schedule",
        body: "Point the camera at a printed timetable or flyer. Text is read on the device and turned into events.",
      },
      {
        title: "AI assistant, your choice of brain",
        body: "Run a local model completely offline, or plug in your own NVIDIA NIM key for a cloud model. The assistant can add events, tasks and notes for you.",
      },
      {
        title: "Widgets and sync",
        body: "Five home-screen widgets, two-way sync with your phone's calendars, and optional Notion, Todoist and ICS feed connectors.",
      },
    ],
    permissions: [
      { name: "Camera & photos", why: "Scan schedules and attach images to notes. Only used when you start a scan or pick a photo." },
      { name: "Calendar", why: "Optional two-way sync with the calendars already on your phone (Google, Outlook, Samsung)." },
      { name: "Notifications", why: "Show event alarms and task reminders." },
      { name: "Alarms & reminders (exact alarms)", why: "Fire reminders at the exact minute you set, not whenever the system gets around to it." },
      { name: "Run at startup", why: "Re-schedule your reminders after the phone restarts." },
      { name: "Display over other apps", why: "Show the full-screen alarm when an event starts." },
      { name: "Notification access (optional)", why: "If you turn it on, Seishin reads incoming notifications so it can suggest events from them. Off by default." },
      { name: "Internet", why: "Only for features you turn on: cloud AI, connectors, calendar feeds and YouTube summaries." },
    ],
    dataSafety: [
      { label: "Account required", value: "No" },
      { label: "Data collected by the developer", value: "None" },
      { label: "Ads", value: "None" },
      { label: "Analytics or tracking", value: "None" },
      { label: "Where your data lives", value: "On your device" },
      { label: "Sent to third parties", value: "Only services you connect yourself" },
      { label: "Delete everything", value: "Settings → Factory reset, or uninstall" },
    ],
    policyUpdated: "2026-10-22",
    privacy: [
      {
        heading: "The short version",
        paragraphs: [
          "Seishin has no account system and no backend server. I (the developer) do not collect, receive, store, sell or share any of your personal data. Your events, tasks, notes, attachments and settings are stored only on your device.",
          "Some optional features talk to outside services. They only run if you turn them on, and the data goes directly from your phone to that service, never through me. Each one is described below.",
        ],
      },
      {
        heading: "Data stored on your device",
        bullets: [
          "Events, tasks, notes, attachments, assistant chat history and app settings, stored in the app's private storage.",
          "API keys and connector tokens you enter (NVIDIA NIM, Notion, Todoist), stored encrypted in the Android Keystore.",
          "Any local AI model file you load, kept in the app's storage.",
          "This data is removed when you use Factory reset or uninstall the app. Seishin doesn't send it to any cloud backup; a backup only exists if you export one yourself.",
        ],
      },
      {
        heading: "Camera, photos and text recognition",
        paragraphs: [
          "When you scan a schedule or attach a photo, Seishin uses the camera or your photo library only for that action. Text is read on the device using Google ML Kit's on-device text recognition; the image is not uploaded by Seishin. Google may collect limited diagnostic information about ML Kit's performance as described in Google's ML Kit terms.",
        ],
      },
      {
        heading: "Calendar access",
        paragraphs: [
          "If you enable calendar sync, Seishin reads and writes events in the calendars on your phone so the two stay in step. Those calendars may in turn be synced by their own provider (for example Google Calendar) under that provider's policy. Seishin does not send calendar data anywhere else.",
        ],
      },
      {
        heading: "Notification access (optional)",
        paragraphs: [
          "Android lets you grant Seishin access to your notifications. This is off unless you turn it on in system settings. When on, Seishin reads the title, text and app name of incoming notifications to detect dates and suggest events. Those items are kept in Seishin's on-device inbox and are not transmitted. You can revoke access at any time in Android Settings → Notifications → Device & app notifications.",
        ],
      },
      {
        heading: "AI assistant",
        bullets: [
          "Local model: when you use an on-device model, your prompts and the context the assistant reads (such as your events, tasks and notes) are processed entirely on your phone.",
          "Cloud model (optional): if you add your own NVIDIA NIM API key, your prompts and the context needed to answer them are sent to NVIDIA's API (or the custom endpoint you set) to generate a reply. That processing is governed by NVIDIA's privacy policy and your agreement with them. Do not include information in a prompt that you don't want shared with that provider.",
        ],
      },
      {
        heading: "Connectors and feeds (optional)",
        bullets: [
          "Notion and Todoist: using the token you provide, Seishin reads and updates your items directly through their official APIs. Their privacy policies apply to data held on their side.",
          "Calendar feeds (ICS): Seishin downloads the feed URLs you add. The feed host sees a normal web request from your phone.",
          "YouTube summaries: when you paste a link, Seishin fetches that video's details and transcript from YouTube. If you use the cloud model, the transcript is sent to it for summarising.",
        ],
      },
      {
        heading: "Backups",
        paragraphs: [
          "Back up now creates a file containing your Seishin data and hands it to the Android share sheet, so you choose where it goes (your device, Google Drive, an SD card, and so on). The file is not encrypted, so store it somewhere you trust. Restoring reads a backup file you pick.",
        ],
      },
      {
        heading: "What I don't do",
        bullets: [
          "No advertising and no advertising IDs.",
          "No analytics, crash reporting or tracking SDKs.",
          "No selling or sharing of data, because I never receive any.",
        ],
      },
      {
        heading: "Children",
        paragraphs: [
          "Seishin is a general productivity app and is not directed at children under 13. Since no personal data is collected, none is knowingly collected from children.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "Because your data is only on your device, you already have full control: you can view, edit, export and delete all of it inside the app. If you are in the Philippines, the Data Privacy Act of 2012 (RA 10173) applies; elsewhere, your local data-protection law applies. Either way, you can contact me with any privacy question using the details below.",
        ],
      },
      {
        heading: "Changes to this policy",
        paragraphs: [
          "If Seishin starts handling data differently, this page will be updated before that version is released and the date at the top will change. Significant changes will also be noted in the Play Store release notes.",
        ],
      },
    ],
    extraTerms: [
      {
        heading: "AI output",
        paragraphs: [
          "The assistant can be wrong. It may misread a schedule, pick the wrong date or summarise a video inaccurately. Check anything important before relying on it. When you use a cloud model, you are responsible for complying with that provider's terms and for any costs on your API key.",
        ],
      },
      {
        heading: "Reminders",
        paragraphs: [
          "Seishin does its best to fire reminders on time, but delivery depends on Android, your device's battery optimisation and the permissions you grant. Don't rely on Seishin as the only reminder for anything critical, such as medication or safety-related tasks.",
        ],
      },
    ],
    deletion: {
      steps: [
        "Open Seishin and go to the Settings tab.",
        "Tap Factory reset.",
        "Confirm. All events, tasks, notes, attachments, chat history, saved keys and tokens, and settings are erased from the device.",
      ],
      notes: [
        "Uninstalling Seishin also deletes all of its data from your device.",
        "Backup files you exported yourself are not touched. Delete them from wherever you saved them.",
        "Data you synced to your phone's calendars, Notion or Todoist stays in those services. Remove it there, and revoke the tokens you created for Seishin in their settings.",
        "There is no Seishin account and no server copy, so there is nothing for me to delete on my side. You can still email me and I'll confirm that.",
      ],
    },
  },
]

export function getApp(slug: string) {
  return apps.find((a) => a.slug === slug)
}

export function baseTerms(app: PublishedApp): PolicySection[] {
  return [
    {
      heading: "Agreement",
      paragraphs: [
        `By downloading or using ${app.name}, you agree to these terms. If you don't agree, please don't use the app. ${app.name} is made by ${developer.name}, an independent developer based in ${developer.location}.`,
      ],
    },
    {
      heading: "License",
      paragraphs: [
        `You may install and use ${app.name} on devices you own or control for personal or work use. Don't resell it, misrepresent it as your own, or use it to break the law or harm others.`,
      ],
    },
    {
      heading: "Your content",
      paragraphs: [
        `Everything you create in ${app.name} belongs to you. It's stored on your device, so keeping backups is your responsibility. How data is handled is described in the privacy policy.`,
      ],
    },
    {
      heading: "Third-party services",
      paragraphs: [
        "Optional features may connect to services run by other companies. Your use of those services is governed by their own terms, and I'm not responsible for their availability or behaviour.",
      ],
    },
    {
      heading: "No warranty",
      paragraphs: [
        `${app.name} is provided “as is”, without warranties of any kind. I work to keep it reliable, but I can't promise it will be error-free or always available.`,
      ],
    },
    {
      heading: "Limitation of liability",
      paragraphs: [
        `To the fullest extent allowed by law, I'm not liable for any indirect or consequential loss, including lost data, missed appointments or lost profits, arising from your use of ${app.name}.`,
      ],
    },
    ...(app.extraTerms ?? []),
    {
      heading: "Changes and termination",
      paragraphs: [
        `These terms may be updated as the app changes; the date at the top will reflect the latest version. You can stop using ${app.name} at any time by uninstalling it.`,
      ],
    },
    {
      heading: "Governing law",
      paragraphs: [
        "These terms are governed by the laws of the Republic of the Philippines, without overriding any consumer protections you have where you live.",
      ],
    },
  ]
}
