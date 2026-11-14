import { links } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

const linkIds = new Set(links.map((link) => link.id));

// POST /api/clicks/:id → 해당 링크의 클릭 수를 1 증가시키고 새 값을 반환
export async function POST(_req: Request, ctx: RouteContext<"/api/clicks/[id]">) {
  const { id } = await ctx.params;

  // 등록된 링크만 집계해 임의의 키가 DB에 쌓이지 않도록 한다.
  if (!linkIds.has(id)) {
    return Response.json({ error: "존재하지 않는 링크입니다." }, { status: 404 });
  }

  try {
    const collection = await getClicksCollection();
    const doc = await collection.findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return Response.json({ id, count: doc?.count ?? 1 });
  } catch (error) {
    console.error(`[POST /api/clicks/${id}]`, error);
    return Response.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
