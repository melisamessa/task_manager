// theme.ts
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { textStyles } from "../features/styles/TextStyle";

const config = defineConfig({
  globalCss: {
    html: {
      backgroundColor: "#F8F1F1",
    },
  },
  theme: {
    textStyles,
    tokens: {
      colors: {
        brand: {
          taskBox: { value: "#FAE3D9" }, // Fondo de las cajas de tareas
          buttonBg: { value: "#D67D3E" }, // Fondo de los botones
          iconButton: { value: "#fff" },
          hoverBg: { value: "#b7652e" },
          searchBar: { value: "#B5967F" }, // Fondo de las barras (search/action bar)
          text: { value: "#4D3E3E" }, // Color del texto
          errorText: { value: "#D9534F" },

          // Estados de tareas
          statusPending: { value: "#FFC107" },
          statusInProgress: { value: "#FF8C42" },
          statusCompleted: { value: "#4CAF50" },
          statusCanceled: { value: "#D7263D" },

          // Prioridades
          priorityHigh: { value: "#C0392B" },
          priorityMedium: { value: "#E67E22" },
          priorityLow: { value: "#16A085" },

          // Box de login/register
          authBox: { value: "#FAE3D9" },
          inputBg: { value: "#D9A78B" },
          inputBorder: { value: "#B5967F" },
          inputText: { value: "#4D3E3E" },
          inputPlaceholder: { value: "6D5C5C" },
        },
      },
    },
  },
});

const system = createSystem(defaultConfig, config);

export default system;
