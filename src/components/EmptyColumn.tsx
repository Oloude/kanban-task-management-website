"use client";
import useKanbanStore from "@/Store/KanbanStore";

function EmptyColumn() {
  const handleOpenEditBoardModal = useKanbanStore(
    (state) => state.handleOpenEditBoardModal
  );
  return (
    <button
      onClick={handleOpenEditBoardModal}
      className="min-w-70 h-auto mt-10 flex items-center justify-center rounded-md bg-gradient-to-b from-[#E9EFFA] to-[#E9EFFA80] dark:from-[#2B2C37] dark:to-[#2B2C37]/50"
    >
      <p className="text-presetXL text-mediumGrey cursor-pointer hover:text-mainPurple transition-all duration-150 ease-in-out">
        +New Column
      </p>
    </button>
  );
}

export default EmptyColumn;
