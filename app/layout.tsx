import {GeistSans} from "geist/font/sans";
import "./globals.css";
import {Analytics} from '@vercel/analytics/react';
import {Suspense} from "react";
import Navbar from "@/components/Navbar";
import {getCurrentUser} from "@/utils/supabase/auth";
import {cn} from "@/lib/utils";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "saaskit",
    description: "The fastest way to build saas apps with Next.js and Supabase",
};


export default async function RootLayout({children,}: { children: React.ReactNode; }) {
    const user = await getCurrentUser();
    return (
        <html lang="en" className={GeistSans.className}>
        <body className="flex flex-col min-h-screen justify-between">
        <Suspense><Navbar user={user}/></Suspense>
        <div className={cn(
            "flex flex-grow items-center justify-center",
            "--font-sans"
        )}>
            {children}
        </div>
        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
            <p>
                Powered by{" "}
                <a
                    href="https://github.com/saaskits/saaskit"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                >
                    saaskit
                </a>
            </p>
        </footer>
        <Analytics/>
        </body>
        </html>
    );
}
