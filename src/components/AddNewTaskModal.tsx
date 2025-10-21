"use client";

import Image from "next/image";
import arrowDown from "../../public/icon-chevron-down.svg";
import { useState } from "react";
import BoardColumn from "./BoardColumn";
import AddNewTaskDropdown from "./AddNewTaskDropdown";
import useKanbanStore from "@/Store/KanbanStore";

function AddNewTaskModal() {
  const kanbanBoardData = useKanbanStore((state) => state.kanbanBoardData);
  const selectedBoardName = useKanbanStore((state) => state.selectedBoardName);
  const handleCloseNewTaskModal = useKanbanStore(
    (state) => state.handleCloseNewTaskModal
  );
  const { handleCreateNewTask } = useKanbanStore();
  const [tasks, setTasks] = useState([
    { id: 1, task: "" },
    { id: 2, task: "" },
  ]);
  const [showDropdown, setShowDropDown] = useState(false);
  const selectedBoardNameColumns = kanbanBoardData.boards
    .filter((board) => board.name === selectedBoardName)[0]
    .columns.map((column) => column.name);
  const [selectedColumn, setSelectedColumn] = useState(
    selectedBoardNameColumns[0]
  );

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });

  const [titleError, setTitleError] = useState(false);
  const [taskError, setTaskError] = useState({ id: 0 });

  function handleDeleteItem(id: number) {
    if (tasks.length === 2) {
      return;
    }
    setTasks((prev) => prev.filter((item) => item.id !== id));
  }

  function handleItemChange(value: string, id: number) {
    setTasks((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task: value } : item))
    );
  }

  function handleAddNewTask() {
    setTasks((prev) => [...prev, { id: new Date().getTime(), task: "" }]);
  }

  function handleToggleShowDropdown() {
    setShowDropDown((prev) => !prev);
  }

  function handleSelectedColumnChange(value: string) {
    setSelectedColumn(value);
  }

  function handleTaskDataChange(value: string, prop: string) {
    setTaskData((prev) => {
      return {
        ...prev,
        [prop]: value,
      };
    });
  }

  function handleNewTask() {
    setTitleError(false);
    setTaskError({ id: 0 });
    if (!taskData.title.trim()) {
      setTitleError(true);
      return;
    } else if (tasks.some((task) => !task.task.trim())) {
      const emptyTask = tasks.filter((item) => !item.task.trim())[0];
      setTaskError({
        id: emptyTask.id,
      });
      return;
    }
    const subtask = tasks.map((task) => ({
      title: task.task,
      isCompleted: false,
    }));

    handleCreateNewTask({
      title: taskData.title,
      description: taskData.description,
      status: selectedColumn,
      subtasks: subtask,
    });
    handleCloseNewTaskModal();
  }
  return (
    <section
      onClick={handleCloseNewTaskModal}
      className="flex items-center justify-center absolute inset-0 bg-black/50 z-30 px-6 md:px-0 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-6 py-6 px-4 w-full h-auto rounded-md bg-white dark:bg-darkGrey max-w-[480px]"
      >
        <h3 className="text-presetL text-black dark:text-white">
          Add New Task
        </h3>
        <label htmlFor="" className="flex flex-col gap-2">
          <p className="text-presetBM text-mediumGrey dark:text-white">Title</p>
          <input
            type="text"
            name=""
            id=""
            value={taskData.title}
            onChange={(e) => handleTaskDataChange(e.target.value, "title")}
            placeholder="eg Take coffee break"
            className={`outline-none w-full px-2 bg-inherit h-10 rounded-sm border text-presetBL text-black dark:text-mediumGrey focus-within:border-mainPurple transition-all duration-150 ease-in-out ${
              titleError ? "border-red" : "border-mediumGrey/25"
            }`}
          />
        </label>
        <label htmlFor="" className="flex flex-col gap-2">
          <p className="text-presetBM text-mediumGrey dark:text-white">
            Description
          </p>
          <textarea
            onChange={(e) =>
              handleTaskDataChange(e.target.value, "description")
            }
            value={taskData.description}
            name=""
            id=""
            placeholder="Platform Launch"
            className="outline-none w-full p-2 bg-inherit h-20 rounded-sm border border-mediumGrey/25 text-presetBL text-black dark:text-mediumGrey focus-within:border-mainPurple transition-all duration-150 ease-in-out"
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
            {tasks.map((item) => (
              <BoardColumn
                key={item.id}
                id={item.id}
                item={item.task}
                handleDeleteItem={() => handleDeleteItem(item.id)}
                handleItemChange={handleItemChange}
                error={item.id === taskError.id}
              />
            ))}
            <button
              onClick={handleAddNewTask}
              className="text-presetBM text-mainPurple bg-mainPurple/10 rounded-full w-full h-10 dark:bg-white cursor-pointer hover:bg-mainPurple/25 transition-all duration-150 ease-in-out dark:hover:bg-lightGrey"
            >
              + Add New Subtask
            </button>
          </div>
        </div>
        <label htmlFor="" className="flex flex-col gap-2 relative">
          <p className="text-presetBM text-mediumGrey dark:text-white">
            Status
          </p>
          <div className=" w-full flex items-center gap-4 justify-between px-2 bg-inherit h-10 rounded-sm border border-mediumGrey/25 text-presetBL text-black dark:text-mediumGrey">
            <p className="text-presetBL text-mediumGrey dark:text-white capitalize">
              {selectedColumn}
            </p>
            <button
              onClick={handleToggleShowDropdown}
              className="cursor-pointer"
            >
              <Image src={arrowDown} alt="" />
            </button>
          </div>
          <AddNewTaskDropdown
            show={showDropdown}
            columns={selectedBoardNameColumns}
            handleSelectedColumnChange={handleSelectedColumnChange}
          />
        </label>
        <button
          onClick={handleNewTask}
          className="text-presetBM text-white bg-mainPurple h-10 w-full rounded-full cursor-pointer hover:bg-purpleHover transition-all duration-150 ease-in-out"
        >
          Create Task
        </button>
      </div>
    </section>
  );
}

export default AddNewTaskModal;
