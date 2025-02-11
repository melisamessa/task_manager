import { Box, Heading, VStack, Text, HStack, Button } from "@chakra-ui/react";

type Props = {
  task: any;
  view: string;
  setView?: (view: string) => void;
  setEditingTask?: (task: any) => void;
};

const TaskBox = ({ task, view, setView, setEditingTask }: Props) => {
  const handleEditClick = () => {
    if (setView && setEditingTask) {
      setEditingTask(task);
      setView("edit_task");
    }
  };

  return (
    <VStack justifyContent={"center"} w={"full"}>
      <Box
        p={["10px", "15px", "20px"]}
        w={"90%"}
        h="auto"
        shadow={"md"}
        bg="brand.taskBox"
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
        >
          <VStack align={"start"} spaceY={2}>
            <Heading textStyle={"taskHeading"} color={"brand.text"}>
              {task.title}
            </Heading>
            <Text
              fontSize={["sm", "md"]}
              wordBreak="break-word"
              textStyle={"body"}
            >
              {task.description}
            </Text>
          </VStack>
          <VStack spaceY={3}>
            {
              view !== "status_view" && view !== "priority_view" ? (
                <>
                  <Text padding={1} textStyle={"body"}>
                    Estado: {task.status}
                  </Text>
                  {task.dueDate ? (
                    <Text padding={1} textStyle={"body"}>
                      Fecha de vencimiento: {task.dueDate}
                    </Text>
                  ) : (
                    <Text padding={1} textStyle={"body"}>
                      No posee fecha de vencimiento
                    </Text>
                  )}
                  {setView && setEditingTask && (
                    <Button
                      bg={"brand.buttonBg"}
                      size={["sm", "md"]}
                      onClick={handleEditClick}
                      _hover={{ bg: "brand.hoverBg" }}
                    >
                      Editar tarea
                    </Button>
                  )}
                </>
              ) : null
              // <IconButton
              //   aria-label="Mas información"
              //   mb={4}
              //   variant="ghost"
              //   colorScheme="teal"
              //   size={["sm", "md"]}
              // >
              //   <CgMoreO />
              // </IconButton>
            }
          </VStack>
        </HStack>
      </Box>
    </VStack>
  );
};

export default TaskBox;
