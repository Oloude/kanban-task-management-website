import { useState } from "react";

type Props = {
  title: string;
  isCompleted: boolean;
  handleToggleCompleted: (title: string, isComplete: boolean) => void;
};

function Subtask({ title, isCompleted, handleToggleCompleted }: Props) {
  const [isChecked, setIsChecked] = useState(isCompleted);

  function handleChecked(value: boolean) {
    setIsChecked(value);
    handleToggleCompleted(title, value);
  }
  return (
    <div className="bg-lightGrey rounded-sm flex items-center gap-2 px-2 py-3 dark:bg-veryDarkGrey hover:bg-mainPurple/25">
      <input
        type="checkbox"
        name=""
        id=""
        onChange={(e) => handleChecked(e.target.checked)}
        className="w-4 h-4 accent-mainPurple"
        checked={isCompleted}
      />
      <p
        className={`${
          isCompleted
            ? "text-black/50 line-through dark:text-white/50"
            : "text-black dark:text-white"
        } text-presetBM`}
      >
        {title}
      </p>
    </div>
  );
}

export default Subtask;
