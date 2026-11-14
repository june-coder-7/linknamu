import type { LinkItem } from "@/data/profile";

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-xl border border-foreground/20 px-4 py-3 text-center font-medium transition-colors hover:bg-foreground/5 active:bg-foreground/10"
    >
      {link.title}
    </a>
  );
}
