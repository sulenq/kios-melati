import {
  Box,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  Tooltip,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import cashierNav from "../const/cashierNav";
import { Link, useLocation } from "react-router-dom";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import useScreenWidth from "../utils/useGetScreenWidth";

export default function CashierNav(props: any) {
  const sw = useScreenWidth();
  const location = useLocation();
  const bg = useColorModeValue("#ffffffaa", "#050505aa");

  const NavMobileContainer = (props: any) => {
    return (
      <HStack
        w={"100%"}
        justify={"center"}
        p={"10px"}
        position={"fixed"}
        left={0}
        bottom={0}
        zIndex={99}
      >
        {props.children}
      </HStack>
    );
  };

  if (sw < 770)
    return (
      <NavMobileContainer {...props}>
        <HStack
          bg={bg}
          backdropFilter={"blur(5px)"}
          borderRadius={"full"}
          p={"5px"}
          gap={1}
          zIndex={99}
        >
          {cashierNav.map((n, i) => {
            return (
              <Tooltip key={i} label={n.name} placement={"top"} hasArrow>
                <Link to={n.link}>
                  <IconButton
                    w={"50px"}
                    h={"50px !important"}
                    aria-label={n.name}
                    borderRadius={"full"}
                    className="btn sm-clicky"
                    variant={"ghost"}
                    icon={
                      <Icon
                        as={n.icon}
                        fontSize={24}
                        weight={
                          location.pathname === n.link ? "fill" : "regular"
                        }
                      />
                    }
                    // bg={location.pathname === n.link ? "var(--divider)" : ""}
                    // color={location.pathname === n.link ? "p.500" : ""}
                  />
                </Link>
              </Tooltip>
            );
          })}

          <ColorModeSwitcher
            borderRadius={"full"}
            h={"42px !important"}
            fontSize={24}
          />
        </HStack>
      </NavMobileContainer>
    );

  return (
    <VStack
      w={"240px"}
      minH={"100vh"}
      align={"flex-start"}
      justify={"space-between"}
      py={6}
      pl={4}
      pr={6}
      position={"sticky"}
      top={0}
    >
      <Box>
        <Image w={"24px"} src="/logo.svg" ml={3} mb={6} mt={1} />

        {cashierNav.map((n, i) => {
          return (
            <Link to={n.link}>
              <HStack
                mb={2}
                gap={1}
                _hover={{ opacity: 0.5 }}
                transition={"200ms"}
              >
                <IconButton
                  w={"42px"}
                  h={"42px !important"}
                  aria-label={n.name}
                  className="sm-clicky"
                  variant={"unstyled"}
                  icon={
                    <Icon
                      as={n.icon}
                      mt={"5px"}
                      fontSize={22}
                      weight={location.pathname === n.link ? "fill" : "regular"}
                    />
                  }
                  // color={location.pathname === n.link ? "p.500" : ""}
                />

                <Text fontWeight={location.pathname === n.link ? 600 : 400}>
                  {n.name}
                </Text>
              </HStack>
            </Link>
          );
        })}
      </Box>

      <ColorModeSwitcher borderRadius={"full"} h={"42px !important"} />
    </VStack>
  );
}
