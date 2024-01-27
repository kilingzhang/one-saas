'use client';
import * as React from "react";
import {usePathname} from "next/navigation";

const navigation = [
    {name: 'Overview', href: '/overview'},
    {name: 'Dashboard', href: '/dashboard'},
    {name: 'Settings', href: '/settings'},
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Tab() {
    const pathname = usePathname();
    return (
        <div className="flex p-4">
            {navigation.map((item) => (
                <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                        pathname === item.href
                            ? 'border-slate-500 text-gray-900 hover:bg-gray-100 rounded-lg'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg',
                        'inline-flex items-center mx-2 border-b-2 text-sm font-medium h-10 px-2'
                    )}
                    aria-current={pathname === item.href ? 'page' : undefined}
                >
                    {item.name}
                </a>
            ))}
        </div>
    );
}
