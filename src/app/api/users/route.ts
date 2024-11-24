import { authOptions } from "@/src/libs/auth"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";

import { getUserData } from "@/src/libs/api";


export async function GET(req: Request, res:Response) {
    const session = await getServerSession(authOptions);

    if(!session){
        return new NextResponse("Authentication Required");
    }
    const userId = session.user.id;
    try{
        const data = await getUserData(userId);
        return NextResponse.json(data,{status: 200, statusText: 'Successfull'});
    }catch(error) {
        return new NextResponse("unable to fetch",{status: 400});
    }
}