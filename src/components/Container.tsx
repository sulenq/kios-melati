import { VStack } from "@chakra-ui/react";
import React from "react";

export default function Container({ children }: any) {
  return (
    <VStack id="container" maxW={"1280px"} w={"100%"} mx={"auto"}>
      {children}
    </VStack>
  );
}
