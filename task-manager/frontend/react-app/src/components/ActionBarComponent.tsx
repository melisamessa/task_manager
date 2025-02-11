import { Box, IconButton } from "@chakra-ui/react";
import { IoIosAddCircle } from "react-icons/io";
import { FaCalendarAlt, FaStar, FaTag } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";
import { RiListView } from "react-icons/ri";
import { MdOutlinePendingActions } from "react-icons/md";

type Props = {
  setView: (view: string) => void;
};

const ActionBarComponent = ({ setView }: Props) => {
  return (
    <Box
      position="fixed"
      left={3}
      top={150}
      height="70vh"
      width="60px"
      bg="brand.searchBar"
      color="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
      rounded={"full"}
    >
      <IconButton
        aria-label="Nueva tarea"
        mb={4}
        variant="ghost"
        colorScheme="teal"
        onClick={() => setView("new_task")}
      >
        <IoIosAddCircle />
      </IconButton>
      <IconButton
        aria-label="Vista por lista"
        mb={4}
        variant="ghost"
        colorScheme="teal"
        onClick={() => setView("list_view")}
      >
        <RiListView />
      </IconButton>
      <IconButton
        aria-label="Vista por categoría"
        mb={4}
        variant="ghost"
        colorScheme="teal"
        onClick={() => setView("status_view")}
      >
        <MdOutlinePendingActions />
      </IconButton>
      <IconButton
        aria-label="Vista calendario"
        mb={4}
        variant="ghost"
        colorScheme="teal"
        onClick={() => setView("calendar_view")}
      >
        <FaCalendarAlt />
      </IconButton>
      <IconButton
        aria-label="Vista por prioridades"
        mb={4}
        variant="ghost"
        colorScheme="teal"
        onClick={() => setView("priority_view")}
      >
        <FaStar />
      </IconButton>
      <IconButton
        aria-label="Vista por categoría"
        mb={4}
        variant="ghost"
        colorScheme="teal"
        onClick={() => setView("category_view")}
      >
        <FaTag />
      </IconButton>
      <IconButton
        aria-label="Estadísticas"
        mb={4}
        variant="ghost"
        colorScheme="teal"
        onClick={() => setView("statics_view")}
      >
        <ImStatsBars />
      </IconButton>
    </Box>
  );
};

export default ActionBarComponent;
