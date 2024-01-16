import {GeistSans} from "geist/font/sans";
import "./globals.css";
import {Analytics} from '@vercel/analytics/react';
import {Suspense} from "react";
import Navbar from "@/components/Navbar";
import {getCurrentUser} from "@/utils/supabase/auth";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "one-saas",
    description: "The fastest way to build saas apps with Next.js and Supabase",
};


export default async function RootLayout({children,}: { children: React.ReactNode; }) {
    const user = await getCurrentUser();
    return (
        <html lang="en" className={GeistSans.className}>
        <body className="h-full bg-background text-foreground min-h-screen flex flex-col">
        <Suspense><Navbar user={user}/></Suspense>
        {children}
        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
            <p>
                Powered by{" "}
                <a
                    href="https://github.com/kilingzhang/one-saas"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                >
                    one-saas
                </a>
            </p>
        </footer>
        <Analytics/>
        </body>
        </html>
    );
}
