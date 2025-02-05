import { Global } from "@emotion/react";

const GlobalStyle = () => (
  <Global
    styles={{
      body: {
        backgroundColor: "#2c3e50", // Fondo oscuro para toda la página
        color: "white", // Texto claro para la página
        fontFamily: "'Inter', sans-serif", // Puedes usar el font que prefieras
        margin: 0, // Eliminar márgenes por defecto
        padding: 0, // Eliminar padding por defecto
      },
      "*": {
        boxSizing: "border-box", // Asegura que el box-sizing sea consistente
      },
    }}
  />
);

export default GlobalStyle;
