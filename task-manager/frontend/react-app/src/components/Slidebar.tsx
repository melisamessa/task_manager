import { Button, IconButton, Separator, Stack, Text } from "@chakra-ui/react";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { RxHamburgerMenu } from "react-icons/rx";

const Slidebar = () => {
  return (
    <DrawerRoot>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <IconButton
          variant="outline"
          size="md"
          bg={"black"}
          color={"white"}
          rounded={"full"}
          marginLeft={"10px"}
        >
          <RxHamburgerMenu />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Categorias</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Stack>
            <Text>First</Text>
            <Separator />
            <Text>Second</Text>
            <Separator />
            <Text>Third</Text>
          </Stack>
          <DrawerTitle>Estado de la tarea</DrawerTitle>
          <Stack>
            <Text>Pendiente</Text>
            <Separator />
            <Text>En progreso</Text>
            <Separator />
            <Text>Terminada</Text>
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <DrawerActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerActionTrigger>
          <Button>Save</Button>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};

export default Slidebar;
