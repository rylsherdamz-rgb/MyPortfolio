import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Richie Christian De Guzman",
  description: "Hi I'm Richie Christian Christian De Guzman Full-stack web developer with 3 years of experience designing, developing, and deploying scalable web and mobile applications. Proficient in React, React Native, Next.js, MERN stack (MongoDB, Express, React, Node.js), HTML, CSS, JavaScript, and Python. Experienced with Supabase, Firebase, Appwrite, Vercel, Expo, and full CRUD-based system development. Skilled in Ethereum smart contract development using Hardhat and Ethers.js, version control with Git and GitHub, and building responsive, modern interfaces with Tailwind CSS. Seeking to contribute strong full-stack and Web3 expertise to a forward-thinking development team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
