'use client';
import {Box, Tabs, Text} from "@radix-ui/themes";
import Dashboard from "@/components/dashboard/page";
import * as React from "react";
import {useRouter} from "next/navigation";


export default function Tab({tab}: { tab: string; }) {
    const router = useRouter()
    const [currentTab, setCurrentTab] = React.useState(tab)
    return (
        <Tabs.Root
            defaultValue={currentTab}
            value={currentTab}
            onValueChange={(tab) => {
                setCurrentTab(tab)
                router.push(`/${tab}`)
            }}
            className="w-full p-2 self-start"
        >
            <Tabs.List>
                <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                <Tabs.Trigger value="dashboard">Dashboard</Tabs.Trigger>
                <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
            </Tabs.List>
            <Box>
                <Tabs.Content value="overview">
                    <Text size="2">Make changes to your overview.</Text>
                </Tabs.Content>

                <Tabs.Content value="dashboard">
                    <Dashboard/>
                </Tabs.Content>

                <Tabs.Content value="settings">
                    <Text size="2">Edit your profile or update contact information.</Text>
                </Tabs.Content>
            </Box>
        </Tabs.Root>
    );
}
