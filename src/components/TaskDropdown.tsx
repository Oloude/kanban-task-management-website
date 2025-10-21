import useKanbanStore from "@/Store/KanbanStore";

type Props = {
  show: boolean;
  closeDropdown: () => void;
};

function TaskDropdown({ show, closeDropdown }: Props) {
  const handleOpenDeleteTaskModal = useKanbanStore(
    (state) => state.handleOpenDeleteTaskModal
  );
  const handleOpenEditTaskModal = useKanbanStore(
    (state) => state.handleOpenEditTaskModal
  );

  function handleDelete() {
    closeDropdown();
    handleOpenDeleteTaskModal();
  }

  function handleEdit() {
    closeDropdown();
    handleOpenEditTaskModal();
  }
  return (
    <div
      className={`w-[194px] h-24 rounded-lg bg-white absolute top-6 right-0 py-[11px] px-4 shadow-navM gap-2 flex-col dark:bg-veryDarkGrey justify-center  ${
        show ? "flex" : "hidden"
      }`}
    >
      <button
        onClick={handleEdit}
        className="w-full h-6 text-presetBL font-bold text-mediumGrey cursor-pointer text-left "
      >
        Edit Task
      </button>
      <button
        onClick={handleDelete}
        className="w-full h-6 text-presetBL font-bold text-red cursor-pointer text-left "
      >
        Delete Task
      </button>
    </div>
  );
}

export default TaskDropdown;
