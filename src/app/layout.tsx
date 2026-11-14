
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

// #region COMPONENT IMPORTS

import Navbar from "@/components/layout/Navbar";
import ScrollPageNavigation from "@/components/layout/ScrollPageNavigation";
import NeroChatbot from "@/components/chatbot/NeroChatbot";

// #endregion

// #region FONTS

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// #endregion

// #region WEBSITE METADATA

export const metadata: Metadata = {
  title: "My Universe | Portfolio",
  description:
    "Explore my universe of projects, education, technical skills, and professional experiences.",
};

// #endregion

// #region ROOT LAYOUT

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
        `}
      >
        {/* #region NAVIGATION */}

        <Navbar />

        {/* #endregion */}

        {/* #region AUTOMATIC PAGE NAVIGATION */}

        <ScrollPageNavigation />

        {/* #endregion */}

        {/* #region PAGE CONTENT */}

        {children}

        {/* #endregion */}

        {/* #region NERO AI CHATBOT */}

        <NeroChatbot />

        {/* #endregion */}
      </body>
    </html>
  );
}

// #endregion
