import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { password } = await request.json();

    if (password === process.env.ADMIN_PASSWORD) {
        return NextResponse.json({
            success: true,
            redirectUrl: "/edit-menu-LTgi5OYVnzXztIGM"
        });
    }

    return new NextResponse("Unauthorized", { status: 401 });
}