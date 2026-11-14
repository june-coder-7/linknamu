import "server-only";
import { MongoClient, type Collection } from "mongodb";

export type ClickDoc = { _id: string; count: number };

const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

// 개발 중 HMR이나 서버리스 재사용 시 연결이 계속 늘어나지 않도록 클라이언트를 전역에 캐시한다.
function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다 (.env.local 확인).");
  }
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((err) => {
      // 실패한 연결은 캐시에서 지워 다음 요청에서 다시 시도할 수 있게 한다.
      globalForMongo._mongoClientPromise = undefined;
      throw err;
    });
  }
  return globalForMongo._mongoClientPromise;
}

export async function getClicksCollection(): Promise<Collection<ClickDoc>> {
  const client = await getClient();
  return client.db(process.env.MONGODB_DB || "linknamu").collection<ClickDoc>("clicks");
}
