import {
  Button,
  DialogActionTrigger,
  DialogBackdrop,
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
  Flex,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProject } from "../services/ProjectService";

type Props = {
  project: any;
  fetchProjects: () => void;
};

const EditProjectModal = ({ project, fetchProjects }: Props) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project?.description || null);
  const [error, setError] = useState<String | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(project?.title || "");
    setDescription(project?.description || "");
  }, [project]);

  const handleSubmit = async () => {
    const projectData = {
      title,
      description,
    };
    try {
      await updateProject(projectData, project.id);
      fetchProjects();
      setError(null);
      navigate("/projects");
      setOpen(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Flex>
      <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogBackdrop bg="rgba(0, 0, 0, 0.5)" />
        <DialogTrigger asChild>
          <Button
            position="relative"
            right="0"
            bg={"brand.buttonBg"}
            _hover={{ bg: "brand.hoverBg" }}
          >
            Editar
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
          bg="brand.modalColor"
          border={"1px solid black"}
          boxShadow="lg"
        >
          <DialogHeader>
            <DialogTitle textStyle={"taskHeading"} color={"brand.text"}>
              Editar proyecto
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
            {error && (
              <Text color={"brand.errorText"} textStyle={"errorText"}>
                {error}
              </Text>
            )}
            <DialogActionTrigger asChild>
              <Button bg={"brand.buttonBg"} _hover={{ bg: "brand.hoverBg" }}>
                Cancelar
              </Button>
            </DialogActionTrigger>
            <Button
              bg={"brand.buttonBg"}
              _hover={{ bg: "brand.hoverBg" }}
              onClick={handleSubmit}
            >
              Guardar cambios
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Flex>
  );
};

export default EditProjectModal;
