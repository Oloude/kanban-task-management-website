import Data from "@/Type/KanbanBoard";
import data from "../data.json";
import { create } from "zustand";

type Column = { id: number; name: string };

interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

interface Subtask {
  title: string;
  isCompleted: boolean;
}

type ViewData = {
  title: string;
  status: string;
};

type KanbanState = {
  hideSidebar: boolean;
  selectedBoardName: string;
  kanbanBoardData: Data;
  createNewBoardModal: boolean;
  openAddNewtaskModal: boolean;
  isOpenDeleteBoardModal: boolean;
  isOpenViewTaskModal: boolean;
  viewData: ViewData;
  isOpenDeleteTaskModal: boolean;
  isOpenEditBoardModal: boolean;
  isOpenEditTaskModal: boolean;
  handleOpenSidebar: () => void;
  handleCloseSidebar: () => void;
  handleSelectedBoardNameChange: (value: string) => void;
  handleOpenCreateNewBoardModal: () => void;
  handleCloseNewTaskModal: () => void;
  handleOpenNewTaskModal: () => void;
  handleCloseCreateNewBoardModal: () => void;
  handleCreateNewBoard: (boardName: string, columns: Column[]) => void;
  handleCreateNewTask: (task: Task) => void;
  handleOpenDeleteBoardModal: () => void;
  handleCloseDeleteBoardModal: () => void;
  handleDeleteBoard: (boardName: string) => void;
  handleOpenViewTaskModal: (data: ViewData) => void;
  handleCloseViewTaskmodal: () => void;
  handleToggleIsCompletedSubtask: (title: string, isComplete: boolean) => void;
  handleOpenDeleteTaskModal: () => void;
  handleCloseDeleteTaskModal: () => void;
  handleDeleteTask: () => void;
  handleStatusChange: (staus: string) => void;
  handleOpenEditBoardModal: () => void;
  handleCloseEditBoardModal: () => void;
  handleEditBoard: (boardName: string, columns: Column[]) => void;
  handleOpenEditTaskModal: () => void;
  handleCloseEditTaskModal: () => void;
  handleEditTask: (newTask: Task) => void;
  handleDragStart: (data: ViewData) => void;
};

