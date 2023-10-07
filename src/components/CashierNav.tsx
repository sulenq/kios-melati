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
  const pathname = location.pathname;
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
            const isActive = n.link.find((link) => {
              const pathnameReduced = pathname
                .split("/")
                .slice(0, -1)
                .join("/");

              if (pathname === link || pathnameReduced + "/:id" === link) {
                return true;
              }
              return false;
            });

            return (
              <Tooltip key={i} label={n.name} placement={"top"} hasArrow>
                <Link to={n.link[0]}>
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
                        weight={isActive ? "fill" : "regular"}
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
            minW={"50px !important"}
            minH={"50px !important"}
            fontSize={24}
          />
        </HStack>
      </NavMobileContainer>
    );

  return (
    <VStack
      w={"240px"}
      h={"100vh"}
      align={"flex-start"}
      justify={"space-between"}
      py={6}
      pl={4}
      pr={6}
      position={"sticky"}
      top={0}
    >
      <Box>
        <Image w={"26px"} src="/logo.svg" ml={3} mb={6} mt={1} />

        {cashierNav.map((n, i) => {
          const isActive = n.link.find((link) => {
            const pathnameReduced = pathname.split("/").slice(0, -1).join("/");

            if (pathname === link || pathnameReduced + "/:id" === link) {
              return true;
            }
            return false;
          });

          return (
            <Link to={n.link[0]} key={i}>
              <HStack
                mb={2}
                gap={1}
                // _hover={{ opacity: 0.5 }}
                role="group"
                transition={"200ms"}
              >
                <IconButton
                  w={"42px"}
                  h={"42px !important"}
                  aria-label={n.name}
                  className="sm-clicky"
                  variant={"unstyled"}
                  _groupHover={{ bg: "var(--divider)" }}
                  borderRadius={"full"}
                  icon={
                    <Icon
                      as={n.icon}
                      mt={"5px"}
                      fontSize={22}
                      weight={isActive ? "fill" : "regular"}
                    />
                  }
                />

                <Text fontWeight={isActive ? 600 : 400}>{n.name}</Text>
              </HStack>
            </Link>
          );
        })}
      </Box>

      <ColorModeSwitcher
        p={4}
        borderRadius={"full"}
        minW={"50px !important"}
        minH={"50px !important"}
      />
    </VStack>
  );
}
