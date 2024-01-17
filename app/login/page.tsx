'use client';
import React from 'react'
import {Auth} from '@supabase/auth-ui-react'
import {createClient} from "@/utils/supabase/client";
import {ThemeSupa} from '@supabase/auth-ui-shared'

const supabase = createClient();


export default function Login() {
    return (
        <Auth
            supabaseClient={supabase}
            redirectTo={process.env.NEXT_PUBLIC_SITE_URL!}
            appearance={{theme: ThemeSupa}}
            providers={['github']}
        />
    )
}
