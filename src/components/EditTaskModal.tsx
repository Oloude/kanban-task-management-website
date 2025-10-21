"use client";

import Image from "next/image";
import arrowDown from "../../public/icon-chevron-down.svg";
import useKanbanStore from "@/Store/KanbanStore";
import { ChangeEvent, useState } from "react";
import BoardColumn from "./BoardColumn";
import CurrentStatusDropdown from "./CurrentStatusDropdown";

interface Subtask {
  title: string;
  isCompleted: boolean;
}

interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

function EditTaskModal() {
  const handleCloseEditTaskModal = useKanbanStore(
    (state) => state.handleCloseEditTaskModal
  );
  const handleEditTask = useKanbanStore((state) => state.handleEditTask);
  const kanbanBoardData = useKanbanStore((state) => state.kanbanBoardData);
  const selectedBoardName = useKanbanStore((state) => state.selectedBoardName);
  const viewData = useKanbanStore((state) => state.viewData);

  const selectedTask = kanbanBoardData.boards
    .find((board) => board.name === selectedBoardName)
    ?.columns.find(
      (column) => column.name.toLowerCase() === viewData.status.toLowerCase()
    )
    ?.tasks.find((task) => task.title === viewData.title) ?? {
    title: "",
    description: "",
    subtasks: [],
    status: "",
  };

  const status =
    kanbanBoardData.boards
      .find((board) => board.name === selectedBoardName)
      ?.columns.map((column) => column.name) ?? [];

  const [task, setTask] = useState<Task>(selectedTask);
  const [showDropdown, setShowDropdown] = useState(false);

  function handleTaskChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setTask((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleToggleShowDropdown() {
    setShowDropdown((prev) => !prev);
  }

  function handleSelectedStatus(value: string) {
    setTask((prev) => {
      return {
        ...prev,
        status: value,
      };
    });
  }

  function handleDeleteItem(id: number) {
    setTask((prev) => {
      return {
        ...prev,
        subtasks: prev.subtasks.filter((subtask, idx, arr) =>
          arr.length < 2 ? true : idx + 1 !== id
        ),
      };
    });
  }

  function handleChangeItem(value: string, id: number) {
    setTask((prev) => {
      return {
        ...prev,
        subtasks: prev.subtasks.map((subtask, idx) =>
          idx + 1 === id ? { ...subtask, title: value } : subtask
        ),
      };
    });
  }

  function handleAddSubtask() {
    setTask((prev) => {
      return {
        ...prev,
        subtasks: [...prev.subtasks, { title: "", isCompleted: false }],
      };
    });
  }

  function handleEdit() {
    const newTask = {
      ...task,
      subtasks: task.subtasks.filter((subtask) => subtask.title.trim() !== ""),
    };

    handleEditTask(newTask);
    handleCloseEditTaskModal();
  }

  return (
    <section
      onClick={handleCloseEditTaskModal}
      className="flex items-center justify-center absolute inset-0 bg-black/50 z-30 px-6 md:px-0 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-6 w-full h-auto rounded-md py-6 px-6 bg-white dark:bg-darkGrey max-w-[480px]"
      >
        <h3 className="text-presetL text-black dark:text-white">Edit Task</h3>
        <label htmlFor="" className="flex flex-col gap-2">
          <p className="text-presetBM text-mediumGrey dark:text-white">Title</p>
          <input
            type="text"
            name="title"
            id=""
            placeholder="Platform Launch"
            value={task?.title}
            onChange={handleTaskChange}
            className="outline-none w-full px-2 bg-inherit h-10 rounded-sm border border-mediumGrey/25 text-presetBL text-black dark:text-white"
          />
        </label>
        <label htmlFor="" className="flex flex-col gap-2">
          <p className="text-presetBM text-mediumGrey dark:text-white">
            Description
          </p>
          <textarea
            name="description"
            id=""
            onChange={handleTaskChange}
            placeholder="Platform Launch"
            value={task?.description}
            className="outline-none w-full px-2 bg-inherit h-10 rounded-sm border border-mediumGrey/25 text-presetBL text-black dark:text-white"
          ></textarea>
        </label>
        <div className="flex flex-col gap-2">
          <label
            htmlFor=""
            className="text-presetBM text-mediumGrey dark:text-white"
          >
            Subtask
          </label>
          <div className="flex flex-col gap-3">
            {task?.subtasks.map((subtask, idx) => (
              <BoardColumn
                key={idx + 1}
                item={subtask.title}
                handleDeleteItem={() => handleDeleteItem(idx + 1)}
                handleItemChange={handleChangeItem}
                id={idx + 1}
              />
            ))}
            <button
              onClick={handleAddSubtask}
              className="text-presetBL font-bold text-mainPurple bg-mainPurple/10 rounded-full w-full h-10 dark:bg-lightGrey"
            >
              + Add New Subtask
            </button>
          </div>
        </div>
        <label htmlFor="" className="flex flex-col gap-2">
          <p className="text-presetBM text-mediumGrey dark:text-white">
            Status
          </p>
          <div className=" w-full flex items-center gap-4 justify-between px-2 bg-inherit h-10 rounded-sm border border-mediumGrey/25 relative">
            <p className="text-presetBL text-black  dark:text-white">
              {task?.status}
            </p>
            <button
              onClick={handleToggleShowDropdown}
              className="cursor-pointer"
            >
              <Image src={arrowDown} alt="" />
            </button>
            <CurrentStatusDropdown
              show={showDropdown}
              columns={status}
              handleSelectedColumnChange={handleSelectedStatus}
            />
          </div>
        </label>
        <button
          onClick={handleEdit}
          className="text-presetBL font-bold text-white bg-mainPurple h-10 w-full rounded-full cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </section>
  );
}

export default EditTaskModal;
