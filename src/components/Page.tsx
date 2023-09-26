import { VStack } from "@chakra-ui/react";

export default function Page(props: any) {
  return (
    <VStack
      {...props}
      id="page"
      align={"flex-start"}
      w={"100%"}
      maxW={"1280px"}
      mx={"auto"}
      px={[5, 6, 8]}
    >
      {props.children}
    </VStack>
  );
}
