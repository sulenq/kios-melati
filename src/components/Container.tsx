import { VStack } from "@chakra-ui/react";

export default function Container(props: any) {
  return (
    <VStack
      {...props}
      gap={0}
      className="container"
      align={"stretch"}
      w={"100%"}
      maxW={"1280px"}
      mx={"auto"}
      px={props.px || [4, 6, 8]}
    >
      {props.children}
    </VStack>
  );
}
