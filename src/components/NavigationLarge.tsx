"use client";
import Image from "next/image";
import { TbLayoutBoardSplit } from "react-icons/tb";
import logoDark from "../../public/logo-dark.svg";
import logoLight from "../../public/logo-light.svg";
import moonIcon from "../../public/icon-light-theme.svg";
import sunIcon from "../../public/icon-dark-theme.svg";
import hideIcon from "../../public/icon-hide-sidebar.svg";
import { useTheme } from "./ThemeWrapper";
import useKanbanStore from "@/Store/KanbanStore";

function NavigationLarge() {
  const { darkTheme, handleToggleTheme } = useTheme();
  const handleHideSidebar = useKanbanStore((state) => state.handleCloseSidebar);
  const hideSidebar = useKanbanStore((state) => state.hideSidebar);
  const kanbanBoardData = useKanbanStore((state) => state.kanbanBoardData);
  const selectedBoardName = useKanbanStore((state) => state.selectedBoardName);
  const handleSelectedBoardNameChange = useKanbanStore(
    (state) => state.handleSelectedBoardNameChange
  );
  const handleOpenCreateNewBoardModal = useKanbanStore(
    (state) => state.handleOpenCreateNewBoardModal
  );

  const kanbanBoardNames = kanbanBoardData.boards.map((item) => item.name);

  return (
    <nav
      className={`min-w-[261px] h-auto border-r border-r-lineLight flex-col gap-3 justyfy-between py-8 relative z-20 -mt-[81px] bg-white dark:bg-darkGrey dark:border-r-lineDark hidden ${
        hideSidebar ? "md:hidden" : "md:flex"
      }`}
    >
      <div className="flex flex-col gap-16">
        <Image
          src={darkTheme ? logoLight : logoDark}
          alt=""
          className="pl-10 w-[153px] h-[25px] object-fit"
        />

        <div className="flex flex-col gap-3 w-60 h-56.5 ">
          <header className="text-presetS text-mediumGrey uppercase px-10 dark:text">
            all boards ({kanbanBoardNames.length})
          </header>
          <ul className="flex flex-col">
            {kanbanBoardNames.map((name) => (
              <button
                key={name}
                onClick={() => handleSelectedBoardNameChange(name)}
                className={`${
                  selectedBoardName === name ? " bg-mainPurple" : "bg-inherit"
                } w-60 h-12  gap-3 flex items-center pl-10 rounded-r-full cursor-pointer hover:bg-mainPurple/10 transition-all duration-150 ease-in-out group dark:hover:bg-lightGrey`}
              >
                <TbLayoutBoardSplit
                  className={`${
                    selectedBoardName === name
                      ? "text-white dark:hover:text-mainPurple"
                      : "text-mediumGrey"
                  } w-4 h-4 `}
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
              className={`w-60 h-12 text-presetM gap-3 flex items-center pl-10 rounded-r-full cursor-pointer`}
            >
              <TbLayoutBoardSplit className="text-mainPurple w-4 h-4" />
              <p className="text-mainPurple text-presetM">+Create New Board</p>
            </button>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-auto">
        <div className="w-[235px] h-12 bg-lightGrey rounded-md flex justify-center items-center self-center dark:bg-veryDarkGrey">
          <div className="flex items-center gap-6">
            <Image src={moonIcon} alt="" className="w-5 h-5" />
            <button
              onClick={handleToggleTheme}
              className={`${
                darkTheme ? "justify-end" : "justify-start"
              } cursor-pointer w-10 h-5 rounded-full bg-mainPurple p-[3px] flex items-center hover:bg-purpleHover transition-all duration-150 ease-in-out `}
            >
              <span className="w-3.5 h-3.5 bg-white rounded-full block"></span>
            </button>
            <Image src={sunIcon} alt="" className="w-4 h-4" />
          </div>
        </div>
        <button
          onClick={handleHideSidebar}
          className="w-60 h-12 bg-transparent flex pl-10 items-center gap-2.5 text-presetM text-mediumGrey cursor-pointer rounded-r-full transition-all duration-150 ease-in-out hover:bg-mainPurple/10 hover:text-mainPurple dark:hover:bg-lightGrey"
        >
          <Image src={hideIcon} alt="" className="w-4.5 h-4" />
          Hide Sidebar
        </button>
      </div>
    </nav>
  );
}

export default NavigationLarge;
