import type { Metadata, Viewport } from "next";
import { GymDataProvider } from "@/context/GymDataContext";
import AppShell from "@/components/layout/AppShell";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#ccff00",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "FITNESS EDGE | 708-A Sector, Mahalaxmi Nagar, Indore",
    template: "%s | Fitness Edge Indore",
  },
  description:
    "Fitness Edge in Mahalaxmi Nagar, Indore (near Kibs Hospital). Luxury athletic conditioning, Eleiko Olympic weight platforms, sub-zero contrast therapy, customized personal training. Developed by M&Co Studios.",
  keywords: [
    "Fitness Edge",
    "Gym in Indore",
    "Mahalaxmi Nagar Gym",
    "Kibs Hospital Indore",
    "Luxury Gym Indore",
    "Olympic Weightlifting Indore",
    "Personal Training Indore",
    "Free Gym Trial Indore",
    "Cryotherapy Indore",
    "M&Co Studios",
  ],
  authors: [{ name: "M&Co Studios", url: "https://mcostudios.com" }],
  creator: "M&Co Studios",
  openGraph: {
    title: "FITNESS EDGE | 708-A Sector, Mahalaxmi Nagar, Indore",
    description:
      "Fitness Edge in Mahalaxmi Nagar, Indore (near Kibs Hospital). Luxury athletic conditioning, Eleiko Olympic weight platforms, sub-zero contrast therapy. Developed by M&Co Studios.",
    url: "https://fitnessedge.demo",
    siteName: "FITNESS EDGE INDORE",
    images: [
      {
        url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Fitness Edge Sanctuary, Mahalaxmi Nagar, Indore",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsActivityLocation",
              name: "Fitness Edge",
              image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
              telephone: "+91-731-498-7654",
              email: "concierge@fitnessedge.in",
              address: {
                "@type": "PostalAddress",
                streetAddress: "708-A Sector, near kibs hospital, Sector A, Mahalaxmi Nagar",
                addressLocality: "Indore",
                addressRegion: "Madhya Pradesh",
                postalCode: "452010",
                addressCountry: "IN",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "05:30",
                  closes: "22:30",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Saturday"],
                  opens: "06:00",
                  closes: "22:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Sunday"],
                  opens: "07:00",
                  closes: "20:00",
                },
              ],
              priceRange: "$$$",
            }),
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased">
        <GymDataProvider>
          <AppShell>{children}</AppShell>
        </GymDataProvider>
      </body>
    </html>
  );
}
