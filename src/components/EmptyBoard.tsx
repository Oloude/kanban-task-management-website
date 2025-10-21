"use client";
import useKanbanStore from "@/Store/KanbanStore";

function EmptyBoard() {
  const handleOpenEditBoardModal = useKanbanStore(
    (state) => state.handleOpenEditBoardModal
  );
  return (
    <section className="flex flex-col gap-6 lg:gap-8 items-center justify-center w-full h-full">
      <p className="text-presetL text-mediumGrey text-center">
        This board is empty. Create a new column to get started.
      </p>
      <button
        onClick={handleOpenEditBoardModal}
        className="w-43.5 h-12 rounded-full bg-mainPurple text-presetM text-white cursor-pointer hover:bg-purpleHover transition-all duration-100 ease-in-out"
      >
        +Add New Column
      </button>
    </section>
  );
}

export default EmptyBoard;
