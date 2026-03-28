import { Inter } from "next/font/google";
import "./globals.css";

import type { Metadata, Viewport } from "next";

import { Toaster } from "@/components/ui/sonner";
import { FAVICONS } from "@/const/metadata";
import { cn } from "@/lib/utils";

import { AppProviders } from "./app-providers";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html lang="en">
      <body id="top" className={cn(inter.className, "font-sans text-green-900 antialiased")}>
        <AppProviders>
          <main className="min-h-svh">{children}</main>
          <Toaster position="top-right" />
        </AppProviders>
      </body>
    </html>
  );
};

const generateMetadata = (): Metadata => {
  return {
    title: "App Labeler",
    description: "App Labeler",
    openGraph: {
      title: "App Labeler",
      description: "App Labeler"
    },
    icons: FAVICONS,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false
      }
    }
  };
};

const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export { generateMetadata, viewport };
export default RootLayout;
