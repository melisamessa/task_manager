import { Button, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import ProjectCard from "../components/ProjectCard";
import { useEffect, useState } from "react";
import NewProjectModal from "../components/NewProjectModal";

const ProjectPage = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProjects = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No hay token disponible");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/projects/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setProjects(data);
      setLoading(false);
    } catch (error) {
      console.log("Error: " + error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Flex direction="column" align="center" p={6} w={"100%"}>
      <Flex
        align="center"
        justify="center"
        position="relative"
        w="100%"
        maxW={"900px"}
        mb={6}
      >
        <Heading textStyle={"title"} color={"brand.text"}>
          Proyectos
        </Heading>
        <Flex position="absolute" right="0">
          <NewProjectModal fetchProjects={fetchProjects}></NewProjectModal>
        </Flex>
      </Flex>
      {loading ? (
        <Spinner size="xl" />
      ) : projects.length === 0 ? (
        <Text fontSize="lg" color="gray.500">
          No tienes proyectos aún.
        </Text>
      ) : (
        <Flex wrap="wrap" gap={6} justify="center">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              fetchProjects={fetchProjects}
            />
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default ProjectPage;
