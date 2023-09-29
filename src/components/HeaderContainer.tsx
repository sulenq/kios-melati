import { HStack } from "@chakra-ui/react";

export default function HeaderContainer(props: any) {
  return (
    <HStack
      w={"100%"}
      maxW={"1240px"}
      mx={"auto"}
      position={"sticky"}
      top={0}
      left={0}
      justify={"space-between"}
    >
      {props?.children}
    </HStack>
  );
}
