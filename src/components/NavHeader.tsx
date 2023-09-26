import { HStack, useColorModeValue } from "@chakra-ui/react";
import BackButton from "./BackButton";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export default function NavHeader() {
  const navHeaderBg = useColorModeValue("white", "b");

  return (
    <HStack
      w={"100%"}
      position={"sticky"}
      top={0}
      left={0}
      justify={"space-between"}
      py={2}
      px={3}
      bg={navHeaderBg}
    >
      <BackButton />

      <HStack>
        <ColorModeSwitcher borderRadius={"full"} className="divider btn-sm" />
      </HStack>
    </HStack>
  );
}
