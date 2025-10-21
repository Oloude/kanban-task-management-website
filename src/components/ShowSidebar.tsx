"use client";
import Image from "next/image";
import showIcon from "../../public/icon-show-sidebar.svg";
import useKanbanStore from "@/Store/KanbanStore";

function ShowSidebar() {
  const handleHideSidebar = useKanbanStore((state) => state.handleOpenSidebar);
  const hideSidebar = useKanbanStore((state) => state.hideSidebar);

  return (
    <button
      onClick={handleHideSidebar}
      className={`w-14 h-12 rounded-r-full bg-mainPurple items-center justify-center fixed left-0 bottom-10 z-30 hidden cursor-pointer hover:bg-purpleHover transition-all duration-100 ease-in-out ${
        hideSidebar ? "md:flex" : "md:hidden"
      }`}
    >
      <Image src={showIcon} alt="" className="w-4.5 h-3" />
    </button>
  );
}

export default ShowSidebar;
