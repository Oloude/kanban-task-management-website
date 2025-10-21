"use client";

import useKanbanStore from "@/Store/KanbanStore";
import Column from "./Column";
import EmptyColumn from "./EmptyColumn";
import EmptyBoard from "./EmptyBoard";

function Board() {
  const kanbanBoardData = useKanbanStore((state) => state.kanbanBoardData);
  const selectedBoardName = useKanbanStore((state) => state.selectedBoardName);

  const selectedBoardData = kanbanBoardData.boards.filter(
    (item) => item.name === selectedBoardName
  )[0];

  return (
    <section
      className={`flex gap-6 overflow-x-scroll w-full pt-10   min-h-screen pb-16 ${
        selectedBoardData.columns.length == 0 ? "px-6" : "pr-50 pl-10"
      }`}
    >
      {selectedBoardData.columns.length > 0 ? (
        <>
          {selectedBoardData.columns.map((columnData) => (
            <Column key={columnData.name} {...columnData} />
          ))}
          <EmptyColumn />{" "}
        </>
      ) : (
        <EmptyBoard />
      )}
    </section>
  );
}

export default Board;
