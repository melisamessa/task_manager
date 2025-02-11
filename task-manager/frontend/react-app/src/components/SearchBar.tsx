import { Input, IconButton, HStack } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

const SearchBar = () => {
  return (
    <HStack>
      <Input
        placeholder="Buscar tarea"
        _placeholder={{ color: "brand.inputPlaceholder" }}
        borderRadius={"18px"}
        borderColor={"brand.inputBorder"}
        w={"400px"}
        shadow={"md"}
        bg={"brand.searchBar"}
      ></Input>
      <IconButton
        aria-label="Search database"
        color={"iconButton"}
        rounded={"full"}
        bg={"brand.buttonBg"}
        _hover={{ bg: "brand.hoverBg" }}
      >
        <LuSearch />
      </IconButton>
    </HStack>
  );
};

export default SearchBar;
