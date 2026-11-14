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
        className="h-28 w-28 rounded-full object-cover ring-4 ring-white/80 shadow-[0_12px_32px_-8px_rgb(176_96_56/0.35),0_2px_6px_rgb(176_96_56/0.12)] sm:h-32 sm:w-32"
        priority
      />
      <h1 className="mt-6 text-2xl font-bold tracking-tight">{profile.name}</h1>
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-foreground/60">
        {profile.bio}
      </p>
    </header>
  );
}
