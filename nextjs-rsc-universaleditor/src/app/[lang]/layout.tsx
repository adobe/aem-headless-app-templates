import '../globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import Footer from "@/components/Footer";
import {Analytics} from '@vercel/analytics/react';
import Navigation from "@/components/Navigation";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Your Next Weekend',
    description: 'Find the best places to visit this weekend',
    viewport: "width=device-width, initial-scale=1.0, viewport-fit=cover",
    themeColor: "#000000",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className + "bg-white dark:bg-black"}>
                <Navigation/>
                {children}
                <Footer/>
                <Analytics/>
            </body>
        </html>
    )
}
