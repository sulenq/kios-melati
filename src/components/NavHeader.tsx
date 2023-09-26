import { HStack, Text, useColorModeValue } from "@chakra-ui/react";
import BackButton from "./BackButton";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export default function NavHeader({ title }: { title: string }) {
  const navHeaderBg = useColorModeValue("white", "b");

  return (
    <HStack
      w={"100%"}
      maxW={"1280px"}
      mx={"auto"}
      position={"sticky"}
      top={0}
      left={0}
      justify={"space-between"}
      py={2}
      bg={navHeaderBg}
    >
      <BackButton />

      <Text fontWeight={600} opacity={0.5}>
        {title}
      </Text>

      <HStack>
        <ColorModeSwitcher className="btn sm-clicky" />
      </HStack>
    </HStack>
  );
}
