"use client";
import React, {Fragment} from 'react';
import {usePathname} from 'next/navigation';
import {Disclosure, Menu, Transition} from '@headlessui/react';
import DeployNextLogo from "@/components/DeployNextLogo";
import {signOut} from "@/utils/supabase/auth";
import Link from "next/link";
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline';
import {Avatar} from "@radix-ui/themes";


const navigation = [
    {name: 'Overview', href: '/'},
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}


export default function Navbar({user}: { user: any }) {
    const pathname = usePathname();
    return (
        <Disclosure as="nav" className="bg-white shadow-sm">
            {({open}) => (
                <>
                    <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-2">
                        <div className="flex h-10 justify-between">
                            <div className="flex">
                                <div className="flex flex-shrink-0 items-center">
                                    <DeployNextLogo/>
                                </div>
                                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                pathname === item.href
                                                    ? 'border-slate-500 text-gray-900'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                                            )}
                                            aria-current={pathname === item.href ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                <Menu as="div" className="relative ml-3">
                                    <Menu.Button
                                        className="flex rounded-full bg-white text-sm">
                                        <Avatar
                                            size="2"
                                            radius="full"
                                            src={user?.user_metadata?.avatar_url || 'https://avatar.vercel.sh/leerob'}
                                            fallback={`${user?.user_metadata?.name} avatar`}
                                        />
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="flex flex-col p-2">
                                                <div className="text-base font-medium text-gray-800 px-2 py-1">
                                                    {user?.user_metadata?.name}
                                                </div>
                                                <div className="text-sm font-medium text-gray-500 px-2 py-1">
                                                    {user?.user_metadata?.email}
                                                </div>
                                                {user ? (
                                                    <div className="pt-4">
                                                        <Menu.Item>
                                                            {({active}) => (
                                                                <Link
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'flex p-2 text-sm text-gray-700')}
                                                                    href="/settings"
                                                                >
                                                                    Settings
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({active}) => (
                                                                <form
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'flex p-2 text-sm text-gray-700')}
                                                                    action={signOut}
                                                                >
                                                                    <button>Sign out</button>
                                                                </form>
                                                            )}
                                                        </Menu.Item>
                                                    </div>
                                                ) : (
                                                    <div className="w-full">
                                                        <Menu.Item>
                                                            {({active}) => (
                                                                <Link
                                                                    href="/login"
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'flex p-4 text-sm text-gray-700')}
                                                                >
                                                                    Sign in
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                    </div>
                                                )}
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                            <div className="-mr-2 flex items-center sm:hidden">
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    {/* 移动端导航面板 */}
                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 pt-2 pb-3">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        pathname === item.href
                                            ? 'bg-slate-50 border-slate-500 text-slate-700'
                                            : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                                        'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                                    )}
                                    aria-current={pathname === item.href ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                        <Menu as="div">
                            <div className="border-t border-gray-200 pt-4 pb-3">
                                {user ? (
                                    <>
                                        <div className="flex items-center px-4">
                                            <div className="flex-shrink-0">
                                                <Avatar
                                                    size="2"
                                                    radius="full"
                                                    src={user?.user_metadata?.avatar_url || 'https://avatar.vercel.sh/leerob'}
                                                    fallback={`${user?.user_metadata?.name} avatar`}
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-base font-medium text-gray-800">
                                                    {user?.user_metadata?.name}
                                                </div>
                                                <div className="text-sm font-medium text-gray-500">
                                                    {user?.user_metadata?.email}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3 space-y-1">
                                            <Menu.Item>
                                                {({active}) => (
                                                    <Link
                                                        className={classNames(active ? 'bg-gray-100' : '', 'flex px-4 py-2 text-sm text-gray-700')}
                                                        href="/settings"
                                                    >
                                                        Settings
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({active}) => (
                                                    <form
                                                        className={classNames(active ? 'bg-gray-100' : '', 'flex px-4 py-2 text-sm text-gray-700')}
                                                        action={signOut}
                                                    >
                                                        <button>Sign out</button>
                                                    </form>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </>
                                ) : (
                                    <div className="mt-3 space-y-1">
                                        <Link
                                            href="/login"
                                            className="flex px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                        >
                                            Sign in
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </Menu>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
