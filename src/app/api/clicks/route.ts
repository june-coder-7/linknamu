import { connection } from "next/server";
import { links } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

// GET /api/clicks → 모든 링크의 현재 클릭 수를 한 번에 반환
export async function GET() {
  // 항상 요청 시점에 실행 (빌드 시 프리렌더링/캐싱 방지)
  await connection();

  try {
    const collection = await getClicksCollection();
    const docs = await collection
      .find({ _id: { $in: links.map((link) => link.id) } })
      .toArray();

    const counts: Record<string, number> = Object.fromEntries(
      links.map((link) => [link.id, 0]),
    );
    for (const doc of docs) counts[doc._id] = doc.count;

    return Response.json({ counts }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("[GET /api/clicks]", error);
    return Response.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}
