import {
  HStack,
  Icon,
  IconButton,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import cashierNav from "../const/cashierNav";
import { Link, useLocation } from "react-router-dom";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export default function CashierNav(props: any) {
  const location = useLocation();
  const bg = useColorModeValue("#ffffffaa", "#050505aa");

  const NavContainer = (props: any) => {
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

  return (
    <NavContainer {...props}>
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
                  w={"42px"}
                  h={"42px !important"}
                  aria-label={n.name}
                  borderRadius={"full"}
                  className="btn sm-clicky"
                  variant={"ghost"}
                  icon={
                    <Icon
                      as={n.icon}
                      fontSize={18}
                      weight={location.pathname === n.link ? "bold" : "regular"}
                    />
                  }
                  bg={location.pathname === n.link ? "var(--divider)" : ""}
                  color={location.pathname === n.link ? "p.500" : ""}
                />
              </Link>
            </Tooltip>
          );
        })}

        <ColorModeSwitcher borderRadius={"full"} h={"42px !important"} />
      </HStack>
    </NavContainer>
  );
}
