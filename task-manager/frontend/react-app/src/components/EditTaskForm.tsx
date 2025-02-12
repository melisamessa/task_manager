import { useState, useEffect } from "react";
import {
  Button,
  Input,
  VStack,
  Box,
  Field,
  FieldLabel,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "../components/ui/radio";
import { deleteTask, updateTask } from "../features/auth/services/TaskService";
import { useNavigate } from "react-router-dom";

type Props = {
  task: any;
  setView: (view: string) => void;
  fetchTasks: () => void;
};

const EditTaskForm = ({ task, setView, fetchTasks }: Props) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [expirationDate, setExpirationDate] = useState(task?.dueDate || "");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(task?.title || "");
    setDescription(task?.description || "");
    setStatus(task?.status || "PENDIENTE");
    setPriority(task?.priority || "BAJA");
    setExpirationDate(task?.dueDate || "");
  }, [task]);

  const handleSubmit = async () => {
    const taskData = {
      title,
      description,
      status,
      priority,
      dueDate: expirationDate,
    };
    try {
      await updateTask(taskData, task.id);
      fetchTasks();
      setError(null);
      setView("list_view");
      navigate("/tasks");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      fetchTasks();
      setError(null);
      setView("list_view");
      navigate("/tasks");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handlePriorityChange = (newPriority: string) => {
    setPriority(newPriority);
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  return (
    <Box
      w={"80%"}
      border={"2px"}
      borderBlockColor={"gray.300"}
      borderRadius={"10px"}
      bg={"brand.authBox"}
      h={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <VStack spaceY={3} w={"80%"}>
        <VStack spaceX={1} w={"full"} pt={"20px"}>
          <Heading textStyle={"title"} color={"brand.text"}>
            Editar Tarea
          </Heading>
        </VStack>
        <Field.Root>
          <FieldLabel htmlFor={"titleEditForm"} color={"brand.text"}>
            Nombre de la tarea: <Field.RequiredIndicator />
          </FieldLabel>
          <Input
            id={"titleEditForm"}
            rounded={"2x1"}
            value={title}
            bg={"brand.inputBg"}
            border={"brand.inputBorder"}
            color={"brand.inputText"}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Field.Root>
        <Field.Root>
          <FieldLabel htmlFor={"descriptionEditForm"} color={"brand.text"}>
            Descripción:
          </FieldLabel>
          <Input
            id={"descriptionEditForm"}
            rounded={"2x1"}
            bg={"brand.inputBg"}
            border={"brand.inputBorder"}
            color={"brand.inputText"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field.Root>
        <Field.Root>
          <FieldLabel htmlFor={"statusFieldEditForm"} color={"brand.text"}>
            Estado:
          </FieldLabel>
          <RadioGroup
            id={"statusFieldEditForm"}
            value={status}
            onChange={(e) =>
              handleStatusChange((e.target as HTMLInputElement).value)
            }
          >
            <HStack gap={6} pt={2} pl={2}>
              <Radio value="PENDIENTE">Pendiente</Radio>
              <Radio value="EN_PROGRESO">En progreso</Radio>
              <Radio value="COMPLETADA">Completada</Radio>
              <Radio value="CANCELADA">Cancelada</Radio>
            </HStack>
          </RadioGroup>
        </Field.Root>
        <Field.Root>
          <FieldLabel htmlFor={"priorityFieldEditForm"} color={"brand.text"}>
            Prioridad:
          </FieldLabel>
          <RadioGroup
            id={"priorityFieldEditForm"}
            value={priority}
            onChange={(e) =>
              handlePriorityChange((e.target as HTMLInputElement).value)
            }
          >
            <HStack gap={6} pt={2} pl={2}>
              <Radio value="BAJA">Baja</Radio>
              <Radio value="MEDIA">Media</Radio>
              <Radio value="ALTA">Alta</Radio>
            </HStack>
          </RadioGroup>
        </Field.Root>
        <Field.Root>
          <FieldLabel htmlFor={"expirationDateEditForm"} color={"brand.text"}>
            Fecha de vencimiento:
          </FieldLabel>
          <Input
            id={"expirationDateEditForm"}
            rounded={"2x1"}
            bg={"brand.inputBg"}
            border={"brand.inputBorder"}
            color={"brand.inputText"}
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </Field.Root>
        <HStack w={"full"} justifyContent={"space-evenly"} p={5}>
          <Button
            colorScheme="teal"
            onClick={handleSubmit}
            _hover={{ bg: "brand.hoverBg" }}
            bg={"brand.buttonBg"}
          >
            Guardar
          </Button>
          <Button
            onClick={() => setView("list_view")}
            _hover={{ bg: "brand.hoverBg" }}
            bg={"brand.buttonBg"}
          >
            Cancelar
          </Button>
          <Button
            _hover={{ bg: "brand.hoverBg" }}
            bg={"brand.buttonBg"}
            onClick={handleDelete}
          >
            Eliminar tarea
          </Button>
        </HStack>
        {error && (
          <Text color={"brand.errorText"} textStyle={"errorText"}>
            {error}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default EditTaskForm;
