import {
  Box,
  Heading,
  VStack,
  Text,
  HStack,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { CgMoreO } from "react-icons/cg";

type Props = {
  task: any;
  view: string;
};

const TaskBox = ({ task, view }: Props) => {
  return (
    <VStack justifyContent={"center"} w={"full"}>
      <Box
        p={["10px", "15px", "20px"]}
        w={"90%"}
        h="auto"
        shadow={"md"}
        bg={"#e8dbd3"}
        borderColor={"#e0e0e0"}
        borderStyle={"solid"}
        borderRadius={"md"}
        rounded={"md"}
        justifyContent={"center"}
        overflow="hidden"
      >
        <HStack
          justifyContent={["flex-start", "space-between"]}
          alignItems={["flex-start", "center"]}
          direction={["column", "row"]}
        >
          <VStack align={"start"} spaceY={2}>
            <Heading size={"md"}>{task.title}</Heading>
            <Text fontSize={["sm", "md"]} wordBreak="break-word">
              {task.description}
            </Text>
          </VStack>
          <VStack spaceY={3}>
            {view !== "status_view" ? (
              <>
                <Text padding={1}>Estado: {task.status}</Text>
                {task.expiration_date ? (
                  <Text padding={1}>
                    Fecha de vencimiento: {task.expiration_date}
                  </Text>
                ) : (
                  <Text padding={1}>No posee fecha de vencimiento</Text>
                )}
                <Button size={["sm", "md"]}>Editar tarea</Button>
              </>
            ) : (
              <IconButton
                aria-label="Mas información"
                mb={4}
                variant="ghost"
                colorScheme="teal"
                size={["sm", "md"]}
              >
                <CgMoreO />
              </IconButton>
            )}
          </VStack>
        </HStack>
      </Box>
    </VStack>
  );
};

export default TaskBox;
