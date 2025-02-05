import {
  Box,
  Button,
  Field,
  FieldLabel,
  Heading,
  Input,
  VStack,
  HStack,
  SelectRoot,
  SelectLabel,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
  createListCollection,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "../components/ui/radio";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import {
  createTask,
  getTasksByUser,
} from "../features/auth/services/TaskService";
import { useNavigate } from "react-router-dom";

type Props = {
  fetchTasks: () => void; // Recibe la función fetchTasks como prop
};

const NewTaskForm = ({ fetchTasks }: Props) => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState<string | null>(null);
  const [status, setStatus] = useState("PENDIENTE");
  const [expirationDate, setExpirationDate] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const taskData = {
      title,
      description,
      status,
      expiration_date: expirationDate,
      category,
    };
    try {
      console.log(taskData);
      const response = await createTask(taskData);
      console.log(response);
      fetchTasks();
      alert("Tarea creada con exito");
      navigate("/tasks");
      fetchTasks();
    } catch (err) {
      setError("Error al crear la tarea");
    }
  };

  return (
    <Box
      w={"80%"}
      border={"2px"}
      borderBlockColor={"gray.300"}
      borderRadius={"10px"}
      bg={"gray.200"}
      h={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <VStack spaceY={3} w={"80%"}>
        <VStack spaceX={1} w={"full"} pt={"20px"}>
          <Heading color={"black"}>Nueva tarea</Heading>
        </VStack>
        <Field.Root>
          <FieldLabel htmlFor="title" color={"black"}>
            Nombre de la tarea: <Field.RequiredIndicator />
          </FieldLabel>
          <Input
            id="title"
            rounded={"2x1"}
            placeholder="Tarea numero 1"
            _placeholder={{ color: "gray.300" }}
            bg={"gray.700"}
            color={"white"}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Field.ErrorText color={"red"}>
            Este campo es requerido
          </Field.ErrorText>
        </Field.Root>
        <Field.Root>
          <FieldLabel htmlFor="description" color={"black"}>
            Descripción: <Field.RequiredIndicator />
          </FieldLabel>
          <Input
            id="description"
            rounded={"2x1"}
            bg={"gray.700"}
            color={"white"}
            placeholder="Descripción..."
            _placeholder={{ color: "gray.300" }}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field.Root>
        <Field.Root>
          <FieldLabel htmlFor="status" color={"black"}>
            Estado: <Field.RequiredIndicator />
          </FieldLabel>
          <RadioGroup id="status" defaultValue="1">
            <HStack gap={6} pt={2} pl={2}>
              <Radio value="1">Pendiente</Radio>
              <Radio value="2">En progreso</Radio>
              <Radio value="3">Completada</Radio>
            </HStack>
          </RadioGroup>
        </Field.Root>
        <Field.Root>
          <FieldLabel htmlFor="expirationDate" color={"black"}>
            Fecha de vencimiento: <Field.RequiredIndicator />
          </FieldLabel>
          <Input
            id="expirationDate"
            rounded={"2x1"}
            type="password"
            bg={"gray.700"}
            color={"white"}
            placeholder="YEAR-MM-DD"
            _placeholder={{ color: "gray.300" }}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </Field.Root>
        <SelectRoot collection={frameworks} size={"sm"} width={"320px"}>
          <SelectLabel color={"black"} textAlign={"left"}>
            Seleccionar categoría
          </SelectLabel>
          <SelectTrigger bg={"gray.700"} color={"white"}>
            <SelectValueText placeholder={"Categoría"} />
            <FaChevronDown />
          </SelectTrigger>
          <SelectContent>
            {frameworks.items.map((movie) => (
              <SelectItem item={movie} key={movie.value}>
                {movie.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        <Button onClick={handleSubmit}>Crear tarea</Button>
      </VStack>
    </Box>
  );
};

const frameworks = createListCollection({
  items: [
    { label: "Trabajo", value: "work" },
    { label: "Universidad", value: "university" },
    { label: "En casa", value: "home" },
  ],
});

export default NewTaskForm;
