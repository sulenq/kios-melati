import { VStack } from "@chakra-ui/react";

export default function Page({ children }: any) {
  return (
    <VStack
      id="page"
      align={"flex-start"}
      maxW={"1280px"}
      w={"100%"}
      mx={"auto"}
      px={[4, 6, 8]}
    >
      {children}
    </VStack>
  );
}
