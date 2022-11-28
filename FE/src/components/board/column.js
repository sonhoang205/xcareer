import "./column.scss";
import { Container, Draggable } from "react-smooth-dnd";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

import DropdownButton from "react-bootstrap/Dropdown";
import { IoMdDoneAll } from "react-icons/io";
import DeleteColumns from "../board/delete-columns";
import Card from "./Card";
const Column = (props) => {
  const params = useParams();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const handleSetShowDeleteColumns = () => {
    setShow(!show);
  };
  const { column, onCardDrop, inputTittle } = props;
  const cards = column.cards;
  const [datacolumn, setDatacolumn] = useState([]);

  cards.sort((a, z) => {
    return column.cardOder.indexOf(a.id) - column.cardOder.indexOf(z.id);
  });
  console.log(column);
  const projectId = params.id;
  const abc = async () => {
    let data = await axios.get(
      `http://localhost:9090/api/task?projectId=${projectId}`
    );
    setDatacolumn(data.data.tasks);
    console.log(datacolumn);
  };
  useEffect(() => {
    abc();
  }, []);

  return (
    <div className="column">
      <div className="column-drag-handle">
        {/* {datacolumn &&  datacolumn.length>0 &&  
      datacolumn.map((item ,index)=>{
return(
        )
      })
    } */}
        <div className="title-header"> tittle</div>
      </div>
      <div className="option">
        <span className="reporter">reporter : </span>
        <span>reporter</span>{" "}
        <Dropdown>
          <Dropdown.Toggle
            size="sm"
            className="Dropdown"
            id="dropdown-basic"
          ></Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Edit Task</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSetShowDeleteColumns()}>
              Delete Task
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">Information Task</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="status">
        <div>startTime-endTime</div>
        <div className="icon">
          <IoMdDoneAll />{" "}
        </div>
      </div>

      <ul className="card-list">
        <Container
          groupName="col"
          onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
          getChildPayload={(index) => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "drop-preview",
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
      </ul>

      <footer>
        {" "}
        <span></span>
        <AiOutlinePlusCircle
          style={{
            marginRight: "10px",
            marginLeft: "25px",
            fontSize: "20px",
            color: "green",
          }}
        />
        Add new card
      </footer>
      <DeleteColumns
        DeleteColumns={show}
        handleSetShowDeleteColumns={handleSetShowDeleteColumns}
      />
    </div>
  );
};

export default Column;
