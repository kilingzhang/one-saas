import Link from "next/link"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {getCurrentUser} from "@/utils/supabase/auth";
import React from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"

export default async function Settings() {
    const user = await getCurrentUser()
    return (
        <div className="lg:grid lg:grid-cols-4 lg:gap-8 md:flex md:flex-col px-5">
            <div className="col-span-1">
                <nav className="space-y-1 pb-5">
                    <Link className="block px-3 py-2 text-sm text-gray-900 bg-gray-100 font-semibold"
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
            <div className="col-span-3 space-y-6 lg:p-0 md:px-5 md:py-15">
                <Card>
                    <CardHeader>
                        <CardTitle>Avatar</CardTitle>
                        <CardDescription>This is your avatar.</CardDescription>
                        <CardDescription>Click on the avatar to upload a custom one from your
                            files.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Avatar className="w-20 h-20">
                            <AvatarImage
                                alt={`${user?.user_metadata?.name} avatar`}
                                src={user?.user_metadata?.avatar_url || 'https://avatar.vercel.sh/leerob'}
                            />
                            <AvatarFallback>{user?.user_metadata?.name}</AvatarFallback>
                        </Avatar>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Display Name</CardTitle>
                        <CardDescription>
                            Please enter your full name, or a display name you are comfortable with.
                        </CardDescription>
                        <CardDescription className="mt-1 text-sm text-gray-600">Please use 32 characters at
                            maximum.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Input placeholder={user?.user_metadata?.name} defaultValue={user?.user_metadata?.name}/>
                    </CardContent>
                    <CardFooter className="mt-4 flex justify-end">
                        <Button className="justify-end">Save</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Email</CardTitle>
                        <CardDescription>
                            Please enter the email address you want to use to log in with Vercel.
                        </CardDescription>
                        <CardDescription className="mt-1 text-sm text-gray-600">
                            We will email you to verify the change.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Input type="email" placeholder={user?.user_metadata?.email}
                               defaultValue={user?.user_metadata?.email}/>
                    </CardContent>
                    <CardFooter className="mt-4 flex justify-end">
                        <Button variant="outline">Cancel</Button>
                        <Button className="ml-2">Save</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
