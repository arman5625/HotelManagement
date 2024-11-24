export type Booking = {
  _id: string;
  hotelRoom: {
    _id: string;
    name: string;
    slug: string;
    price: number;
  };
  checkinDate: string;
  checkoutDate: string;
  numberOfDays: number;
  adults: number;
  children: number;
  totalPrice: number;
  discount: number;
};
