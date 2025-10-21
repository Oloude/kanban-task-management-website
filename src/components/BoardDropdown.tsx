import useKanbanStore from "@/Store/KanbanStore";

type Props = {
  show: boolean;
  closeDropdown: () => void;
};

function BoardDropdown({ show, closeDropdown }: Props) {
  const handleOpenDeleteBoardModal = useKanbanStore(
    (state) => state.handleOpenDeleteBoardModal
  );
  const handleOpenEditBoardModal = useKanbanStore(
    (state) => state.handleOpenEditBoardModal
  );

  function handleDelete() {
    closeDropdown();
    handleOpenDeleteBoardModal();
  }

  function handleEditBtn() {
    closeDropdown();
    handleOpenEditBoardModal();
  }
  return (
    <div
      className={`w-[194px] h-24 rounded-lg bg-white absolute top-22 right-6 py-[11px] px-4 shadow-navM gap-6 flex-col dark:bg-veryDarkGrey ${
        show ? "flex" : "hidden"
      }`}
    >
      <button
        onClick={handleEditBtn}
        className="w-full h-6 text-presetBL font-bold text-mediumGrey cursor-pointer text-left"
      >
        Edit Board
      </button>
      <button
        onClick={handleDelete}
        className="w-full h-6 text-presetBL font-bold text-red cursor-pointer text-left "
      >
        Delete Board
      </button>
    </div>
  );
}

export default BoardDropdown;
