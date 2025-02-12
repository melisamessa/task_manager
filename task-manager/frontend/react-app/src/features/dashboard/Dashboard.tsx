import { Box, Button, Heading, VStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <VStack spaceY={6} align="stretch" p={6}>
      <Heading>📊 Dashboard</Heading>

      {/* Sección de Proyectos */}
      <Box p={4} borderWidth="1px" borderRadius="lg">
        <Heading size="md">📁 Proyectos</Heading>
        <Text>2 proyectos activos</Text>
        <Button mt={2} colorScheme="blue" onClick={() => navigate("/projects")}>
          Ver proyectos
        </Button>
      </Box>

      {/* Sección de Tareas */}
      <Box p={4} borderWidth="1px" borderRadius="lg">
        <Heading size="md">📌 Tareas</Heading>
        <Text>5 tareas pendientes</Text>
        <Button mt={2} colorScheme="green" onClick={() => navigate("/tasks")}>
          Ver tareas
        </Button>
      </Box>

      {/* Estadísticas básicas */}
      <Box p={4} borderWidth="1px" borderRadius="lg">
        <Heading size="md">📈 Estadísticas</Heading>
        <Text>🔹 8 tareas completadas</Text>
        <Text>🔹 5 tareas pendientes</Text>
      </Box>
    </VStack>
  );
};

export default DashboardPage;
