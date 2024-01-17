'use client';
import React, {useEffect} from 'react';
import {Auth} from '@supabase/auth-ui-react';
import {createClient} from "@/utils/supabase/client";
import {ThemeSupa} from '@supabase/auth-ui-shared';

const supabase = createClient();

export default function Login() {
    useEffect(() => {
        const {data: authListener} = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (session) {
                    window.location.href = "/";
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
            redirectTo={process.env.NEXT_PUBLIC_SITE_URL}
            appearance={{theme: ThemeSupa}}
            providers={['github']}
        />
    )
}
