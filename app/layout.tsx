import type { Metadata } from "next";
import "@/styles/globals.css";
import LayoutWrapper from "@/components/layout/layout-wrapper";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Programmers' Den",
  description: "A community for programmers to share and learn.",
  keywords: [
    "programming",
    "community",
    "coding",
    "developers",
    "TSU",
    "Tarlac State University",
    "Programmers' Den",
    "progden"
  ],
  // TODO: put the authors in an array
  authors: [
    {
      name: "John Andrei Tacujan",
      url: "https://dreidevs-portfolio.vercel.app",
    },
    {
      name: "Marc Jersey Castro",
      url: "wala pa",
    },
    {
      name: "King Paolo Franco",
      url: "https://github.com/sudo-paoo",
    },
    {
      name: "Gilbert Cura",
      url: "https://github.com/Gilbert-Dev17",
    },
    {
      name: "Eithan Matthew Malonzo",
      url: "https://github.com/mintyZer0",
    },
    {
      name: "Kharl Asuncion",
      url: "https://www.linkedin.com/in/kharl-asuncion-b7995b348/",
    },
    {
      name: "Mark Louis Cadiente",
      url: "https://github.com/RimeValkyris",
    }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <head>
          <link rel="icon" href="/assets/pd-logo.png" />
        </head>
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster richColors />
      </body>
    </html>
  );
}
