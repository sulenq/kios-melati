import {
  HStack,
  Icon,
  IconButton,
  Stack,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useScreenWidth } from "../utils";
import adminNav from "../const/adminNav";
import { Link } from "react-router-dom";

export default function AdminNav() {
  const sw = useScreenWidth();

  const NavContainer = ({ children }: any) => {
    if (sw < 770)
      return (
        <HStack
          w={"100%"}
          justify={"center"}
          p={4}
          position={"fixed"}
          left={0}
          bottom={2}
        >
          {children}
        </HStack>
      );

    return (
      <VStack h={"100vh"} justify={"center"} p={4}>
        {children}
      </VStack>
    );
  };

  return (
    <NavContainer>
      <Stack
        flexDir={sw < 770 ? "row" : "column"}
        bg={"var(--divider)"}
        borderRadius={12}
        p={1}
        gap={1}
      >
        {adminNav.map(
          (n, i) =>
            i < 5 && (
              <Tooltip
                key={i}
                label={n.name}
                placement={sw < 770 ? "top" : "right"}
                hasArrow
              >
                <IconButton
                  as={Link}
                  aria-label={n.name}
                  className="btn sm-clicky"
                  variant={"ghost"}
                  icon={<Icon as={n.icon} fontSize={18} />}
                />
              </Tooltip>
            )
        )}
      </Stack>
    </NavContainer>
  );
}
