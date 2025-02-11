import { Box, Flex, Text } from "@chakra-ui/react";
import TaskBox from "./TaskBox";

type Props = {
  tasks: any[];
};

const StatusView = ({ tasks }: Props) => {
  const pendingTasks = tasks.filter((task) => task.status === "PENDIENTE");
  const inProgressTasks = tasks.filter((task) => task.status === "EN_PROGRESO");
  const completedTasks = tasks.filter((task) => task.status === "COMPLETADA");
  const cancelledTasks = tasks.filter((task) => task.status === "CANCELADA");

  return (
    <Flex direction={"row"} gap={3} p={6} paddingLeft={20} pt={1}>
      <Box
        bg={"brand.statusPending"}
        w={"25%"}
        p={4}
        borderRadius="md"
        spaceY={2}
      >
        <Text textStyle={"otherHeading"} mb={2}>
          Pendientes
        </Text>
        {pendingTasks.length > 0 ? (
          pendingTasks.map((task) => (
            <TaskBox key={task.id} task={task} view={"status_view"} />
          ))
        ) : (
          <Text textStyle={"body"}>No hay tareas pendientes.</Text>
        )}
      </Box>
      <Box
        bg={"brand.statusInProgress"}
        w={"25%"}
        p={4}
        borderRadius="md"
        spaceY={2}
      >
        <Text textStyle={"otherHeading"} mb={2}>
          En Progreso
        </Text>
        {inProgressTasks.length > 0 ? (
          inProgressTasks.map((task) => (
            <TaskBox key={task.id} task={task} view={"status_view"} />
          ))
        ) : (
          <Text textStyle={"body"}>No hay tareas en progreso.</Text>
        )}
      </Box>
      <Box
        bg={"brand.statusCompleted"}
        w={"25%"}
        p={4}
        borderRadius="md"
        spaceY={2}
      >
        <Text textStyle={"otherHeading"} mb={2}>
          Completadas
        </Text>
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <TaskBox key={task.id} task={task} view={"status_view"} />
          ))
        ) : (
          <Text textStyle={"body"}>No hay tareas completadas.</Text>
        )}
      </Box>
      <Box
        bg={"brand.statusCanceled"}
        w={"25%"}
        p={4}
        borderRadius="md"
        spaceY={2}
      >
        <Text textStyle={"otherHeading"} mb={2}>
          Canceladas
        </Text>
        {cancelledTasks.length > 0 ? (
          cancelledTasks.map((task) => (
            <TaskBox key={task.id} task={task} view={"status_view"} />
          ))
        ) : (
          <Text textStyle={"body"}>No hay tareas canceladas.</Text>
        )}
      </Box>
    </Flex>
  );
};

export default StatusView;
