import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google"; // Added Space_Grotesk
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" }); // Defined font

export const metadata: Metadata = {
  title: "KODLEARN / Industrial Learning Grid",
  description: "Next-gen engineering mastery through high-frequency sequential units.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-background text-foreground antialiased bg-grid overflow-x-hidden ${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        {/* Minimal Noise Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] grayscale bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50 mix-blend-multiply" />
        
        {/* Subtle Side Accents */}
        <div className="fixed left-0 top-0 h-full w-[2px] bg-primary/20 pointer-events-none" />
        <div className="fixed right-0 top-0 h-full w-[2px] bg-primary/20 pointer-events-none" />
        
        <main className="relative min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
