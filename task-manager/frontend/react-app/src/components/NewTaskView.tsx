import { Flex } from "@chakra-ui/react";
import NewTaskForm from "./NewTaskForm";

type Props = {
  fetchTasks: () => void;
};

const NewTaskView = ({ fetchTasks }: Props) => {
  return (
    <Flex
      direction={"row"}
      gap={6}
      p={6}
      paddingLeft={20}
      pt={1}
      justifyContent={"center"}
    >
      <NewTaskForm fetchTasks={fetchTasks} />
    </Flex>
  );
};

export default NewTaskView;
