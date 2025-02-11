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
      setError(null);
    } catch (err: any) {
      setError(err.message);
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
          <FieldLabel htmlFor={"nameRegister"} color={"brand.text"}>
            Nombre
          </FieldLabel>
          <Input
            id={"nameRegister"}
            rounded={"none"}
            placeholder="Nombre completo"
            _placeholder={{ color: "brand.inputPlaceholder" }}
            bg={"brand.inputBg"}
            color={"brand.inputText"}
            borderColor={"brand.inputBorder"}
            onChange={(e) => setName(e.target.value)}
          />
        </Field.Root>
        <Field.Root>
          <FieldLabel htmlFor={"emailRegister"} color={"brand.text"}>
            E-mail
          </FieldLabel>
          <Input
            id={"emailRegister"}
            rounded={"none"}
            placeholder="Correo electronico"
            _placeholder={{ color: "brand.inputPlaceholder" }}
            bg={"brand.inputBg"}
            color={"brand.inputText"}
            borderColor={"brand.inputBorder"}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field.Root>
        <Field.Root>
          <FieldLabel htmlFor={"passwordRegister"} color={"brand.text"}>
            Contraseña <Field.RequiredIndicator />
          </FieldLabel>
          <Input
            id={"passwordRegister"}
            rounded={"none"}
            placeholder={"Ingrese su contraseña"}
            _placeholder={{ color: "brand.inputPlaceholder" }}
            bg={"brand.inputBg"}
            color={"brand.inputText"}
            borderColor={"brand.inputBorder"}
            type="password"
            onChange={(e) => setPasword(e.target.value)}
          />
        </Field.Root>
        <Button
          w={"full"}
          bg={"brand.buttonBg"}
          color={"black"}
          onClick={handleRegister}
          _hover={{ bg: "brand.hoverBg" }}
        >
          Registrarte
        </Button>
        {error && (
          <Text color={"brand.errorText"} textStyle={"errorText"}>
            {error}
          </Text>
        )}
        <HStack w={"full"} justifyContent={"flex-start"}>
          <Link to="/">
            <Text color={"brand.text"} textDecoration={"underline"}>
              ¿Tienes una cuenta? Inicia sesión
            </Text>
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}

export default Register;
