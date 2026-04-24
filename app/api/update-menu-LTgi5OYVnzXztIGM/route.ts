import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password, menuData } = body ?? {};

        if (password !== process.env.ADMIN_PASSWORD) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Validate menuData so we never write an empty/garbage file.
        if (
            !menuData ||
            typeof menuData !== "object" ||
            !Array.isArray(menuData.sections)
        ) {
            console.error("Invalid menuData received:", menuData);
            return NextResponse.json(
                { error: "Invalid menu data", received: menuData },
                { status: 400 }
            );
        }

        const content = JSON.stringify(menuData, null, 2);
        console.log(
            `update-menu: writing menu.json (${content.length} bytes, ${menuData.sections.length} sections)`
        );

        const result = await put("menu.json", content, {
            access: "public",
            addRandomSuffix: false,
            allowOverwrite: true,
            contentType: "application/json; charset=utf-8",
            cacheControlMaxAge: 0,
        });

        // Refresh any pages that consume the menu.
        revalidatePath("/menu");

        return NextResponse.json({
            success: true,
            url: result.url,
            size: content.length,
        });
    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error);
        console.error("Failed to update menu:", error);
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}
