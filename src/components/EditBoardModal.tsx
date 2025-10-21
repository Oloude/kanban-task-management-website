"use client";

import useKanbanStore from "@/Store/KanbanStore";
import { useState } from "react";
import BoardColumn from "./BoardColumn";

function EditBoardModal() {
  const kanbanBoardData = useKanbanStore((state) => state.kanbanBoardData);
  const selectedBoardName = useKanbanStore((state) => state.selectedBoardName);
  const handleCloseEditBoardModal = useKanbanStore(
    (state) => state.handleCloseEditBoardModal
  );
  const handleEditBoard = useKanbanStore((state) => state.handleEditBoard);
  const kanbanBoardNames = kanbanBoardData.boards
    .filter((board) => board.name === selectedBoardName)[0]
    .columns.map((column) => column.name);

  const [columns, setColumns] = useState(() => {
    return kanbanBoardNames.map((name, idx) => ({ id: idx + 1, name }));
  });
  const [boardName, setBoardName] = useState(selectedBoardName);
  const [errorName, setErrorName] = useState(false);

  function handleDeleteColumn(id: number) {
    setColumns((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  }

  function handleColumnChange(value: string, id: number) {
    setColumns((prev) => {
      return prev.map((item) =>
        item.id === id ? { ...item, name: value } : item
      );
    });
  }

  function handleAddNewItem() {
    setColumns((prev) => {
      return [...prev, { id: new Date().getTime(), name: "" }];
    });
  }

  function handleBoardNameChange(value: string) {
    setBoardName(value);
  }

  function handleSaveChanges() {
    setErrorName(false);
    if (!boardName.trim()) {
      setErrorName(true);
      return;
    }
    console.log(boardName);
    let formatedColumns = columns
      .filter((item) => item.name.trim() !== "")
      .filter(
        (item, idx, arr) =>
          arr.findIndex(
            (col) =>
              col.name.trim().toLowerCase() === item.name.trim().toLowerCase()
          ) === idx
      );
    handleEditBoard(boardName, formatedColumns);

    handleCloseEditBoardModal();
  }
  return (
    <section
      onClick={handleCloseEditBoardModal}
      className="flex items-center justify-center absolute inset-0 bg-black/50 z-30 px-6 md:px-0 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-6 w-full h-auto rounded-md py-6 px-6 bg-white dark:bg-darkGrey max-w-[480px]"
      >
        <h3 className="text-presetL text-black dark:text-white">Edit Board</h3>
        <label htmlFor="" className="flex flex-col gap-2">
          <p className="text-presetBM text-mediumGrey dark:text-white">
            Board Name
          </p>
          <div
            className={` w-full px-2 bg-inherit h-10 rounded-sm border flex justify-center items-center gap-2  text-presetBL  ${
              errorName ? "border-red" : "border-mediumGrey/25"
            }`}
          >
            <input
              type="text"
              name=""
              id=""
              onChange={(e) => handleBoardNameChange(e.target.value)}
              value={boardName}
              placeholder="Platform Launch"
              className={`outline-none text-presetBL text-black dark:text-white grow`}
            />

            {errorName && (
              <span className="text-sm text-red w-24">Can't be empty</span>
            )}
          </div>
        </label>
        <div className="flex flex-col gap-2">
          <label
            htmlFor=""
            className="text-presetBM text-mediumGrey dark:text-white"
          >
            Board Columns
          </label>
          <div className="flex flex-col gap-3">
            {columns.map((column) => (
              <BoardColumn
                key={column.id}
                id={column.id}
                item={column.name}
                handleDeleteItem={() => handleDeleteColumn(column.id)}
                handleItemChange={handleColumnChange}
              />
            ))}
            <button
              onClick={handleAddNewItem}
              className="text-presetBL text-mainPurple font-bold dark:bg-white bg-mainPurple/10 rounded-full w-full h-10 cursor-pointer"
            >
              + Add New Column
            </button>
          </div>
        </div>
        <button
          onClick={handleSaveChanges}
          className="text-presetBL text-white bg-mainPurple font-bold h-10 w-full rounded-full cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </section>
  );
}

export default EditBoardModal;
