import { Flex } from "@chakra-ui/react";
import Slidebar from "../../../components/Slidebar";
import SearchBar from "../../../components/SearchBar";
import { useEffect, useState } from "react";
import ActionBarComponent from "../../../components/ActionBarComponent";
import StatusView from "../../../components/StatusView";
import ListView from "../../../components/ListView";
import CalendarView from "../../../components/CalendarView";
import PriorityView from "../../../components/PriorityView";
import StatsView from "../../../components/StatsView";
import TaskFormView from "../../../components/TaskFormView";

const TasksPage = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [view, setView] = useState<string>("list_view");
  const [editingTask, setEditingTask] = useState<any | null>(null);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No hay token disponible");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/tasks/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener tareas: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Flex key={view} direction="column" m={0}>
      <ActionBarComponent setView={setView}></ActionBarComponent>
      <Flex
        margin={6}
        gap={4}
        direction={"row"}
        justifyContent={"center"}
        rounded={"full"}
        p={"10px"}
      >
        <SearchBar></SearchBar>
        <Slidebar />
      </Flex>
      {view === "status_view" && <StatusView tasks={tasks} />}
      {view === "list_view" && (
        <ListView
          tasks={tasks}
          loading={loading}
          setView={setView}
          view={view}
          setEditingTask={setEditingTask}
        />
      )}
      {view === "calendar_view" && <CalendarView tasks={tasks} />}
      {view === "priority_view" && <PriorityView tasks={tasks} />}
      {view === "statics_view" && <StatsView />}
      {(view === "new_task" || view === "edit_task") && (
        <TaskFormView
          fetchTasks={fetchTasks}
          setView={setView}
          task={editingTask}
          view={view}
        />
      )}
    </Flex>
  );
};

export default TasksPage;
