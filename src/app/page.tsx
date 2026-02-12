import { prisma } from "@/lib/db";
import { MapWrapper } from "@/components/map/map-wrapper";
import type { BeaconMessage } from "@/lib/types";
import type { CategoryKey } from "@/lib/categories";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const rawMessages = await prisma.message.findMany({
    take: 200,
    orderBy: { createdAt: "desc" },
  });

  const messages: BeaconMessage[] = rawMessages.map((m) => ({
    id: m.id,
    content: m.content,
    category: m.category as CategoryKey,
    lat: m.lat,
    lng: m.lng,
    createdAt: m.createdAt.toISOString(),
  }));

  return <MapWrapper initialMessages={messages} />;
}
