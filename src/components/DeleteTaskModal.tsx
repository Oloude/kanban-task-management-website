"use client";
import useKanbanStore from "@/Store/KanbanStore";

function DeleteTaskModal() {
  const handleCloseDeleteTaskModal = useKanbanStore(
    (state) => state.handleCloseDeleteTaskModal
  );
  const handleDeleteTask = useKanbanStore((state) => state.handleDeleteTask);
  const viewData = useKanbanStore((state) => state.viewData);
  return (
    <section className="w-full h-full bg-black/50 absolute inset-0 px-6 flex items-center justify-center z-30  md:px-0 cursor-pointer">
      <div className="flex w-full h-71 bg-white rounded-md flex-col gap-8 py-6 px-4 dark:bg-darkGrey max-w-[480px] md:h-[229px]">
        <h2 className="text-presetL text-red">Delete this task?</h2>
        <p className="text-presetBL text-mediumGrey">
          Are you sure you want to delete the ‘{viewData.title}’ task and its
          subtasks? This action cannot be reversed.
        </p>
        <div className="flex flex-col gap-3 md:flex-row">
          <button
            onClick={handleDeleteTask}
            className="w-full h-10 rounded-full bg-red text-white text-presetBL font-bold flex items-center justify-center cursor-pointer"
          >
            Delete
          </button>
          <button
            onClick={handleCloseDeleteTaskModal}
            className="w-full h-10 rounded-full bg-mainPurple/10 text-mainPurple font-bold text-presetBL flex items-center justify-center cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}

export default DeleteTaskModal;
