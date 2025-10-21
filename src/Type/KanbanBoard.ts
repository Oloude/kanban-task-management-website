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

interface Column {
  name: string;
  tasks: Task[];
}

interface Board {
  name: string;
  columns: Column[];
}

interface Data {
  boards: Board[];
}

export default Data;
