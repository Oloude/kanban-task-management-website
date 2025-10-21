"use client";
import { useTheme } from "./ThemeWrapper";
import Image from "next/image";
import moonIcon from "../../public/icon-light-theme.svg";
import sunIcon from "../../public/icon-dark-theme.svg";
import { TbLayoutBoardSplit } from "react-icons/tb";
import useKanbanStore from "@/Store/KanbanStore";

type Props = {
  showNav: boolean;
};

function NavigationSmall({ showNav }: Props) {
  const { darkTheme, handleToggleTheme } = useTheme();
  const selectedBoardName = useKanbanStore((state) => state.selectedBoardName);
  const kanbanBoardData = useKanbanStore((state) => state.kanbanBoardData);
  const handleSelectedBoardNameChange = useKanbanStore(
    (state) => state.handleSelectedBoardNameChange
  );
  const handleOpenCreateNewBoardModal = useKanbanStore(
    (state) => state.handleOpenCreateNewBoardModal
  );

  const kanbanBoardNames = kanbanBoardData.boards.map((item) => item.name);

  return (
    <nav
      className={` ${
        showNav ? "flex" : "hidden"
      } h-full justify-center bg-black/50 absolute top-16 left-0 right-0 pt-8  z-10`}
    >
      <div className="w-66 h-80.5 bg-white shadow-navM rounded-lg py-4 flex flex-col gap-3 dark:bg-darkGrey">
        <div className="flex flex-col gap-3 w-60 h-56.5">
          <header className="text-presetS text-mediumGrey uppercase px-10 dark:text">
            all boards ({kanbanBoardNames.length})
          </header>
          <ul className="flex flex-col overflow-y-auto flex-1 max-h-44">
            {kanbanBoardNames.map((name) => (
              <button
                key={name}
                onClick={() => handleSelectedBoardNameChange(name)}
                className={`${
                  selectedBoardName === name
                    ? " bg-mainPurple"
                    : " bg-transparent"
                } w-60 h-12 py-5 gap-3 flex items-center pl-10 rounded-r-full cursor-pointer  hover:bg-mainPurple/10 transition-all duration-150 ease-in-out group dark:hover:bg-lightGrey`}
              >
                <TbLayoutBoardSplit
                  className={`${
                    selectedBoardName === name
                      ? "text-white"
                      : "text-mediumGrey"
                  } w-4 h-4`}
                />
                <p
                  className={`${
                    selectedBoardName === name
                      ? "text-white"
                      : "text-mediumGrey"
                  } text-presetM capitalize group-hover:text-mainPurple transition-all duration-150 ease-in-out`}
                >
                  {name}
                </p>
              </button>
            ))}
            <button
              onClick={handleOpenCreateNewBoardModal}
              className={` w-60 h-12 text-presetM gap-3 py-5 flex items-center pl-10 rounded-r-full cursor-pointer`}
            >
              <TbLayoutBoardSplit className="text-mainPurple w-4 h-4" />
              <p className="text-mainPurple text-presetM">+Create New Board</p>
            </button>
          </ul>
        </div>

        <div className="w-[235px] h-12 bg-lightGrey rounded-md flex justify-center items-center self-center dark:bg-veryDarkGrey">
          <div className="flex items-center gap-6">
            <Image src={moonIcon} alt="" className="w-5 h-5" />
            <button
              onClick={handleToggleTheme}
              className={`${
                darkTheme ? "justify-end" : "justify-start"
              } cursor-pointer w-10 h-5 rounded-full bg-mainPurple p-[3px] flex items-center`}
            >
              <span className="w-3.5 h-3.5 bg-white rounded-full block"></span>
            </button>
            <Image src={sunIcon} alt="" className="w-4 h-4" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationSmall;
