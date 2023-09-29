import { useColorModeValue } from "@chakra-ui/react";

const useComponentsBg = () =>
  useColorModeValue(
    { bg: "#ffffff90", backdropFilter: "blur(10px)" },
    { bg: "#000000aa", backdropFilter: "blur(10px)" }
  );

const useBodyBg = () => useColorModeValue("var(--divider)", "b");

export { useComponentsBg, useBodyBg };
