"use server";
import {cookies} from "next/headers";
import {createClient} from "@/utils/supabase/server"
import {redirect} from "next/navigation";


export async function signOut() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
}

export async function getCurrentUser() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {data: {user}} = await supabase.auth.getUser();
    return user
}
