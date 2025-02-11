import { Flex } from "@chakra-ui/react";
import NewTaskForm from "./NewTaskForm";
import EditTaskForm from "./EditTaskForm";

type Props = {
  task: any;
  fetchTasks: () => void;
  setView: (view: string) => void;
  view: string;
};

const TaskFormView = ({ task, fetchTasks, setView, view }: Props) => {
  return (
    <Flex
      direction={"row"}
      gap={6}
      p={6}
      paddingLeft={20}
      pt={1}
      justifyContent={"center"}
    >
      {view === "new_task" ? (
        <NewTaskForm fetchTasks={fetchTasks} setView={setView} />
      ) : (
        <EditTaskForm
          task={task}
          setView={setView}
          fetchTasks={fetchTasks}
        ></EditTaskForm>
      )}
    </Flex>
  );
};

export default TaskFormView;
