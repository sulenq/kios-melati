import { Box, HStack, Text } from "@chakra-ui/react";
import BackButton from "./BackButton";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { useComponentsBg } from "../const/colorModeValues";

export default function NavHeader(props: any) {
  const navHeaderBg = useComponentsBg();

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
      animation={"fade-in 300ms"}
    >
      {props?.left === null ? (
        <Box w={"40px"} h={"40px"} />
      ) : (
        props?.left || (
          <BackButton
          // backPath={props?.backPath}
          />
        )
      )}

      <Text fontWeight={600} color={"p.500"} fontSize={15}>
        {props.title}
      </Text>

      {props?.right === null ? (
        <Box w={"40px"} h={"40px"} />
      ) : (
        props?.right || (
          <ColorModeSwitcher
            className="btn sm-clicky"
            borderRadius={"full"}
            h={"40px !important"}
          />
        )
      )}
    </HStack>
  );
}
