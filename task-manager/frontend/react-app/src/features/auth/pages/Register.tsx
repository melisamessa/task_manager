import {
  Box,
  Button,
  Field,
  FieldLabel,
  Heading,
  HStack,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/AuthService";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    try {
      const userData = { name, email, password };
      await registerUser(userData);
      alert("Usuario registrado con exito");
    } catch (err) {
      setError("Error al registrar el usuario");
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
            Nombre <Field.RequiredIndicator />
          </FieldLabel>
          <Input
            rounded={"none"}
            placeholder="Nombre completo"
            _placeholder={{ color: "gray.300" }}
            bg={"gray.700"}
            color={"white"}
            onChange={(e) => setName(e.target.value)}
          />
          <Field.ErrorText color={"white"}>
            Este campo es requerido
          </Field.ErrorText>
        </Field.Root>
        <Field.Root>
          <FieldLabel color={"white"}>
            E-mail <Field.RequiredIndicator />
          </FieldLabel>
          <Input
            rounded={"none"}
            placeholder="Correo electronico"
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
            placeholder={"Ingrese su contraseña"}
            _placeholder={{ color: "gray.300" }}
            type="password"
            bg={"gray.700"}
            color={"white"}
            onChange={(e) => setPasword(e.target.value)}
          />
          <Field.ErrorText color={"white"}>
            Este campo es requerido
          </Field.ErrorText>
        </Field.Root>
        <Button
          w={"full"}
          bg={"white"}
          color={"black"}
          onClick={handleRegister}
        >
          Registrarte
        </Button>
        <HStack w={"full"} justifyContent={"flex-start"}>
          <Link to="/">
            <Text color={"white"} textDecoration={"underline"}>
              ¿Tienes una cuenta? Inicia sesión
            </Text>
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}

export default Register;
