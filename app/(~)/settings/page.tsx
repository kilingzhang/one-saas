import Link from "next/link"
import { AvatarImage, Avatar } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {getCurrentUser} from "@/utils/supabase/auth";
import React from "react";

export default async function Settings() {
    const user = await getCurrentUser()
    return (
        <div className="bg-white p-8">
            <div className="grid grid-cols-4 gap-8">
                <div className="col-span-1">
                    <nav className="space-y-1">
                        <Link className="block rounded-lg bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-900"
                              href="#">
                            General
                        </Link>
                        <Link className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100" href="#">
                            Authentication
                        </Link>
                        <Link className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100" href="#">
                            Teams
                        </Link>
                        <Link className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100" href="#">
                            Billing
                        </Link>
                        <Link className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100" href="#">
                            Invoices
                        </Link>
                        <Link className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100" href="#">
                            Tokens
                        </Link>
                        <Link className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100" href="#">
                            Deployment Protection
                        </Link>
                        <Link className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100" href="#">
                            My Notifications
                        </Link>
                    </nav>
                </div>
                <div className="col-span-3 space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold">Avatar</h2>
                        <p className="mt-1 text-sm text-gray-600">This is your avatar.</p>
                        <p className="mt-1 text-sm text-gray-600">Click on the avatar to upload a custom one from your
                            files.</p>
                        <p className="mt-1 text-sm text-gray-600">An avatar is optional but strongly recommended.</p>
                        <div className="mt-4 flex justify-start">
                            <Avatar>
                                <AvatarImage alt={`${user?.user_metadata?.name} avatar`} src={user?.user_metadata?.avatar_url || 'https://avatar.vercel.sh/leerob'} />
                            </Avatar>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Display Name</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Please enter your full name, or a display name you are comfortable with.
                        </p>
                        <Input placeholder={user?.user_metadata?.name} defaultValue={user?.user_metadata?.name}/>
                        <p className="mt-1 text-sm text-gray-600">Please use 32 characters at maximum.</p>
                        <div className="mt-4 flex justify-end">
                            <Button>Save</Button>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Email</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Please enter the email address you want to use to log in with Vercel.
                        </p>
                        <Input type="email" placeholder={user?.user_metadata?.email} defaultValue={user?.user_metadata?.email}/>
                        <p className="mt-1 text-sm text-gray-600">We will email you to verify the change.</p>
                        <div className="mt-4 flex justify-end">
                            <Button variant="outline">Cancel</Button>
                            <Button className="ml-2">Save</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
