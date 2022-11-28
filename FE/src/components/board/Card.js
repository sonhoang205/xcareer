import { IoMdDoneAll } from "react-icons/io";

const Card = (props) => {
  const { card } = props;
  return (
    <div>
      <li>
        <div className="card-item_header">
          {" "}
          {card.tittle}{" "}
          <span>
            <IoMdDoneAll />{" "}
          </span>
        </div>
        <p>card-content</p>
      </li>
    </div>
  );
};

export default Card;
