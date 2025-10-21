"use client";
import getRandomColor from "@/utils/getRandomColor";
import Card from "./Card";
import { useEffect, useState } from "react";
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

interface Column {
  name: string;
  tasks: Task[];
}

function Column({ name, tasks }: Column) {
  const handleStatusChange = useKanbanStore(
    (state) => state.handleStatusChange
  );
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    setBackgroundColor(getRandomColor());
  }, []);

  function handleDrop(status: string) {
    handleStatusChange(status);
    console.log(status);
  }
  return (
    <section
      onDrop={() => handleDrop(name)}
      onDragOver={(e) => e.preventDefault()}
      className="flex flex-col gap-6 min-w-70"
    >
      <div className="flex items-center gap-[15px]">
        <div
          className={`w-[15px] h-[15px] rounded-full`}
          style={{ backgroundColor: `${backgroundColor}` }}
        ></div>
        <h5 className="text-presetS text-mediumGrey uppercase">
          {name} ({tasks.length})
        </h5>
      </div>
      <div className="flex flex-col gap-5">
        {tasks.map((task) => (
          <Card key={task.title} name={name} tasks={{ ...task }} />
        ))}
      </div>
    </section>
  );
}

export default Column;
