"use client";
import AddNewBoardModal from "@/components/AddNewBoardModal";
import AddNewTaskModal from "@/components/AddNewTaskModal";
import Board from "@/components/Board";
import DeleteBoardModal from "@/components/DeleteBoardModal";
import DeleteTaskModal from "@/components/DeleteTaskModal";
import EditBoardModal from "@/components/EditBoardModal";
import EditTaskModal from "@/components/EditTaskModal";
import HeaderLarge from "@/components/HeaderLarge";
import HeaderSmall from "@/components/HeaderSmall";
import NavigationLarge from "@/components/NavigationLarge";
import ShowSidebar from "@/components/ShowSidebar";
import ViewTask from "@/components/ViewTask";
import useKanbanStore from "@/Store/KanbanStore";

function Home() {
  const createNewBoardModal = useKanbanStore(
    (state) => state.createNewBoardModal
  );
  const isOpenAddNewTaskModal = useKanbanStore(
    (state) => state.openAddNewtaskModal
  );
  const isOpenDeleteBoardModal = useKanbanStore(
    (state) => state.isOpenDeleteBoardModal
  );
  const isOpenViewTaskModal = useKanbanStore(
    (state) => state.isOpenViewTaskModal
  );
  const isOpenDeleteTaskModal = useKanbanStore(
    (state) => state.isOpenDeleteTaskModal
  );
  const isOpenEditBoardModal = useKanbanStore(
    (state) => state.isOpenEditBoardModal
  );
  const isOpenEditTaskModal = useKanbanStore(
    (state) => state.isOpenEditTaskModal
  );
  return (
    <main className="flex flex-col relative bg-lightGrey dark:bg-veryDarkGrey">
      <HeaderSmall />
      <HeaderLarge />
      <ShowSidebar />
      <section className="flex">
        <NavigationLarge />
        <Board />
      </section>

      {createNewBoardModal && <AddNewBoardModal />}
      {isOpenAddNewTaskModal && <AddNewTaskModal />}
      {isOpenDeleteBoardModal && <DeleteBoardModal />}
      {isOpenViewTaskModal && <ViewTask />}
      {isOpenDeleteTaskModal && <DeleteTaskModal />}
      {isOpenEditBoardModal && <EditBoardModal />}
      {isOpenEditTaskModal && <EditTaskModal />}
    </main>
  );
}

export default Home;
