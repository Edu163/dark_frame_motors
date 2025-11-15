import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-token");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Revalidate cached image data and all gallery paths
  revalidateTag("images", {});
  revalidatePath("/gallery", "page");
  revalidatePath("/gallery/[category]", "page");
  
  return NextResponse.json({ revalidated: true });
}
