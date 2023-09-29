import { HStack, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import cashierNav from "../const/cashierNav";
import { Link, useLocation } from "react-router-dom";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export default function CashierNav(props: any) {
  const location = useLocation();

  const NavContainer = (props: any) => {
    return (
      <HStack
        w={"100%"}
        justify={"center"}
        p={"10px"}
        position={"fixed"}
        left={0}
        bottom={0}
      >
        {props.children}
      </HStack>
    );
  };

  return (
    <NavContainer {...props}>
      <HStack
        bg={"var(--divider)"}
        backdropFilter={"blur(10px)"}
        borderRadius={"full"}
        p={"5px"}
        gap={1}
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
                  icon={<Icon as={n.icon} fontSize={18} />}
                  bg={location.pathname === n.link ? "var(--divider)" : ""}
                />
              </Link>
            </Tooltip>
          );
        })}

        <ColorModeSwitcher borderRadius={"full"} />
      </HStack>
    </NavContainer>
  );
}
