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

export const metadata = {
  title: "Forever AI Chatbot",
  description: "Start discovering the FOREVER LIVING products with our AI chatbot.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
         <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-17HDEHBKFH`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-17HDEHBKFH');
          `}
        </Script>
      </body>
    </html>
  );
}
