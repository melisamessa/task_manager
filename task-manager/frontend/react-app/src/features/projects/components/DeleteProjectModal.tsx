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
  Flex,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { deleteProject } from "../services/ProjectService";
import { useNavigate } from "react-router-dom";

type Props = {
  project: any;
  fetchProjects: () => void;
};

const DeleteProjectModal = ({ project, fetchProjects }: Props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<String | null>(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteProject(project.id);
      fetchProjects();
      setError(null);
      navigate("/projects");
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
            Eliminar
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
              Eliminar proyecto
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text>
              Estas seguro que quieres eliminar el proyecto: '{project.title}'.
              Está acción no podrá deshacerse.
            </Text>
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
              onClick={handleDelete}
            >
              Eliminar proyecto
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Flex>
  );
};

export default DeleteProjectModal;
