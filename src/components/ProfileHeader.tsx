import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={profile.imageUrl}
        alt={`${profile.name} 프로필 사진`}
        width={128}
        height={128}
        unoptimized
        className="h-32 w-32 rounded-full object-cover"
        priority
      />
      <h1 className="mt-4 text-xl font-bold">{profile.name}</h1>
      <p className="mt-2 text-sm text-foreground/70">{profile.bio}</p>
    </header>
  );
}
