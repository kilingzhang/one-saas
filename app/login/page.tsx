'use client';
import React, {useEffect} from 'react';
import {Auth} from '@supabase/auth-ui-react';
import {createClient} from "@/utils/supabase/client";
import {ThemeSupa} from '@supabase/auth-ui-shared';
import {useRouter} from "next/navigation";

const supabase = createClient();

export default function Login() {
    const router = useRouter()
    useEffect(() => {
        const {data: authListener} = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (session) {
                    router.push('/dashboard')
                }
            }
        );
        // 当组件卸载时，取消监听
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);
    return (
        <div className="flex flex-col min-h-full min-w-full items-center justify-center">
            <Auth
                supabaseClient={supabase}
                redirectTo={process.env.NEXT_PUBLIC_SITE_URL}
                appearance={{theme: ThemeSupa}}
                providers={[
                    'github',
                    // 'google', 'twitter', 'facebook', 'gitlab', 'bitbucket'
                ]}
                onlyThirdPartyProviders={false}
            />
        </div>

    )
}
