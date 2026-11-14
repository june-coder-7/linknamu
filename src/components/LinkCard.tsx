import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  count: number;
  onClick?: () => void;
};

export default function LinkCard({ link, count, onClick }: Props) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="relative block w-full rounded-2xl border border-white/70 bg-white/45 px-16 py-4 text-center text-[15px] font-semibold shadow-[0_4px_20px_-8px_rgb(160_90_50/0.18)] backdrop-blur-md transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/60 hover:shadow-[0_10px_28px_-10px_rgb(160_90_50/0.28)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {link.title}
      <span
        className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-medium tabular-nums text-foreground/45"
      >
        <span className="sr-only">클릭 </span>
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
