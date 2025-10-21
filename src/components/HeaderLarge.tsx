"use client";
import logoLight from "../../public/logo-light.svg";
import logoDark from "../../public/logo-dark.svg";
import verticalEllipsis from "../../public/icon-vertical-ellipsis.svg";
import Image from "next/image";
import { useTheme } from "./ThemeWrapper";
import useKanbanStore from "@/Store/KanbanStore";
import { useState } from "react";
import BoardDropdown from "./BoardDropdown";

function HeaderLarge() {
  const selectedBoardName = useKanbanStore((state) => state.selectedBoardName);
  const kanbanBoardData = useKanbanStore((state) => state.kanbanBoardData);
  const selectedBoardColumnLength = kanbanBoardData.boards.find(
    (board) => board.name === selectedBoardName
  )?.columns.length;
  const handleOpenNewTaskModal = useKanbanStore(
    (state) => state.handleOpenNewTaskModal
  );
  const { darkTheme } = useTheme();
  const [showBoardDropdown, setShowBoardDropdown] = useState(false);

  function handleToggleShowBoardDropdown() {
    setShowBoardDropdown((prev) => !prev);
  }

  return (
    <header className="hidden md:flex w-full h-[81px] bg-white border-b border-b-lineLight dark:border-b-lineDark dark:bg-darkGrey">
      <div className="flex justify-center items-center w-[261px]">
        <Image
          src={darkTheme ? logoLight : logoDark}
          alt=""
          className="w-[153px] h-[25px]"
        />
      </div>
      <div className="border-l border-l-lineLight flex justify-between items-center gap-4 grow px-8 dark:border-lineDark">
        <p className="text-lg font-bold capitalize text-black dark:text-white">
          {selectedBoardName}
        </p>
        <div className="flex items-center gap-6">
          <button
            disabled={selectedBoardColumnLength === 0}
            onClick={handleOpenNewTaskModal}
            className="bg-mainPurple rounded-full w-41 h-12 cursor-pointer flex gap-1 justify-center items-center text-presetM text-white disabled:opacity-25 hover:bg-purpleHover transition-all duration-150 ease-in-out"
          >
            +Add New task
          </button>
          <button
            onClick={handleToggleShowBoardDropdown}
            className="cursor-pointer"
          >
            <Image src={verticalEllipsis} alt="" />
          </button>
          <BoardDropdown
            show={showBoardDropdown}
            closeDropdown={handleToggleShowBoardDropdown}
          />
        </div>
      </div>
    </header>
  );
}

export default HeaderLarge;
