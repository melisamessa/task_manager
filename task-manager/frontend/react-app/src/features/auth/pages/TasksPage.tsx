import { Flex, Heading } from "@chakra-ui/react";
import Slidebar from "../../../components/Slidebar";
import Navbar from "../../../components/Navbar";
import { useEffect, useState } from "react";
import ActionBarComponent from "../../../components/ActionBarComponent";
import StatusView from "../../../components/StatusView";
import ListView from "../../../components/ListView";
import CalendarView from "../../../components/CalendarView";
import PriorityView from "../../../components/PriorityView";
import NewTaskView from "../../../components/NewTaskView";
import CategoryView from "../../../components/CategoryView";
import StatsView from "../../../components/StatsView";

const TasksPage = () => {
  const [tasks, setTasks] = useState<any[]>([]); // Estado de tareas
  const [loading, setLoading] = useState<boolean>(true);
  const [view, setView] = useState<string>("list_view");

  // Función para obtener las tareas desde el backend
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No hay token disponible");
      return;
    }

    try {
      // const decodedToken = jwtDecode(token);
      // const userId = decodedToken;
      // console.log(userId);
      const response = await fetch("http://localhost:8080/tasks/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setTasks(data); // Actualizamos el estado de las tareas
      setLoading(false); // Indicamos que la carga ha terminado
    } catch (error) {
      console.error("Error al obtener tareas:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(); // Cargamos las tareas cuando se monta el componente
  }, []); // Solo se ejecuta una vez, al montar el componente

  return (
    <Flex direction="column" m={0}>
      <ActionBarComponent setView={setView}></ActionBarComponent>
      <Flex
        margin={6}
        gap={4}
        direction={"row"}
        justifyContent={"space-between"}
        bg={"blackAlpha.100"}
        rounded={"full"}
        p={"10px"}
      >
        <Heading>Administrador de tareas</Heading>
        <Navbar></Navbar>
        <Slidebar />
      </Flex>
      {view === "status_view" && <StatusView tasks={tasks} />}
      {view === "list_view" && <ListView tasks={tasks} loading={loading} />}
      {view === "calendar_view" && <CalendarView />}
      {view === "priority_view" && <PriorityView />}
      {view === "category_view" && <CategoryView />}
      {view === "statics_view" && <StatsView />}
      {view === "new_task" && <NewTaskView fetchTasks={fetchTasks} />}
    </Flex>
  );
};

export default TasksPage;
