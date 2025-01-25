import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Rprovider from "./R-Provider";

const geistSans = localFont({
  src: "./_fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./_fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ClassMind | Your choice doc store",
  description:
    "Optimized to store student documents and get good summary from them ",
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
        <Rprovider>{children}</Rprovider>
        <div className="text-[10px] text-blue-500 fixed bottom-1 left-[50%]">
          &copy; LVN Techies
        </div>
      </body>
    </html>
  );
}
