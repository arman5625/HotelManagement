import { NextResponse } from "next/server";
import { Children } from "react";
import Stripe from "stripe";

import { createBooking, updateHotelRoom } from "@/src/libs/api";

const checkoout_session_completed = 'checkout.session.completed';

const stripe = new Stripe(process.env.stripe_secret_key as string, {
    apiVersion: '2024-11-20.acacia',
});

export async function POST(req: Request, res: Response) {
    const reqBody = await req.text();
    const sig = req.headers.get("stripe-signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    let event: Stripe.Event;

    try {
        if(!sig || !webhookSecret) return ;
        event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);

    }catch(error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, {status: 500})
    }


    // load our event
    switch (event.type) {
        case checkoout_session_completed:
            const session = event.data.object;
        
            const {
                
                metadata: {
                // @ts-ignore
                adults,
                // @ts-ignore
                checkinDate,
                // @ts-ignore
                checkoutDate,
                // @ts-ignore
                children,
                // @ts-ignore
                hotelRoom,
                // @ts-ignore
                numberOfDays,
                // @ts-ignore
                user,
                // @ts-ignore
                discount,
                // @ts-ignore
                totalPrice
                },
            } = session;

            // create a booking
            await createBooking({
                adults: Number(adults), 
                checkinDate,
                checkoutDate,
                children: Number(Children),
                hotelRoom,
                numberOfDays: Number(numberOfDays),
                discount: Number(discount),
                totalPrice: Number(totalPrice),
                user

            });

            // update hotel Room
            await updateHotelRoom(hotelRoom)

            return NextResponse.json('Booking Successful', {
                status: 200,
                statusText: 'Booking Successful',
            });
 
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json('Event Recieved', {
        status: 200,
        statusText: 'Event Recieved',
    });
}