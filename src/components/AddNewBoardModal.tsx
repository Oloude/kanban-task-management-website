"use client";

import { useState } from "react";
import BoardColumn from "./BoardColumn";
import useKanbanStore from "@/Store/KanbanStore";

type Column = { id: number; name: string };

function AddNewBoardModal() {
  const createNewBoard = useKanbanStore((state) => state.handleCreateNewBoard);
  const handleCloseCreateNewBoardModal = useKanbanStore(
    (state) => state.handleCloseCreateNewBoardModal
  );
  const kanbanBoardData = useKanbanStore((state) => state.kanbanBoardData);
  const kanbanBoardNames = kanbanBoardData.boards.map((board) =>
    board.name.toLowerCase()
  );
  const [columns, setColumns] = useState<Column[]>([
    { id: 1, name: "todo" },
    { id: 2, name: "doing" },
  ]);
  const [boardName, setBoardName] = useState("");
  const [error, setError] = useState(false);

  function handleAddNewColumn() {
    setColumns((prev) => [
      ...prev,
      { id: Date.now(), name: "" }, // unique id
    ]);
  }

  function handleDeleteItem(id: number) {
    setColumns((prev) => prev.filter((col) => col.id !== id));
  }

  function handleItemChange(value: string, id: number) {
    setColumns((prev) =>
      prev.map((col) => (col.id === id ? { ...col, name: value } : col))
    );
  }

  function handleBoardNameChange(value: string) {
    setBoardName(value);
  }

  function handleCreateNewBoard() {
    setError(false);
    if (boardName.trim() === "") {
      setError(true);
      return;
    } else if (kanbanBoardNames.includes(boardName.toLowerCase())) {
      handleCloseCreateNewBoardModal();
      return;
    }

    const uniqueColumns = columns
      .filter((item) => item.name.trim() !== "")
      .filter(
        (item, idx, arr) =>
          arr.findIndex(
            (col) =>
              col.name.trim().toLowerCase() === item.name.trim().toLowerCase()
          ) === idx
      );
    createNewBoard(boardName, uniqueColumns);
    handleCloseCreateNewBoardModal();
  }

  return (
    <section
      onClick={handleCloseCreateNewBoardModal}
      className="flex items-center justify-center absolute inset-0 bg-black/50 z-30 px-6 md:px-0 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-6 py-6 px-4 w-full h-auto rounded-md bg-white dark:bg-darkGrey max-w-[480px]"
      >
        <h3 className="text-presetL text-black dark:text-white">
          Add New Board
        </h3>

        <label className="flex flex-col gap-2">
          <p className="text-presetBM text-mediumGrey dark:text-white">
            Board Name
          </p>
          <div
            className={`px-2 bg-inherit h-10 rounded-sm border  ${
              error ? "border-red" : "border-mediumGrey/25"
            } flex items-center gap-2`}
          >
            <input
              value={boardName}
              onChange={(e) => handleBoardNameChange(e.target.value)}
              type="text"
              placeholder="e.g Web design"
              className="outline-none grow text-presetBL text-black dark:text-white"
            />
            {error && (
              <span className="text-presetBM text-red">Can't be empty</span>
            )}
          </div>
        </label>

        <div className="flex flex-col gap-2">
          <label className="text-presetBM text-mediumGrey dark:text-white">
            Board Columns
          </label>
          <div className="flex flex-col gap-3">
            {columns.map((column) => (
              <BoardColumn
                key={column.id}
                id={column.id}
                item={column.name}
                handleDeleteItem={() => handleDeleteItem(column.id)}
                handleItemChange={handleItemChange}
              />
            ))}
            <button
              onClick={handleAddNewColumn}
              className="text-presetBM text-mainPurple bg-mainPurple/10 rounded-full w-full h-10 dark:bg-white cursor-pointer"
            >
              + Add New Column
            </button>
          </div>
        </div>

        <button
          onClick={handleCreateNewBoard}
          className="text-presetBM text-white bg-mainPurple h-10 w-full rounded-full cursor-pointer"
        >
          Create New Board
        </button>
      </div>
    </section>
  );
}

export default AddNewBoardModal;
