import { Box, HStack, Text } from "@chakra-ui/react";
import BackButton from "./BackButton";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { useComponentsBg } from "../const/colorModeValues";

export default function NavHeader(props: any) {
  const navHeaderBg = useComponentsBg();

  return (
    <HStack
      w={"100%"}
      maxW={"1040px"}
      mx={"auto"}
      justify={"space-between"}
      bg={props.bg || navHeaderBg}
      animation={"fade-in 300ms"}
    >
      {props?.left === null ? (
        <Box w={"40px"} h={"40px"} />
      ) : (
        props?.left || <BackButton backPath={props?.backPath} />
      )}

      <Text fontWeight={600} fontSize={15}>
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
