"use client";
import Image from "next/image";
import logoMobile from "../../public/logo-mobile.svg";
import plusIcon from "../../public/icon-add-task-mobile.svg";
import verticalEllipsis from "../../public/icon-vertical-ellipsis.svg";
import arrowDown from "../../public/icon-chevron-down.svg";
import arrowUp from "../../public/icon-chevron-up.svg";
import { useState } from "react";
import NavigationSmall from "./NavigationSmall";
import useKanbanStore from "@/Store/KanbanStore";
import BoardDropdown from "./BoardDropdown";

function HeaderSmall() {
  const selectedBoardName = useKanbanStore((state) => state.selectedBoardName);
  const kanbanBoardData = useKanbanStore((state) => state.kanbanBoardData);
  const handleOpenNewTaskModal = useKanbanStore(
    (state) => state.handleOpenNewTaskModal
  );
  const selectedBoardColumnLength = kanbanBoardData.boards.find(
    (board) => board.name === selectedBoardName
  )?.columns.length;

  const [showNav, setShowNav] = useState(false);
  const [showBoardDropdown, setShowBoardDropdown] = useState(false);

  function handleToggleShowNav() {
    setShowNav((prev) => !prev);
  }

  function handleToggleShowBoardDropdown() {
    setShowBoardDropdown((prev) => !prev);
  }

  return (
    <header className="flex w-full bg-white h-16 justify-between items-center gap-4 px-4 dark:bg-darkGrey md:hidden">
      <div className="flex items-center gap-3">
        <Image src={logoMobile} alt="" className="w-6 h-6" />
        <div className="flex items-center gap-2.5">
          <p className="text-presetL text-black capitalize dark:text-white">
            {selectedBoardName}
          </p>
          <button onClick={handleToggleShowNav} className={`cursor-pointer`}>
            <Image
              src={showNav ? arrowUp : arrowDown}
              alt=""
              className="w-2 h-1.5"
            />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          disabled={selectedBoardColumnLength === 0}
          onClick={handleOpenNewTaskModal}
          className="w-12 h-8 bg-mainPurple cursor-pointer flex items-center justify-center rounded-full disabled:opacity-25 hover:bg-purpleHover transition-all duration-150 ease-in-out"
        >
          <Image src={plusIcon} alt="" className="w-3 h-3 " />
        </button>
        <button
          onClick={handleToggleShowBoardDropdown}
          className="w-1 h-4 cursor-pointer"
        >
          <Image src={verticalEllipsis} alt="" />
        </button>
      </div>
      <NavigationSmall showNav={showNav} />
      <BoardDropdown
        show={showBoardDropdown}
        closeDropdown={handleToggleShowBoardDropdown}
      />
    </header>
  );
}

export default HeaderSmall;
