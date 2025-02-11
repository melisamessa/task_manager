import { Box, Flex, Text } from "@chakra-ui/react";
import TaskBox from "./TaskBox";

type Props = {
  tasks: any[];
};

const PriorityView = ({ tasks }: Props) => {
  const highPriorityTask = tasks.filter((task) => task.priority === "ALTA");
  const mediumPriorityTask = tasks.filter((task) => task.priority === "MEDIA");
  const lowPriorityTask = tasks.filter((task) => task.priority === "BAJA");

  return (
    <Flex direction={"row"} gap={3} p={6} paddingLeft={20} pt={1}>
      <Box
        bg={"brand.priorityLow"}
        w={"33%"}
        p={4}
        borderRadius="md"
        spaceY={2}
      >
        <Text textStyle={"otherHeading"} mb={2}>
          Prioridad baja:
        </Text>
        {lowPriorityTask.length > 0 ? (
          lowPriorityTask.map((task) => (
            <TaskBox key={task.id} task={task} view={"priority_view"} />
          ))
        ) : (
          <Text textStyle={"body"}>No hay tareas de prioridad baja.</Text>
        )}
      </Box>
      <Box
        bg={"brand.priorityMedium"}
        w={"33%"}
        p={4}
        borderRadius="md"
        spaceY={2}
      >
        <Text textStyle={"otherHeading"} mb={2}>
          Prioridad media:
        </Text>
        {mediumPriorityTask.length > 0 ? (
          mediumPriorityTask.map((task) => (
            <TaskBox key={task.id} task={task} view={"priority_view"} />
          ))
        ) : (
          <Text textStyle={"body"}>No hay tareas de prioridad media.</Text>
        )}
      </Box>
      <Box
        bg={"brand.priorityHigh"}
        w={"33%"}
        p={4}
        borderRadius="md"
        spaceY={2}
      >
        <Text textStyle={"otherHeading"} mb={2}>
          Prioridad alta:
        </Text>
        {highPriorityTask.length > 0 ? (
          highPriorityTask.map((task) => (
            <TaskBox key={task.id} task={task} view={"priority_view"} />
          ))
        ) : (
          <Text textStyle={"body"}>No hay tareas de prioridad alta.</Text>
        )}
      </Box>
    </Flex>
  );
};

export default PriorityView;
