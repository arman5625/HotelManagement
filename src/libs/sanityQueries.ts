import { groq } from 'next-sanity';

export const getFeaturedRoomQuery = groq`*[_type == "hotelRoom" && isFeatures == true][0] {
    _id,
    description,
    discount,
    images,
    isFeatures,
    name,
    price,
    slug,
    coverImage,
}`;

export const getRoomsQuery = groq`*[_type == "hotelRoom"]{
_id,
coverImage,
description,
dimension,
isBooked,
isFeatures,
name,
price,
slug,
type,
}`;

export const getRoomQuery = groq`*[_type == "hotelRoom" && slug.current == $slug][0]{
_id,
coverImage,
description,
dimension,
discount,
images,
isBooked,
isFeatures,
name,
numberOfBeds,
offeredAmmenities,
price,
slug,
specialNote,
type,

}`


export const getUserBookingsQuery = groq`*[_type == 'booking' && user._ref == $userId] {
    _id,
    hotelRoom -> {
        _id,
        name,
        slug,
        price
    },
    checkinDate,
    checkoutDate,
    numberOfDays,
    adults,
    children,
    totalPrice,
    discount
}`;

export const getUserDataQuery = groq`*[_type == 'user' && _id == $userId][0] {
    _id,
    name,
    email,
    isAdmin,
    about,
    _createdAt,
    image,
}`;
