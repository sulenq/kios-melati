import { HStack, Text, useColorModeValue } from "@chakra-ui/react";
import BackButton from "./BackButton";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export default function NavHeader(props: any) {
  const navHeaderBg = useColorModeValue("white", "b");

  return (
    <HStack
      w={"100%"}
      maxW={"1240px"}
      mx={"auto"}
      position={"sticky"}
      top={0}
      left={0}
      justify={"space-between"}
      bg={props.bg || navHeaderBg}
    >
      <BackButton />

      <Text
        fontWeight={600}
        color={"p.500"}
        fontSize={15}
      >
        {props.title}
      </Text>

      {props?.right || (
        <HStack>
          <ColorModeSwitcher className="btn sm-clicky" />
        </HStack>
      )}
    </HStack>
  );
}
