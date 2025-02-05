import { Flex, Text } from "@chakra-ui/react";
import TaskBox from "./TaskBox";

type Props = {
  tasks: any[];
  loading: boolean;
};

const ListView = ({ tasks, loading }: Props) => {
  return (
    <Flex w={"full"} pt={0} justifyContent={"center"} ml={"10"} mt={"0"}>
      {loading ? (
        <Text>Cargando tareas...</Text>
      ) : tasks.length === 0 ? (
        <Flex direction="column" align="center" w={"full"}>
          <Text>No tienes tareas, ¿quieres crear una?</Text>
        </Flex>
      ) : (
        <Flex gap={4} direction="column" margin="40px" w={"full"}>
          {tasks.map((task: any) => (
            <TaskBox key={task.id} task={task} view={"list_view"} />
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default ListView;