const useKanbanStore = create<KanbanState>((set, get) => ({
  hideSidebar: false,
  selectedBoardName: "Platform Launch",
  kanbanBoardData: data,
  createNewBoardModal: false,
  openAddNewtaskModal: false,
  isOpenDeleteBoardModal: false,
  isOpenViewTaskModal: false,
  viewData: {
    title: "",
    status: "",
  },
  isOpenDeleteTaskModal: false,
  isOpenEditBoardModal: false,
  isOpenEditTaskModal: false,
  handleCloseSidebar: () => {
    set({ hideSidebar: true });
  },
  handleOpenSidebar: () => {
    set({ hideSidebar: false });
  },
  handleSelectedBoardNameChange: (value) => {
    set({ selectedBoardName: value });
  },
  handleCloseCreateNewBoardModal: () => set({ createNewBoardModal: false }),
  handleOpenCreateNewBoardModal: () => set({ createNewBoardModal: true }),
  handleOpenNewTaskModal: () => set({ openAddNewtaskModal: true }),
  handleCloseNewTaskModal: () => set({ openAddNewtaskModal: false }),
  handleCreateNewBoard: (boardName, columns) => {
    set((state) => ({
      kanbanBoardData: {
        // Keep existing boards
        boards: [
          ...state.kanbanBoardData.boards,
          {
            name: boardName,
            // Map columns to the format with empty tasks
            columns:
              columns.length > 0
                ? columns.map((column) => ({
                    name: column.name,
                    tasks: [],
                  }))
                : [],
          },
        ],
      },
    }));
  },
  handleCreateNewTask: (task) => {
    const { selectedBoardName } = get();
    set((state) => ({
      kanbanBoardData: {
        ...state.kanbanBoardData,
        boards: state.kanbanBoardData.boards.map((board) =>
          board.name === selectedBoardName
            ? {
                ...board,
                columns: board.columns.map((column) =>
                  column.name.toLowerCase() === task.status.toLowerCase()
                    ? { ...column, tasks: [...column.tasks, task] }
                    : column
                ),
              }
            : board
        ),
      },
    }));
  },
  handleCloseDeleteBoardModal: () => set({ isOpenDeleteBoardModal: false }),
  handleOpenDeleteBoardModal: () => {
    set({ isOpenDeleteBoardModal: true });
  },
  handleDeleteBoard: (boardName) => {
    set((state) => {
      const updatedBoards = state.kanbanBoardData.boards.filter(
        (board) => board.name !== boardName
      );

      return {
        kanbanBoardData: {
          ...state.kanbanBoardData,
          boards: updatedBoards,
        },
        selectedBoardName:
          updatedBoards.length > 0 ? updatedBoards[0].name : "",
      };
    });
  },

  handleCloseViewTaskmodal: () => {
    set({ isOpenViewTaskModal: false });
  },
  handleOpenViewTaskModal: (data) => {
    set({ isOpenViewTaskModal: true, viewData: data });
  },
  handleToggleIsCompletedSubtask: (title, isComplete) => {
    const { viewData, selectedBoardName } = get();

    set((state) => ({
      kanbanBoardData: {
        ...state.kanbanBoardData,
        boards: state.kanbanBoardData.boards.map((board) =>
          board.name === selectedBoardName
            ? {
                ...board,
                columns: board.columns.map((column) =>
                  column.name.toLowerCase() === viewData.status.toLowerCase()
                    ? {
                        ...column,
                        tasks: column.tasks.map((task) =>
                          task.title.toLowerCase() ===
                            viewData.title.toLowerCase() &&
                          task.status.toLowerCase() ===
                            viewData.status.toLowerCase()
                            ? {
                                ...task,
                                subtasks: task.subtasks.map((subtask) =>
                                  subtask.title === title
                                    ? {
                                        ...subtask,
                                        isCompleted: isComplete,
                                      }
                                    : subtask
                                ),
                              }
                            : task
                        ),
                      }
                    : column
                ),
              }
            : board
        ),
      },
    }));
  },
  handleCloseDeleteTaskModal: () => {
    set({ isOpenDeleteTaskModal: false });
  },
  handleOpenDeleteTaskModal: () => {
    set({ isOpenDeleteTaskModal: true, isOpenViewTaskModal: false });
  },
  handleDeleteTask: () => {
    const { viewData, selectedBoardName } = get();
    set((state) => ({
      kanbanBoardData: {
        ...state.kanbanBoardData,
        boards: state.kanbanBoardData.boards.map((board) =>
          board.name === selectedBoardName
            ? {
                ...board,
                columns: board.columns.map((column) =>
                  column.name.toLowerCase() === viewData.status.toLowerCase()
                    ? {
                        ...column,
                        tasks: column.tasks.filter(
                          (task) =>
                            task.title.toLowerCase() !==
                            viewData.title.toLowerCase()
                        ),
                      }
                    : column
                ),
              }
            : board
        ),
      },
      isOpenDeleteTaskModal: false,
    }));
  },
  handleStatusChange: (status) => {
    const { selectedBoardName, viewData } = get();

    set((state) => {
      const updatedBoards = state.kanbanBoardData.boards.map((board) => {
        if (board.name !== selectedBoardName) return board;

        // Find the task in the old column
        let taskToMove: Task | undefined;

        const updatedColumns = board.columns.map((column) => {
          if (column.name === viewData.status) {
            // Remove the task from old column
            const newTasks = column.tasks.filter((task) => {
              if (task.title === viewData.title) {
                taskToMove = { ...task, status }; // capture the task to move
                return false; // remove from old column
              }
              return true;
            });
            return { ...column, tasks: newTasks };
          }
          return column;
        });

        // Add the task to the column with the new status
        const finalColumns = updatedColumns.map((column) => {
          if (column.name === status && taskToMove) {
            return { ...column, tasks: [...column.tasks, taskToMove] };
          }
          return column;
        });

        return { ...board, columns: finalColumns };
      });

      return {
        kanbanBoardData: { ...state.kanbanBoardData, boards: updatedBoards },
        viewData: { ...state.viewData, status },
      };
    });
  },
  handleCloseEditBoardModal: () => {
    set({ isOpenEditBoardModal: false });
  },
  handleOpenEditBoardModal: () => {
    set({ isOpenEditBoardModal: true });
  },
  handleEditBoard: (boardName, columns) => {
    const { selectedBoardName } = get();

    set((state) => {
      const updatedBoards = state.kanbanBoardData.boards.map((board) => {
        if (board.name !== selectedBoardName) return board; // keep other boards unchanged

        // Map columns: update existing, remove empty, add new if needed
        const updatedColumns = columns.map((colName) => {
          const existingColumn = board.columns.find(
            (c, idx) => idx + 1 === colName.id
          ); // match by position

          return existingColumn
            ? { ...existingColumn, name: colName.name } // rename, keep tasks
            : { name: colName.name, tasks: [] }; // new column
        });

        return {
          ...board,
          name: boardName, // update board name
          columns: updatedColumns,
        };
      });

      return {
        kanbanBoardData: { ...state.kanbanBoardData, boards: updatedBoards },
        selectedBoardName: boardName,
      };
    });
  },
  handleCloseEditTaskModal: () => {
    set({ isOpenEditTaskModal: false });
  },
  handleOpenEditTaskModal: () => {
    set({ isOpenViewTaskModal: false, isOpenEditTaskModal: true });
  },
  handleEditTask: (newTask) => {
    const { selectedBoardName, viewData } = get();

    set((state) => {
      const updatedBoards = state.kanbanBoardData.boards.map((board) => {
        if (board.name !== selectedBoardName) return board;

        // Find the task in the old column
        let taskToMove: Task | undefined;

        const updatedColumns = board.columns.map((column) => {
          if (column.name === viewData.status) {
            // Remove the task from old column
            const newTasks = column.tasks.filter((task) => {
              if (task.title === viewData.title) {
                taskToMove = newTask; // capture the task to move
                return false; // remove from old column
              }
              return true;
            });
            return { ...column, tasks: newTasks };
          }
          return column;
        });
        const finalColumns = updatedColumns.map((column) => {
          if (column.name === newTask.status && taskToMove) {
            return { ...column, tasks: [...column.tasks, taskToMove] };
          }
          return column;
        });

        return { ...board, columns: finalColumns };
      });

      return {
        kanbanBoardData: { ...state.kanbanBoardData, boards: updatedBoards },
        viewData: { ...state.viewData, status: newTask.status },
      };
    });
  },
  handleDragStart: (data) => {
    set({ viewData: data });
  },
}));

export default useKanbanStore;
