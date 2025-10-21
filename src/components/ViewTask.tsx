"use client";
import Image from "next/image";
import verticalEllipsis from "../../public/icon-vertical-ellipsis.svg";
import arrowDown from "../../public/icon-chevron-down.svg";
import useKanbanStore from "@/Store/KanbanStore";
import Subtask from "./Subtask";
import { useEffect, useState } from "react";
import TaskDropdown from "./TaskDropdown";
import CurrentStatusDropdown from "./CurrentStatusDropdown";

function ViewTask() {
  const kanbanBoardData = useKanbanStore((state) => state.kanbanBoardData);
  const selectedBoardName = useKanbanStore((state) => state.selectedBoardName);
  const viewData = useKanbanStore((state) => state.viewData);
  const handleCloseViewTaskModal = useKanbanStore(
    (state) => state.handleCloseViewTaskmodal
  );
  const handleToggleIsCompletedSubtask = useKanbanStore(
    (state) => state.handleToggleIsCompletedSubtask
  );
  const handleStatusChange = useKanbanStore(
    (state) => state.handleStatusChange
  );
  const columns = kanbanBoardData.boards
    .filter((board) => board.name === selectedBoardName)[0]
    .columns.map((column) => column.name);
  const [showDropdown, setShowDropdown] = useState(false);

  const [currentStatus, setCurrentStatus] = useState(viewData.status);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const data = kanbanBoardData.boards
    .filter((board) => board.name === selectedBoardName)[0]
    .columns.filter(
      (column) => column.name.toLowerCase() === viewData.status.toLowerCase()
    )[0]
    .tasks.filter((task) => task.title === viewData.title)[0];

  const subtaskCompletedLength = data.subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;
  const subtaskLength = data.subtasks.length;

  function handleToggleShowDropdown() {
    setShowDropdown((prev) => !prev);
  }

  function handleCurrentStatusChange(value: string) {
    setCurrentStatus(value);
  }

  function handleToggleShowStatusDropdown() {
    setShowStatusDropdown((prev) => !prev);
  }

  useEffect(() => {
    handleStatusChange(currentStatus);
  }, [currentStatus, handleStatusChange]);

  return (
    <section
      onClick={handleCloseViewTaskModal}
      className="flex items-center justify-center absolute inset-0 bg-black/50 z-30 cursor-pointer px-6 md:px-0"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-6 p-6 w-full h-auto rounded-md bg-white dark:bg-darkGrey max-w-[480px]"
      >
        <div className="flex items-center gap-8 justify-between relative">
          <h3 className="text-presetL text-black dark:text-white">
            {data.title}
          </h3>
          <button onClick={handleToggleShowDropdown} className="cursor-pointer">
            <Image src={verticalEllipsis} alt="" />
          </button>
          <TaskDropdown
            show={showDropdown}
            closeDropdown={handleToggleShowDropdown}
          />
        </div>
        <p className="text-presetBL text-mediumGrey">{data.description}</p>
        <div className="flex flex-col gap-2">
          <p className="text-presetBM text-mediumGrey dark:text-white">
            Subtasks ({subtaskCompletedLength} of {subtaskLength})
          </p>
          <div className="flex flex-col gap-2">
            {data.subtasks.map((subtask, idx) => (
              <Subtask
                key={idx}
                {...subtask}
                handleToggleCompleted={handleToggleIsCompletedSubtask}
              />
            ))}
          </div>
        </div>
        <label htmlFor="" className="flex flex-col gap-2 relative">
          <p className="text-presetBM text-mediumGrey dark:text-white">
            Current Status
          </p>
          <div className=" w-full flex items-center gap-4 justify-between px-2 bg-inherit h-10 rounded-sm border border-mediumGrey/25 text-presetBL text-black focus-within:border-mainPurple">
            <p className="text-presetBL text-black dark:text-white">
              {currentStatus}
            </p>
            <button
              onClick={handleToggleShowStatusDropdown}
              className="cursor-pointer"
            >
              <Image src={arrowDown} alt="" />
            </button>
          </div>
          <CurrentStatusDropdown
            columns={columns}
            show={showStatusDropdown}
            handleSelectedColumnChange={handleCurrentStatusChange}
          />
        </label>
      </div>
    </section>
  );
}

export default ViewTask;
