import React, {Suspense} from "react";
import Tab from "@/components/Tab";

export default async function OverviewLayout({children,}: { children: React.ReactNode; }) {
    return (
        <div className="flex flex-col w-full h-full min-h-full">
            <Suspense>
                <Tab/>
            </Suspense>
            <div className="flex flex-col">
                {children}
            </div>
        </div>
    );
}
