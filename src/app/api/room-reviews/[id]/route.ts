import { GetRoomReviews } from "@/src/libs/api";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: {  params: Promise<{ id: string }> }) {
    const roomId = (await params).id

    try {
        const roomReviews = await GetRoomReviews(roomId);
        return NextResponse.json(roomReviews, {
            status: 200,
            statusText: "successful",
        });
    } catch (error) {
        console.error("Getting Review Failed", error);
        return new NextResponse("Unable to fetch", { status: 400 });
    }
}
