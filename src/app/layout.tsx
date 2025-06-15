import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SceneCanvas from "./components/SceneCanvas";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Takeda Syuri ",
  description: "My website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased
                    relative w-full h-screen overflow-hidden`}
      >
        
        <div className="absolute inset-0 z-0">
          <SceneCanvas />
        </div>

        <div className="relative z-20">{children}</div>
      </body>
    </html>
  );
}
