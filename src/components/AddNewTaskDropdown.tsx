type Props = {
  show: boolean;
  columns: string[];
  handleSelectedColumnChange: (value: string) => void;
};
function AddNewTaskDropdown({
  show,
  columns,
  handleSelectedColumnChange,
}: Props) {
  return (
    <div
      className={`bg-white absolute top-20 z-20 left-0 w-full h-[117px] rounded-lg flex-col gap-2 shadow-navM overflow-y-auto dark:bg-veryDarkGrey ${
        show ? "flex" : "hidden"
      }`}
    >
      {columns.map((column) => (
        <button
          key={column}
          onClick={() => handleSelectedColumnChange(column)}
          className="text-presetBL text-mediumGrey w-full text-left px-3 py-1.5 h-6 cursor-pointer capitalize dark:text-white"
        >
          {column}
        </button>
      ))}
    </div>
  );
}

export default AddNewTaskDropdown;
