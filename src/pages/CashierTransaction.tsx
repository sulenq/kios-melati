import { useState, useEffect } from "react";
import {
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
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

      {cashierTransaction.length === 0 && (
        <VStack
          opacity={0.2}
          justify={"center"}
          p={4}
          pb={"80px"}
          w={"100%"}
          maxW={"600px"}
          minH={"400px"}
          overflow={"auto"}
          //   h={sw < 770 ? "calc(100% - 170px)" : "calc(100% - 136px)"}
          flex={1}
          position={"relative"}
          animation={"fade-in-fade 1s"}
        >
          <Image
            bottom={"0"}
            position={"absolute"}
            w={"100%"}
            src={"../img/transaction.png"}
          />
        </VStack>
      )}

      <Container px={[0, null, 8]}>
        <Table variant={"unstyled"}>
          <Thead opacity={0.5}>
            <Tr>
              {sw < 770 ? (
                <>
                  <Th px={[4, null, 2]} py={2}>
                    ID/Total
                  </Th>
                  <Th px={[4, null, 2]} py={2}>
                    Payment
                  </Th>
                  <Th textAlign={"right"} px={[4, null, 2]} py={2}>
                    Change
                  </Th>
                  <Th textAlign={"right"} px={[4, null, 2]} py={2}>
                    Order
                  </Th>
                </>
              ) : (
                <>
                  <Th px={[4, null, 2]} py={2}>
                    ID
                  </Th>
                  <Th textAlign={"right"} px={[4, null, 2]} py={2}>
                    Total Payment
                  </Th>
                  <Th textAlign={"right"} px={[4, null, 2]} py={2}>
                    Payment Method
                  </Th>
                  <Th textAlign={"right"} px={[4, null, 2]} py={2}>
                    Pay Amount
                  </Th>
                  <Th textAlign={"right"} px={[4, null, 2]} py={2}>
                    Change
                  </Th>
                  <Th textAlign={"right"} px={[4, null, 2]} py={2}>
                    Order
                  </Th>
                </>
              )}
            </Tr>
          </Thead>

          <Tbody>
            {cashierTransaction
              .slice()
              .reverse()
              ?.map((t, i) => (
                <Tr key={i} cursor="pointer" _hover={{ bg: "var(--divider)" }}>
                  <TransactionItem key={i} t={t} />
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Container>
    </Page>
  );
}
