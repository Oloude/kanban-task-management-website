"use client";
import Image from "next/image";
import closeIcon from "../../public/icon-cross.svg";
import { useState } from "react";

type Props = {
  item: string;
  handleDeleteItem: () => void;
  handleItemChange: (value: string, id: number) => void;
  id: number;
  error?: boolean;
};

function BoardColumn({
  item,
  handleDeleteItem,
  handleItemChange,
  id,
  error,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <div
        className={`border bg-inherit justify-between gap-3 h-10 grow w-full px-2 rounded-sm flex items-center ${
          error ? "border-red" : "border-mediumGrey/25"
        }`}
      >
        {isEditing ? (
          <input
            type="text"
            value={item} // <-- use prop directly
            autoFocus
            onChange={(e) => handleItemChange(e.target.value, id)}
            onBlur={() => setIsEditing(false)}
            className="outline-none text-presetBM text-mediumGrey dark:text-white"
          />
        ) : (
          <p
            onClick={() => setIsEditing(true)}
            className="cursor-pointer text-presetBM text-mediumGrey dark:text-white capitalize w-full"
          >
            {item || "Unnamed column"}
          </p>
        )}
        {error && (
          <span className="text-red text-xs text-right w-30">
            Can't be empty
          </span>
        )}
      </div>

      <button onClick={handleDeleteItem} className="cursor-pointer">
        <Image src={closeIcon} alt="" className="w-4 h-4" />
      </button>
    </div>
  );
}

export default BoardColumn;
