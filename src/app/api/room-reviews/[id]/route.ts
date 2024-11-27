import { GetRoomReviews } from "@/src/libs/api";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: { id: string } }) {
    const { id } = await context.params; // Await params here.

    if (!id) {
        return new NextResponse("ID is missing", { status: 400 });
    }

    try {
        const roomReviews = await GetRoomReviews(id);
        return NextResponse.json(roomReviews, {
            status: 200,
            statusText: "successful",
        });
    } catch (error) {
        console.error("Getting Review Failed", error);
        return new NextResponse("Unable to fetch", { status: 400 });
    }
}
