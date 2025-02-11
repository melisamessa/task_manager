import { defineTextStyles } from "@chakra-ui/react";

export const textStyles = defineTextStyles({
  body: {
    description: "The body text style - used in paragraphs",
    value: {
      fontFamily: "Inter",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "1",
      letterSpacing: "0",
      textDecoration: "None",
      textTransform: "None",
    },
  },
  title: {
    value: {
      fontFamily: "heading",
      fontSize: "3xl",
      fontWeight: "bold",
      letterSpacing: "0",
      lineHeight: "3",
      textDecoration: "none",
      textTransform: "none",
    },
  },
  taskHeading: {
    value: {
      fontFamily: "heading",
      fontSize: "xl",
      fontStyle: "red",
    },
  },
  otherHeading: {
    value: {
      fontFamily: "monospace",
      fontSize: "lg",
      fontWeight: "bold",
    },
  },
  errorText: {
    value: {
      fontSize: "sm",
      fontWeight: "bold",
    },
  },
});
