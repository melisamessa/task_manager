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
      navigate("/dashboard");
    } catch (err) {
      setError("Error: Email o contraseña incorrectos");
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
      bg="brand.authBox"
    >
      <VStack spaceY={3} align={["flex-start", "center"]} w={"full"}>
        <VStack spaceX={1} align={["flex-start", "center"]} w={"full"}>
          <Heading textStyle={"title"} color={"brand.text"}>
            Administrador de tareas
          </Heading>
        </VStack>
        <Field.Root>
          <FieldLabel htmlFor={"emailLogin"} color={"brand.text"}>
            E-mail
          </FieldLabel>
          <Input
            id={"emailLogin"}
            rounded={"none"}
            placeholder="ex@example.com"
            _placeholder={{ color: "brand.inputPlaceholder" }}
            bg={"brand.inputBg"}
            color={"brand.inputText"}
            borderColor={"brand.inputBorder"}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field.Root>
        <Field.Root>
          <FieldLabel htmlFor={"passwordLogin"} color={"brand.text"}>
            Contraseña
          </FieldLabel>
          <Input
            id={"passwordLogin"}
            rounded={"none"}
            type="password"
            bg={"brand.inputBg"}
            color={"brand.inputText"}
            borderColor={"brand.inputBorder"}
            onChange={(e) => setPasword(e.target.value)}
          />
        </Field.Root>
        <Button
          w={"full"}
          bg={"brand.buttonBg"}
          color={"black"}
          onClick={handleLogin}
          _hover={{ bg: "brand.hoverBg" }}
        >
          Iniciar sesión
        </Button>
        {error && (
          <Text color={"brand.errorText"} textStyle={"errorText"}>
            {error}
          </Text>
        )}
        <HStack w={"full"} justifyContent={"flex-start"}>
          <Link to="/register">
            <Text color={"brand.text"} textDecoration={"underline"}>
              ¿No tienes cuenta? Registrate
            </Text>
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Login;
