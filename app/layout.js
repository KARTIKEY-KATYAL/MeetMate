import localFont from "next/font/local";
import Head from "next/head";
import "./globals.css";
import Header from "@/components/Header";
import {  ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "MeetMate",
  description: "Schedule your meeting on the go",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <Head>
        {/* Importing Google Fonts */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Noto+Sans&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Sofadi+One&display=swap"
          />
      </Head>
      <body
        className={` mm-font-sofadi-one antialiased`}
        >
        <Header/>
        <main className="min-h-screen bg-gradient-to-b from-white to to-blue-200">
        {children}
        </main>
        <footer>
          <div className="container mx-auto px-4 text-center text-gray-600">
          <p>Made By Kartikey Katyal</p>
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
