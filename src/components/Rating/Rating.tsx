import { FC } from 'react'
import { FaStar, FaStarHalf } from 'react-icons/fa';

type Props = {
    rating: number;
}
const Rating: FC<Props> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const decimalPart = rating - fullStars;

    const fullStarElements = Array(fullStars).fill(<FaStar />);
    let halfStarElements = null;

    if(decimalPart > 0) {
        halfStarElements = <FaStarHalf />;
    }

  return (<>
  {fullStarElements} {halfStarElements}
  </>
  )
}

export default Rating;