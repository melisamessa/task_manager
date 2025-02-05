import { Input, IconButton, HStack } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

const Navbar = () => {
  return (
    <HStack>
      <Input
        placeholder="Buscar tarea"
        borderRadius={"18px"}
        w={"400px"}
        shadow={"md"}
        bg={"white"}
      ></Input>
      <IconButton
        aria-label="Search database"
        colorPalette={"black"}
        color={"white"}
        rounded={"full"}
      >
        <LuSearch />
      </IconButton>
    </HStack>
  );
};

export default Navbar;
