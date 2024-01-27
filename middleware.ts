import {type NextRequest, NextResponse} from "next/server";
import {createClient} from "@/utils/supabase/middleware";

const loginURLs = ['/login'];
const notLoginURLs = ['/login', '/auth/callback'];

export async function middleware(request: NextRequest) {
    try {
        const {pathname} = request.nextUrl
        if (pathname.endsWith('.png')) {
            return NextResponse.next({
                request: {
                    headers: request.headers,
                },
            });
        }

        // This `try/catch` block is only here for the interactive tutorial.
        // Feel free to remove once you have Supabase connected.
        const {supabase,} = createClient(request);

        // Refresh session if expired - required for Server Components
        // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
        const {data: {session}} = await supabase.auth.getSession();


        if (!session && !notLoginURLs.includes(pathname)) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        if (session && loginURLs.includes(pathname)) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }


    } catch (error) {
        // If you are here, a Supabase client could not be created!
        // This is likely because you have not set up environment variables.
        // Check out http://localhost:3000 for Next Steps.
        console.error("middleware", error);
        return NextResponse.next({
            request: {
                headers: request.headers,
            },
        });
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
