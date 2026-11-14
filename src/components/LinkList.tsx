"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type Counts = Record<string, number>;

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 데이터를 받기 전에는 모두 0회로 표시
  const [counts, setCounts] = useState<Counts>({});

  // 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 가져온다.
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/clicks", { cache: "no-store", signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then(({ counts: fetched }: { counts: Counts }) => {
        // 응답 전에 이미 클릭해서 늘어난 값이 있으면 더 큰 값을 유지한다.
        setCounts((prev) => {
          const next = { ...fetched };
          for (const [id, n] of Object.entries(prev)) next[id] = Math.max(next[id] ?? 0, n);
          return next;
        });
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) console.error("클릭 수 불러오기 실패", error);
      });
    return () => controller.abort();
  }, []);

  function handleClick(id: string) {
    // 즉시 +1로 보여 주고, 서버 응답이 오면 실제 값으로 맞춘다.
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

    // keepalive: 링크로 이동하는 중에도 요청이 끝까지 전송되도록 한다.
    fetch(`/api/clicks/${encodeURIComponent(id)}`, { method: "POST", keepalive: true })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then(({ count }: { count: number }) => {
        setCounts((prev) => ({ ...prev, [id]: Math.max(prev[id] ?? 0, count) }));
      })
      .catch((error: unknown) => {
        console.error("클릭 수 저장 실패", error);
        setCounts((prev) => ({ ...prev, [id]: Math.max((prev[id] ?? 1) - 1, 0) }));
      });
  }

  return (
    <ul className="mt-10 flex flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} count={counts[link.id] ?? 0} onClick={() => handleClick(link.id)} />
        </li>
      ))}
    </ul>
  );
}
