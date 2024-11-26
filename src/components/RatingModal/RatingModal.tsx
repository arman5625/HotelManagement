import { FC } from "react";

type Props = {
    isOpen:boolean;
}

const RatingModal: FC<Props> = (props) => {
    const {isOpen} = props;
    console.log("isOpen", isOpen)

    return (
        <div
      className={`fixed z-[61] inset-0 flex items-center justify-center ${
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
            Rating Model
        </div>
    )
}

export default RatingModal;