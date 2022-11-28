import "./list-group.scss";
import { useState, useEffect, useRef } from "react";
import { isEmpty } from "lodash";
import { InitialData } from "../action/action";
import Column from "./column";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag, generateItems } from "../util/state-drog-drag";
import { toast } from "react-toastify";

const ListGroup = (props) => {
  const [board, setBoard] = useState({});
  const [columns, SetColumns] = useState({});
  const [inputTittle, SetInputTittle] = useState("");

  const { show, handleCreatNewColumn } = props;
  // const RefInput = useRef(null);
  useEffect(() => {
    const dataDB = InitialData.boards;
    const result = dataDB.find((item) => item.id === "Board-1");
    // console.log(result);

    if (result) {
      setBoard(result);

      result.columns.sort((a, z) => {
        return (
          result.columnOrder.indexOf(a.id) - result.columnOrder.indexOf(z.id)
        );
      });

      SetColumns(result.columns);
    }
  }, []);
  // useEffect(() => {
  //   if (RefInput && RefInput.current) {
  //     RefInput.current.focus();
  //   }
  // }, [show]);

  if (isEmpty(board)) {
    return <div className="not-found"> Not found</div>;
  }

  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);
    SetColumns(newColumns);
    let newBoard = { ...board };
    newBoard.columnOder = newColumns.map((column) => column.id);
    newBoard.columns = newColumns;
    console.log(newBoard);
  };
  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns];
      let curColumnm = newColumns.find((culumn) => culumn.id === columnId);
      curColumnm.cards = applyDrag(curColumnm.cards, dropResult);
      curColumnm.cardOder = curColumnm.cards.map((card) => card.id);
      console.log(curColumnm);
      SetColumns(newColumns);
    }
  };
  const handleCreat = () => {
    if (!inputTittle) {
      toast.error("please enter name column");
      return;
    }

    const newColumn = {
      id: Math.floor(Math.random() * 100),

      boardId: board.id,
      tittle: inputTittle.trim(),
      cardOder: [],
      cards: [],
    };
    let newColumns = [...columns];
    newColumns.push(newColumn);
    let newBoard = { ...board };
    newBoard.columnOder = newColumns.map((column) => column.id);
    newBoard.columns = newColumns;
    SetColumns(newColumns);
    setBoard(newBoard);
    SetInputTittle("");
    handleCreatNewColumn();
  };

  const handleCancel = (newColumn) => {
    handleCreatNewColumn();
  };
  const handleInput = (e) => {
    SetInputTittle(e.target.value);
  };

  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        // dung de lay thong tin cua cot can keo tha
        getChildPayload={(index) => columns[index]}
        //
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "col-drop-preview",
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column
              column={column}
              onCardDrop={onCardDrop}
              inputTittle={inputTittle}
            />
          </Draggable>
        ))}
      </Container>
      {show && (
        <div className=" row new-column Col">
          <div>
            <input
              class="form-control form-control-sm input-new"
              type="text"
              placeholder=" enter name column"
              aria-label=".form-control-sm example"
              // Ref={RefInput}
              value={inputTittle}
              onChange={handleInput}
            />
            <div className="button">
              {" "}
              <button
                type="button"
                class="btn btn-success btn-sm "
                onClick={handleCreat}
              >
                create
              </button>
              <button
                type="button"
                class="btn btn-success btn-sm "
                onClick={handleCancel}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListGroup;
