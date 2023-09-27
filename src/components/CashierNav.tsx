import { HStack, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import cashierNav from "../const/cashierNav";
import { Link, useLocation } from "react-router-dom";

export default function CashierNav(props: any) {
  const location = useLocation();

  const NavContainer = (props: any) => {
    return (
      <HStack
        w={"100%"}
        justify={"center"}
        p={4}
        position={"fixed"}
        left={0}
        bottom={2}
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
        borderRadius={12}
        p={1}
        gap={1}
      >
        {cashierNav.map((n, i) => {
          return (
            <Tooltip key={i} label={n.name} placement={"top"} hasArrow>
              <Link to={n.link}>
                <IconButton
                  aria-label={n.name}
                  className="btn sm-clicky"
                  variant={"ghost"}
                  icon={<Icon as={n.icon} fontSize={18} />}
                  bg={location.pathname === n.link ? "var(--divider)" : ""}
                />
              </Link>
            </Tooltip>
          );
        })}
      </HStack>
    </NavContainer>
  );
}
