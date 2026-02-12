import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { CATEGORY_KEYS, type CategoryKey } from "@/lib/categories";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, category, lat, lng } = body;

    // Validate content
    if (typeof content !== "string" || !content.trim() || content.length > 300) {
      return NextResponse.json(
        { error: "Content must be 1-300 characters" },
        { status: 400 }
      );
    }

    // Validate category
    if (!CATEGORY_KEYS.includes(category as CategoryKey)) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );
    }

    // Validate coordinates
    if (typeof lat !== "number" || typeof lng !== "number") {
      return NextResponse.json(
        { error: "Invalid coordinates" },
        { status: 400 }
      );
    }

    const message = await prisma.message.create({
      data: {
        content: content.trim(),
        category,
        lat,
        lng,
      },
    });

    return NextResponse.json({
      id: message.id,
      content: message.content,
      category: message.category,
      lat: message.lat,
      lng: message.lng,
      createdAt: message.createdAt.toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}
