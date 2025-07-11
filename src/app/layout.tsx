
import type { Metadata } from 'next';
import './globals.css';
import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { Toaster } from '@/components/ui/toaster';
import { siteConfig } from '@/config/site';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { PageTransition } from '@/components/layout/page-transition';
import { AddPropertyCtaButton } from '@/components/shared/add-property-cta-button';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["property listing", "real estate", "india property", "rent property", "buy property"],
  authors: [
    {
      name: "Post My Property Team",
      url: siteConfig.url,
    },
  ],
  creator: "Post My Property Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@YourTwitterHandle", // Replace with actual twitter handle
  },
  icons: {
    icon: "/favicon.ico", // Ensure you have a favicon.ico in your public folder
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-background font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <AppHeader />
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <AppFooter />
          </div>
          <Toaster />
          <AddPropertyCtaButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
