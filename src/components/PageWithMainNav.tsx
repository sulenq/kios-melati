import useScreenWidth from "../utils/useGetScreenWidth";
import { HStack, VStack } from "@chakra-ui/react";
import CashierNav from "./CashierNav";
import NavHeader from "./NavHeader";
import { useComponentsBg } from "../const/colorModeValues";

export default function PageWithMainNav({
  title,
  headerLeft,
  headerRight,
  children,
}: any) {
  const sw = useScreenWidth();
  const navHeaderBg = useComponentsBg();

  if (sw < 770) {
    return (
      <>
        <CashierNav />

        <VStack
          id="mainContent"
          gap={0}
          w={"100%"}
          minH={"100vh"}
          align={"stretch"}
          position={"relative"}
          //   px={4}
        >
          <VStack
            borderBottom={"1px solid var(--divider2)"}
            py={2}
            px={2}
            position={"sticky"}
            top={0}
            left={0}
            zIndex={99}
            {...navHeaderBg}
          >
            <NavHeader title={title} left={headerLeft} right={headerRight} />
          </VStack>

          <VStack
            flex={1}
            align={"stretch"}
            // overflow={"auto"}
            // minH={"calc(100vh - 65px)"}
          >
            {children}
          </VStack>
        </VStack>
      </>
    );
  }

  return (
    <HStack
      w={"100%"}
      maxW={"1280px"}
      minH={"100vh"}
      mx={"auto"}
      gap={0}
      align={"flex-start"}
      position={"relative"}
    >
      <CashierNav />

      <VStack
        id="mainContent"
        gap={0}
        w={"100%"}
        minH={"100vh"}
        align={"stretch"}
        borderLeft={"1px solid var(--divider2)"}
        borderRight={"1px solid var(--divider2)"}
        // px={4}
      >
        <VStack
          borderBottom={"1px solid var(--divider2)"}
          p={2}
          position={"sticky"}
          top={0}
          left={0}
          zIndex={99}
          {...navHeaderBg}
        >
          <NavHeader title={title} left={headerLeft} right={headerRight} />
        </VStack>

        <VStack
          flex={1}
          align={"stretch"}
          // overflow={"auto"}
          // h={"calc(100vh - 65px)"}
        >
          {children}
        </VStack>
      </VStack>
    </HStack>
  );
}
