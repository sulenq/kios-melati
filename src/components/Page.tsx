import { VStack } from "@chakra-ui/react";

export default function Page(props: any) {
  return (
    <VStack gap={0} h={props.h || "100vh"}>
      {props.children}
    </VStack>
  );
}
