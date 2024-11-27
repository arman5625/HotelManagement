import RoomReview from "@/src/components/RoomReview/RoomReview";
import { GetRoomReviews } from "@/src/libs/api";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}: {params:{id: string}}){
    const roomId =  params.id;

    try {
        const roomReviews = await GetRoomReviews(roomId);

        return NextResponse.json(roomReviews, {status: 200, statusText: 'successful'})
    } catch(error) {
        console.log("Getting Review Failed", error)
        return new NextResponse('unable to fetch', {status: 400});
    }
}