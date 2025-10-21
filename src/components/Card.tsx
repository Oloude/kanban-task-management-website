"use client";

import useKanbanStore from "@/Store/KanbanStore";

interface Subtask {
  title: string;
  isCompleted: boolean;
}

interface Task {
  title: string;
  description: string;
  status: string; // e.g. "Todo", "Doing", "Done"
  subtasks: Subtask[];
}

type Props = {
  tasks: {
    title: string;
    description: string;
    status: string; // e.g. "Todo", "Doing", "Done"
    subtasks: Subtask[];
  };
  name: string;
};

function Card({ tasks, name }: Props) {
  const handleOpenViewTask = useKanbanStore(
    (state) => state.handleOpenViewTaskModal
  );
  const handleDragStart = useKanbanStore((state) => state.handleDragStart);
  const numberOfCompletedTask = tasks.subtasks.filter(
    (task) => task.isCompleted
  ).length;

  return (
    <article
      draggable
      onDragStart={() => handleDragStart({ title: tasks.title, status: name })}
      onClick={() => handleOpenViewTask({ title: tasks.title, status: name })}
      className="w-70 h-auto py-5.5 rounded-lg bg-white shadow-card flex flex-col gap-2 justify-center px-4 dark:bg-darkGrey cursor-pointer group"
    >
      <h4 className="text-presetM text-black dark:text-white group-hover:text-mainPurple transition-all duration-150 ease-in-out">
        {tasks.title}
      </h4>
      <p className="text-presetBM text-mediumGrey ">
        {numberOfCompletedTask} of {tasks.subtasks.length} subtasks
      </p>
    </article>
  );
}

export default Card;
