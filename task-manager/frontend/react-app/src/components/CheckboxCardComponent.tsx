import { Checkbox } from "./ui/checkbox";
import { Box, Text } from "@chakra-ui/react";

interface CheckboxCardProps {
  label: string;
  description?: string;
  value: string;
}

const CheckboxCardComponent = ({
  label,
  description,
  value,
}: CheckboxCardProps) => {
  return (
    <Box
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      p={4}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      gap={1}
      _hover={{ bg: "gray.100" }}
    >
      <Checkbox value={value} defaultChecked={value === "pendiente"}>
        {label}
      </Checkbox>
      {description && (
        <Text fontSize="sm" color="gray.500">
          {description}
        </Text>
      )}
    </Box>
  );
};

export default CheckboxCardComponent;
