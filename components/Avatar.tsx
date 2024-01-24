import Image from "next/image";

export default function Avatar({user}: { user: any }) {
    return (
        <div className="flex items-center px-4">
            <div className="flex-shrink-0">
                <Image
                    className="h-8 w-8 rounded-full"
                    src={user?.user_metadata?.avatar_url || 'https://avatar.vercel.sh/leerob'}
                    height={32}
                    width={32}
                    alt={`${user?.user_metadata?.name} avatar`}
                />
            </div>
            <div className="ml-3">
                <div className="text-sm font-medium text-gray-500">
                    {user?.user_metadata?.email}
                </div>
                <div className="text-base font-medium text-gray-800">
                    {user?.user_metadata?.name}
                </div>
            </div>
        </div>
    );
}
