import axios from 'axios';
import {FC} from 'react' ;
import useSWR from 'swr';
import React from 'react'
import review from '@/schemaTypes/review';
import { Review } from '@/src/models/review';
import Rating from '../Rating/Rating';



const RoomReview: FC <{roomId: string}> = ({roomId}) => {
    const FetchRoomReviews = async () => {
        const {data} = await axios.get<Review[]>(`/api/room-reviews/${roomId}`);
        return data;
    };


    const {data: roomReviews, error, isLoading} = useSWR('/api/room-reviews', FetchRoomReviews)
    if(error) throw new Error("cannot fetch data");
    if(typeof roomReviews === "undefined" && !isLoading)
        throw new Error("Cannot fetch data");

    console.log("roomReviews",roomReviews);
  return (
    <>
    {roomReviews && 
        roomReviews.map(review => (
        <div 
            key={review._id} 
            className='bg-gray-100 dark:bg-gray-900 p-4 rounded-lg'
        >
            <div className='font-semibold mb-2 flex'>
                <p>{review.user.name}</p>
                <div className='ml-4 flex items-center text-tertiary-light text-lg'>
                    <Rating rating={review.userRating}/>
                </div>
            </div>

            <p>{review.text}</p>
        </div>
    ))}
    </>
  )
}

export default RoomReview;