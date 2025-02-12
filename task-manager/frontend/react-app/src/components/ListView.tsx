import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import TaskBox from "./TaskBox";

type Props = {
  tasks: any[];
  loading: boolean;
  view: string;
  setView: (view: string) => void;
  setEditingTask: (task: any) => void;
};

const ListView = ({ tasks, loading, view, setView, setEditingTask }: Props) => {
  console.log(tasks);
  return (
    <Flex w={"full"} pt={0} justifyContent={"center"} ml={"10"} mt={"0"}>
      {loading ? (
        <Text>Cargando tareas...</Text>
      ) : tasks.length === 0 ? (
        <VStack spaceY={3} m={0} p={0}>
          <Text textStyle={"title"} color={"brand.text"}>
            ¡Bienvenido!
          </Text>
          <Text textStyle={"body"} color={"brand.text"}>
            No tienes tareas, ¿quieres crear una?
          </Text>
          <Button
            bg={"brand.buttonBg"}
            _hover={{ bg: "brand.hoverBg" }}
            onClick={() => {
              setView("new_task");
            }}
          >
            Crear tarea
          </Button>
        </VStack>
      ) : (
        <Flex gap={4} direction="column" margin="40px" w={"full"}>
          {tasks.map((task: any) => (
            <TaskBox
              key={task.id}
              task={task}
              view={view}
              setView={setView}
              setEditingTask={setEditingTask}
            />
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default ListView;
