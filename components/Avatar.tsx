import Image from "next/image";

export default function Avatar({user}: { user: any }) {
    return (
        <Image
            className="h-8 w-8 rounded-full"
            src={user?.user_metadata?.avatar_url || 'https://avatar.vercel.sh/leerob'}
            height={32}
            width={32}
            alt={`${user?.user_metadata?.name} avatar`}
        />
    );
}
