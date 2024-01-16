import Link from "next/link";
import {cookies, headers} from "next/headers";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";


export default function Login({searchParams,}: { searchParams: { message: string }; }) {
    const signIn = async (formData: FormData) => {
        "use server";

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const {error} = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return redirect("/login?message=signIn:" + error.message);
        }

        return redirect("/");
    };

    const signUp = async (formData: FormData) => {
        "use server";

        const origin = headers().get("origin");
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const {error} = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${origin}/auth/callback`,
            },
        });

        if (error) {
            return redirect("/login?message=signIn:" + error.message);
        }

        return redirect("/login?message=Check email to continue sign in process");
    };

    const signInWithGithub = async function () {
        "use server";
        let url =
            process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
            'http://localhost:3000/auth/callback'
        // Make sure to include `https://` when not localhost.
        url = url.includes('http') ? url : `https://${url}`

        const cookieStore = cookies();
        const supabase = createClient(cookieStore);
        const {data, error} = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: url,
            },
        })
        if (error) {
            return redirect("/login?message=signInWithGithub:" + error.message);
        }

        url = data?.url
        return redirect(url)
    }

    return (
        // div 内容全部居中
        <div className="flex flex-col flex-1 w-full justify-center items-center px-8 sm:max-w-md bg-background text-foreground min-h-screen font-sans antialiased">
            <form
                className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
                action={signIn}
            >
                <label className="text-md" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="email"
                    placeholder="you@example.com"
                    // required
                />
                <label className="text-md" htmlFor="password">
                    Password
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    // required
                />
                <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
                    Sign In
                </button>
                <button
                    formAction={signUp}
                    className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
                >
                    Sign Up
                </button>
                {searchParams?.message && (
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                        {searchParams.message}
                    </p>
                )}
            </form>
            <form
                className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
                action={signInWithGithub}
            >
                <button
                    className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
                >
                    Login in With Github
                </button>
            </form>
        </div>
    );
}
