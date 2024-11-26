import { authOptions } from "@/src/libs/auth"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";

import { checkReviewExists, getUserData } from "@/src/libs/api";


export async function GET(req: Request, res:Response) {
    const session = await getServerSession(authOptions);

    if(!session){
        return new NextResponse("Authentication Required", {status: 401});
    }
    const userId = session.user.id;
    try{
        const data = await getUserData(userId);
        return NextResponse.json(data,{status: 200, statusText: 'Successfull'});
    }catch(error) {
        return new NextResponse("unable to fetch",{status: 400});
    }
}


export async function POST(req: Request, res:Response) {
    const session = await getServerSession(authOptions);

    if(!session){
        return new NextResponse("Authentication Required",{status: 401});
    }
    const {roomId, reviewText, ratingValue} = await req.json();

    const userId = session.user.id;

    if(!roomId || !reviewText || !ratingValue){
        return new NextResponse("All Fields are Required",{status: 400});
    }

    try{
        // check if already exists
        const alreadyExists = await checkReviewExists(userId, roomId);

        console.log(alreadyExists);

    }catch(error: any) {
        console.log("Error updating", error)
        return new NextResponse("unable to create review",{status: 400});
    }
}