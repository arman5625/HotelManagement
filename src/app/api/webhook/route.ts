import { NextResponse } from "next/server";
import Stripe from "stripe";

import { createBooking, updateHotelRoom } from "@/src/libs/api";

const checkoout_session_completed = 'checkout.session.completed';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-11-20.acacia',
});

export async function POST(req: Request) {
    const reqBody = await req.text();
    const sig = req.headers.get("stripe-signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    let event: Stripe.Event;

    try {
        if(!sig || !webhookSecret) return ;
        event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);

    }catch(error) {
        console.log("webhook error",error)
        return new NextResponse(`Webhook Error`, {status: 500})
    }


    // load our event
    switch (event.type) {
        case checkoout_session_completed:
            const session = event.data.object;
        
            const {
                //@ts-expect-error metadata not known
                metadata: {adults,checkinDate,checkoutDate,children,hotelRoom,numberOfDays,user,discount,totalPrice},

            } = session;

            // create a booking
            await createBooking({
                adults: Number(adults), 
                checkinDate,
                checkoutDate,
                children: Number(children),
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