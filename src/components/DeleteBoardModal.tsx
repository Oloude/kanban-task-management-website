"use client";

import useKanbanStore from "@/Store/KanbanStore";

function DeleteBoardModal() {
  const handleCloseDeleteBoardModal = useKanbanStore(
    (state) => state.handleCloseDeleteBoardModal
  );
  const selectedBoardName = useKanbanStore((state) => state.selectedBoardName);
  const handleDeleteBoard = useKanbanStore((state) => state.handleDeleteBoard);

  function handleDelete() {
    handleDeleteBoard(selectedBoardName);
    handleCloseDeleteBoardModal();
  }

  return (
    <section className="w-full h-full bg-black/50 absolute inset-0 px-6 flex items-center justify-center z-30  md:px-0 cursor-pointer">
      <div className="flex w-full h-71 bg-white rounded-md flex-col gap-8 py-6 px-4 dark:bg-darkGrey max-w-[480px] md:h-[229px]">
        <h2 className="text-presetL text-red">Delete this board?</h2>
        <p className="text-presetBL text-mediumGrey">
          Are you sure you want to delete the ‘{selectedBoardName}’ board? This
          action cannot be reversed.
        </p>
        <div className="flex flex-col gap-3 md:flex-row">
          <button
            onClick={handleDelete}
            className="w-full h-10 rounded-full bg-red text-white text-presetBL flex items-center font-bold justify-center cursor-pointer hover:bg-redHover transition-all duration-150 ease-in-out"
          >
            Delete
          </button>
          <button
            onClick={handleCloseDeleteBoardModal}
            className="w-full h-10 rounded-full bg-mainPurple/10 text-mainPurple text-presetBL font-bold flex items-center justify-center cursor-pointer dark:hover:bg-lightGrey transition-all duration-150 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}

export default DeleteBoardModal;
