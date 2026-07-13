export type Project = {
  title: string
  description: string
  image: string
  tech: string[]
  link: string
  projectURL?: string
}

export const projects: Project[] = [
  {
    title: "SnapCharm",
    description: "A modern web app that lets users enhance photos with animated SVG text effects, creative gradients, and stylish visual elements. Built for performance, interactivity, and responsive design, SnapCharm showcases smooth animations and a minimalist aesthetic.",
    image: "/snap-charm.jpg",
    tech: ["React", "Vite", "Tailwind CSS", "GSAP", "SVG"],
    projectURL: "https://github.com/rylsherdamz-rgb/MyPortfolio",
    link: "https://snap-charm.vercel.app/",
  },
  {
    title: "Cadena",
    description: `Cadena is a comprehensive Web3 ecosystem designed to showcase the transformative power of blockchain through a multi-functional dApp that integrates decentralized messaging, secure national budget tracking, and immutable voting systems. The platform features a private, peer-to-peer messaging interface that eliminates centralized oversight, alongside a pioneering "National Budget Tracker" that utilizes blockchain’s transparency to provide citizens with real-time, tamper-proof audits of government spending. Additionally, Cadena incorporates a decentralized voting module that leverages smart contracts to ensure electoral integrity and a fintech layer for managing digital assets, all unified within a modern Next.js interface to prove how decentralized technology can solve real-world problems in governance, communication, and finance.`,
    image: "/cadena/cadena.png",
    tech: ["React", "NextJS", "Tailwind CSS", "GSAP", "Solidty", "Hardhat", "Wagmi", "RainbowKit", "Tanstack Query"],
    projectURL: "https://github.com/rylsherdamz-rgb/Cadena",
    link: "https://cadena-two.vercel.app/",
  },
  {
    title: "Yuwi",
    description: `Yuwi is a warm, lightweight study app built with Expo and React Native. It is designed to make capturing source material, turning it into text, and generating quizzes feel straightforward instead of technical.`,
    image: "/yuwi/yuwi.png",
    tech: ["React Native", "Expo", "NativeWind", "Gemini API"],
    link: "https://yuwi-website.vercel.app/",
  },
  {
    title: "AR-Tetris",
    description: "A webcam-powered Tetris game controlled entirely by computer vision. Play using hand gestures via MediaPipe tracking with both desktop (Python/OpenCV) and web (Django) versions.",
    image: "/ar-tetris/preview.png",
    tech: ["Python", "OpenCV", "Django", "JavaScript", "MediaPipe"],
    link: "https://github.com/rylsherdamz-rgb/AR-Tetris",
  },
  {
    title: "PhotoBooth",
    description: "A feature-rich photo booth application that applies artistic filters and effects to photos. Built with React and Vite, featuring real-time image processing and collage creation.",
    image: "/photobooth/screenshot.png",
    tech: ["React", "Vite", "TypeScript", "CSS"],
    link: "https://github.com/rylsherdamz-rgb/PhotoBooth",
  },
  {
    title: "Noir Wallet",
    description: "IoT-based developer tools for integrating NFC and RFID technology. A mobile wallet application for secure contactless transactions with a minimalist black-and-white design.",
    image: "/noir-wallet/poster.jpg",
    tech: ["React Native", "Expo", "TypeScript", "NFC", "RFID"],
    link: "https://github.com/rylsherdamz-rgb/Noir_Wallet",
  },
  {
    title: "dMessage",
    description: "A fully on-chain decentralized messaging app with end-to-end encryption using X25519 ECDH + AES-GCM-256. Built on Stellar Soroban with IPFS storage for encrypted content.",
    image: "/dmessage/messages.png",
    tech: ["Next.js", "Stellar Soroban", "Rust", "TypeScript", "IPFS", "E2EE"],
    projectURL: "https://github.com/rylsherdamz-rgb/dMessage",
    link: "https://dmessage.vercel.app/",
  },
  {
    title: "Seishin",
    description: "A serverless mobile life manager featuring an AI agent, OCR schedule scanner, P2P chat/video, email IMAP integration, and notification listener. Built with Expo + NativeWind with a minimalist black-and-white design.",
    image: "/seishin/preview.png",
    tech: ["React Native", "Expo", "NativeWind", "TypeScript", "AI"],
    link: "https://github.com/rylsherdamz-rgb/Seishin",
  },
];
