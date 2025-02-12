import { Button, Card, HStack } from "@chakra-ui/react";
import { Checkbox } from "../../../components/ui/checkbox";
import { useState } from "react";
import DeleteProjectModal from "./DeleteProjectModal";
import EditProjectModal from "./EditProjectModal";

type Props = {
  project: any;
  fetchProjects: () => void;
};

const ProjectCard = ({ project, fetchProjects }: Props) => {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <Card.Root bg={"brand.taskBox"} width="400px">
      <Card.Header />
      <Checkbox pl={"15px"} colorPalette={"green"}>
        Completado
      </Checkbox>
      <Card.Title textStyle={"taskHeading"} color={"brand.text"} p={4}>
        {project.title}
      </Card.Title>
      <Card.Body gap={1} textStyle={"body"} pt={"3px"}>
        {project.description}
      </Card.Body>
      <Card.Footer justifyContent={"flex-end"} alignItems="center">
        <HStack scaleX={3}>
          <DeleteProjectModal project={project} fetchProjects={fetchProjects} />
          <EditProjectModal project={project} fetchProjects={fetchProjects} />
          <Button bg={"brand.buttonBg"} _hover={{ bg: "brand.hoverBg" }}>
            Ver más
          </Button>
        </HStack>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProjectCard;
