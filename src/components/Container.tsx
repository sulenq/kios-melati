import { VStack } from "@chakra-ui/react";

export default function Container(props: any) {
  return (
    <VStack
      {...props}
      gap={0}
      className="page"
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
