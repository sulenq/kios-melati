import { VStack } from "@chakra-ui/react";

export default function Page(props: any) {
  return (
    <VStack
      {...props}
      gap={0}
      id="page"
      align={"stretch"}
      w={"100%"}
      maxW={"1280px"}
      mx={"auto"}
      px={[5, 6, 8]}
    >
      {props.children}
    </VStack>
  );
}
