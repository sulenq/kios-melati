import { useState, useEffect } from "react";
import {
  Box,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { getCookie } from "typescript-cookie";
import Container from "../components/Container";
import { Order } from "../globalState/useOrder";
import NavHeader from "../components/NavHeader";
import CashierNav from "../components/CashierNav";
import { MagnifyingGlass } from "@phosphor-icons/react";
import TransactionItem from "../components/TransactionItem";
import Page from "../components/Page";
import useScreenWidth from "../utils/useGetScreenWidth";

export type Transaction = { id: number } & Order;

export default function CashierTransaction() {
  const [cashierTransaction, setCashierTransaction] = useState<
    Transaction[] | []
  >([]);
  useEffect(() => {
    const ctc = getCookie("cashierTransaction");
    if (ctc) {
      setCashierTransaction(JSON.parse(ctc));
    }
  }, []);

  const sw = useScreenWidth();

  return (
    <Page>
      <CashierNav />

      <VStack w={"100%"} borderBottom={"1px solid var(--divider)"} p={2}>
        <NavHeader title={"Cashier Transaction"} left={null} right={null} />
      </VStack>

      {/* Search Component */}
      <Container>
        <HStack justify={"center"} py={3}>
          <InputGroup maxW={"473px"} position={"relative"}>
            <InputLeftElement pointerEvents="none">
              <Icon as={MagnifyingGlass} fontSize={18} mb={[1, null, 0]} />
            </InputLeftElement>

            <Input
              //   ref={inputRef}
              name={"indexProduct"}
              placeholder="Transaction search"
              bg={"var(--divider)"}
              border={"2px solid transparent !important"}
              pl={"40px !important"}
              pr={"36px !important"}
              //   value={productSearch}
              //   onChange={(e) => {
              //     setProductSearch(e.target.value);
              //   }}
            />

            {/* {productSearch && (
              <IconButton
                position={"absolute"}
                right={0}
                top={0}
                onClick={() => {
                  inputRef.current?.focus();
                  resetProductSearch();
                }}
                _hover={{ bg: "transparent !important" }}
                _active={{ bg: "transparent !Important" }}
                zIndex={2}
                variant={"ghost"}
                className="sm-clicky"
                aria-label="clearSearchButton"
                icon={<Icon as={X} fontSize={16} />}
              />
            )} */}
          </InputGroup>
        </HStack>
      </Container>

      {sw >= 770 && (
        <Container mt={4}>
          <HStack gap={8} opacity={0.5}>
            <Text w={"5%"} fontWeight={500} fontSize={"12px !important"}>
              ID
            </Text>

            <Text
              w={"20%"}
              fontWeight={500}
              textAlign={"right"}
              fontSize={"12px !important"}
            >
              TOTAL PAYMENT
            </Text>

            <Text w={"20%"} fontWeight={500} fontSize={"12px !important"}>
              PAYMENT METHOD
            </Text>

            <Text
              w={"20%"}
              fontWeight={500}
              textAlign={"right"}
              fontSize={"12px !important"}
            >
              PAY
            </Text>

            <Text
              w={"10%"}
              fontWeight={500}
              textAlign={"right"}
              fontSize={"12px !important"}
            >
              CHANGE
            </Text>

            <VStack w={"25%"} align={"flex-end"}>
              <Text fontWeight={500} fontSize={"12px !important"}>
                ORDER LIST
              </Text>
            </VStack>
          </HStack>
        </Container>
      )}

      {cashierTransaction?.map((t, i) => (
        <Container key={i} px={[2, 4, 6]}>
          <Box
            cursor="pointer"
            _hover={{ bg: "var(--divider)" }}
            borderRadius={6}
            p={2}
          >
            <TransactionItem key={i} t={t} />
          </Box>
        </Container>
      ))}
    </Page>
  );
}
