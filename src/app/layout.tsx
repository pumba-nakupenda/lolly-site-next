import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Montserrat, MuseoModerno } from 'next/font/google';

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    display: 'swap',
});

const museo = MuseoModerno({
    subsets: ['latin'],
    variable: '--font-museo',
    weight: '900',
    style: 'italic',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL("https://lolly.sn"),
    title: {
        default: "LOLLY Agency | Agence de Communication & Formation",
        template: "%s | LOLLY Agency"
    },
    description: "LOLLY Agency est votre partenaire stratégique pour la communication digitale, le branding et la formation au Sénégal.",
    openGraph: {
        type: "website",
        locale: "fr_SN",
        url: "https://lolly.sn",
        siteName: "LOLLY Agency",
        images: [
            {
                url: "/meta-image.png",
                width: 1200,
                height: 630,
                alt: "LOLLY Agency - Agence de Communication"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "LOLLY Agency",
        description: "Agence de communication et formation d'élite au Sénégal.",
        images: ["/meta-image.png"],
    },
    robots: {
        index: true,
        follow: true
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" className={`${montserrat.variable} ${museo.variable}`}>
            <head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <meta name="theme-color" content="#FFD100" />
            </head>
            <body className="antialiased">
                <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""} />
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
