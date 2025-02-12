import {
  Box,
  Button,
  Field,
  FieldLabel,
  Heading,
  Input,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "../components/ui/radio";
import { FaChevronDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { createTask } from "../features/auth/services/TaskService";
import { useNavigate } from "react-router-dom";

type Props = {
  fetchTasks: () => void;
  setView: (view: string) => void;
};

const NewTaskForm = ({ fetchTasks, setView }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState<string | null>(null);
  const [status, setStatus] = useState("0");
  const [priority, setPriority] = useState("0");
  const [expirationDate, setExpirationDate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  const handlePriorityChange = (newPriority: string) => {
    setPriority(newPriority);
  };

  const handleSubmit = async () => {
    const taskData = {
      title,
      description,
      status,
      priority,
      dueDate: expirationDate,
    };
    try {
      await createTask(taskData);
      fetchTasks();
      setError(null);
      setView("list_view");
      navigate("/tasks");
    } catch (err: any) {
      setError(err.message);
    }
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
            Nueva tarea
          </Heading>
        </VStack>
        <Field.Root>
          <FieldLabel htmlFor={"title"} color={"brand.text"}>
            Nombre de la tarea: <Field.RequiredIndicator />
          </FieldLabel>
          <Input
            id="title"
            rounded={"2x1"}
            placeholder="Tarea numero 1"
            _placeholder={{ color: "gray.800" }}
            bg={"brand.inputBg"}
            border={"brand.inputBorder"}
            color={"brand.inputText"}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Field.Root>
        <Field.Root>
          <FieldLabel htmlFor="description" color={"brand.text"}>
            Descripción:
          </FieldLabel>
          <Input
            id="description"
            rounded={"2x1"}
            bg={"brand.inputBg"}
            border={"brand.inputBorder"}
            color={"brand.inputText"}
            placeholder="Descripción..."
            _placeholder={{ color: "gray.800" }}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field.Root>
        <Field.Root>
          <FieldLabel htmlFor={"statusField"} color={"brand.text"}>
            Estado:
          </FieldLabel>
          <RadioGroup
            id={"statusField"}
            value={String(status)}
            defaultValue={status}
            onChange={(e) =>
              handleStatusChange((e.target as HTMLInputElement).value)
            }
          >
            <HStack gap={6} pt={2} pl={2}>
              <Radio value="0">Pendiente</Radio>
              <Radio value="1">En progreso</Radio>
              <Radio value="2">Completada</Radio>
            </HStack>
          </RadioGroup>
        </Field.Root>
        <Field.Root>
          <FieldLabel htmlFor={"priorityField"} color={"brand.text"}>
            Prioridad:
          </FieldLabel>
          <RadioGroup
            id={"priorityField"}
            value={String(priority)}
            defaultValue={priority}
            onChange={(e) =>
              handlePriorityChange((e.target as HTMLInputElement).value)
            }
          >
            <HStack gap={6} pt={2} pl={2}>
              <Radio value="0">Baja</Radio>
              <Radio value="1">Media</Radio>
              <Radio value="2">Alta</Radio>
            </HStack>
          </RadioGroup>
        </Field.Root>
        <Field.Root>
          <FieldLabel htmlFor="expirationDate" color={"brand.text"}>
            Fecha de vencimiento:
          </FieldLabel>
          <Input
            id="expirationDate"
            rounded={"2x1"}
            bg={"brand.inputBg"}
            border={"brand.inputBorder"}
            color={"brand.inputText"}
            placeholder="YEAR-MM-DD"
            _placeholder={{ color: "gray.800" }}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </Field.Root>
        <Button
          onClick={handleSubmit}
          _hover={{ bg: "brand.hoverBg" }}
          bg={"brand.buttonBg"}
        >
          Crear tarea
        </Button>
        {error && (
          <Text color={"brand.errorText"} textStyle={"errorText"}>
            {error}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default NewTaskForm;
