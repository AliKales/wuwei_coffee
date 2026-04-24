import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
    try {
        const { password, menuData } = await request.json();

        // 1. Verify the password matches your .env
        if (password !== process.env.ADMIN_PASSWORD) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // 2. Overwrite the file in Vercel Blob
        await put('menu.json', JSON.stringify(menuData), {
            access: 'public',
            addRandomSuffix: false,
            allowOverwrite: true,
        });

        // 3. Clear the Next.js cache so the public site updates instantly
        revalidatePath('/');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to update menu:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}