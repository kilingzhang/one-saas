'use client';
import React, {useEffect} from 'react';
import {Auth} from '@supabase/auth-ui-react';
import {createClient} from "@/utils/supabase/client";
import {ThemeSupa} from '@supabase/auth-ui-shared';
import {getCurrentUser} from "@/utils/supabase/auth";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

const supabase = createClient();

export default async function Login(request: Request) {
    const user = await getCurrentUser();
    if (user) {
        window.location.href = defaultUrl;
    }
    useEffect(() => {
        const {data: authListener} = supabase.auth.onAuthStateChange(
            (event, session) => {
                console.log(`Supabase auth event: ${event}`);
                if (event == "SIGNED_IN") {
                    window.location.href = defaultUrl;
                }
            }
        );
        // 当组件卸载时，取消监听
        return () => {
        };
    }, []);
    return (
        <Auth
            supabaseClient={supabase}
            redirectTo={process.env.NEXT_PUBLIC_SITE_URL!}
            appearance={{theme: ThemeSupa}}
            providers={['github']}
        />
    )
}
