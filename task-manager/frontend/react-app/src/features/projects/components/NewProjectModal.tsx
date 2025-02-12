import { useState } from "react";
import {
  Button,
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldLabel,
  Input,
  VStack,
  Text,
  DialogBackdrop,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../services/ProjectService";

type Props = {
  fetchProjects: () => void;
};

const NewProjectModal = ({ fetchProjects }: Props) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setError(null);
  };

  const handleSubmit = async () => {
    const projectData = {
      title,
      description,
    };
    try {
      await createProject(projectData);
      fetchProjects();
      setError(null);
      resetForm();
      setOpen(false);
      navigate("/projects");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogBackdrop bg="rgba(0, 0, 0, 0.5)" />
      <DialogTrigger asChild>
        <Button
          position="absolute"
          right="0"
          bg={"brand.buttonBg"}
          _hover={{ bg: "brand.hoverBg" }}
        >
          + Nuevo proyecto
        </Button>
      </DialogTrigger>

      <DialogContent
        position="fixed"
        top="30%"
        left="50%"
        transform="translate(-50%, -50%)"
        maxW="500px"
        p={6}
        borderRadius="md"
        border={"1px solid black"}
        bg="brand.modalColor"
        boxShadow="lg"
      >
        <DialogHeader>
          <DialogTitle textStyle={"taskHeading"} color={"brand.text"}>
            Nuevo proyecto
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack spaceY={3} align={["flex-start", "center"]} w={"full"}>
            <Field.Root>
              <FieldLabel htmlFor={"projectName"} color={"brand.text"}>
                Titulo
              </FieldLabel>
              <Input
                id={"projectName"}
                rounded={"none"}
                placeholder="Nombre del proyecto..."
                _placeholder={{ color: "brand.inputPlaceholder" }}
                bg={"brand.inputBg"}
                color={"brand.inputText"}
                borderColor={"brand.inputBorder"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field.Root>
            <Field.Root>
              <FieldLabel htmlFor={"projectDescription"} color={"brand.text"}>
                Descripción
              </FieldLabel>
              <Input
                id={"projectDescription"}
                rounded={"none"}
                placeholder="Descripción del proyecto..."
                _placeholder={{ color: "brand.inputPlaceholder" }}
                bg={"brand.inputBg"}
                color={"brand.inputText"}
                borderColor={"brand.inputBorder"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Field.Root>
            {error && (
              <Text color={"brand.errorText"} textStyle={"errorText"}>
                {error}
              </Text>
            )}
          </VStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              bg={"brand.buttonBg"}
              _hover={{ bg: "brand.hoverBg" }}
              onClick={resetForm}
            >
              Cancelar
            </Button>
          </DialogActionTrigger>
          <Button
            bg={"brand.buttonBg"}
            _hover={{ bg: "brand.hoverBg" }}
            onClick={handleSubmit}
          >
            Guardar
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default NewProjectModal;
