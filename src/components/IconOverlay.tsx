import { Box, Icon } from "@chakra-ui/react";

export default function IconOverlay({ icon }: any) {
  return (
    <Box position={"absolute"} right={0} bottom={0} zIndex={-1}>
      <Icon
        as={icon}
        fontSize={400}
        color={"var(--divider)"}
        position={"absolute"}
        right={-14}
        bottom={-14}
      />
    </Box>
  );
}
