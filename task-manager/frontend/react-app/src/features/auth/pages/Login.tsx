import {
  Box,
  Heading,
  VStack,
  Field,
  Input,
  FieldLabel,
  HStack,
  Button,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/AuthService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userData = { email, password };
      const response = await loginUser(userData);
      console.log(response);
      alert("Login exitoso");
      navigate("/tasks");
    } catch (err) {
      setError("Error al iniciar sesión");
    }
  };

  return (
    <Box
      w={["full", "md"]}
      p={[8, 10]}
      mt={[50, "10vh"]}
      mx="auto"
      border="1px"
      borderColor={"gray.300"}
      borderStyle={"solid"}
      borderRadius={"5px"}
      bg="linear-gradient(to right, #2c3e50, #34495e)"
    >
      <VStack spaceY={3} align={["flex-start", "center"]} w={"full"}>
        <VStack spaceX={1} align={["flex-start", "center"]} w={"full"}>
          <Heading color={"white"}>Administrador de tareas</Heading>
        </VStack>
        <Field.Root>
          <FieldLabel color={"white"}>
            E-mail <Field.RequiredIndicator />
          </FieldLabel>
          <Input
            rounded={"none"}
            placeholder="ex@example.com"
            _placeholder={{ color: "gray.300" }}
            bg={"gray.700"}
            color={"white"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Field.ErrorText color={"white"}>
            Este campo es requerido
          </Field.ErrorText>
        </Field.Root>
        <Field.Root>
          <FieldLabel color={"white"}>
            Contraseña <Field.RequiredIndicator />
          </FieldLabel>
          <Input
            rounded={"none"}
            type="password"
            bg={"gray.700"}
            color={"white"}
            onChange={(e) => setPasword(e.target.value)}
          />
          <Field.ErrorText color={"white"}>
            Este campo es requerido
          </Field.ErrorText>
        </Field.Root>
        <Button w={"full"} bg={"white"} color={"black"} onClick={handleLogin}>
          Iniciar sesión
        </Button>
        <HStack w={"full"} justifyContent={"flex-start"}>
          <Link to="/register">
            <Text color={"white"} textDecoration={"underline"}>
              ¿No tienes cuenta? Registrate
            </Text>
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Login;
