import { useState, useEffect, useRef } from "react";
import {
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import Container from "../components/Container";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import TransactionItem from "../components/TransactionItem";
import useScreenWidth from "../utils/useGetScreenWidth";
import useTransactionSearch from "../globalState/useTransactionSearch";
import { Transaction } from "./Checkout";
import PageWithMainNav from "../components/PageWithMainNav";
import useFormatNumber from "../utils/useFormatNumber";
import { useComponentsBg } from "../const/colorModeValues";

export default function CashierTransaction() {
  const [cashierTransaction, setCashierTransaction] = useState<
    Transaction[] | []
  >([]);
  const [filteredTransaction, setFilteredTransaction] = useState<
    Transaction[] | []
  >([]);
  const [totalSales, setTotalSales] = useState<number>(0);
  const fn = useFormatNumber;
  const sw = useScreenWidth();
  const cfg = useComponentsBg();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { transactionSearch, setTransactionSearch } = useTransactionSearch();

  useEffect(() => {
    const ctc = localStorage.getItem("transaction");
    if (ctc) {
      setCashierTransaction(JSON.parse(ctc));
    }
  }, []);

  useEffect(() => {
    let ts: number = 0;
    cashierTransaction.forEach((t) => {
      ts += t.totalPayment;
    });

    setTotalSales(ts);
  }, [cashierTransaction]);

  useEffect(() => {
    const filteredTransaction = cashierTransaction.filter((transaction) =>
      transaction.id.includes(transactionSearch)
    );
    setFilteredTransaction(filteredTransaction);
  }, [transactionSearch, cashierTransaction]);

  return (
    <PageWithMainNav title="Cashier Transaction" headerRight={null}>
      {/* Search Component */}
      <Container position={"sticky"} top={"56.8px"} zIndex={3} {...cfg}>
        <SimpleGrid gap={2} columns={sw < 1000 ? 1 : 2} mt={"19px"} mb={2}>
          <HStack gap={6}>
            <HStack>
              <Text fontSize={15} opacity={0.5}>
                Transactions :
              </Text>
              <Text fontSize={19} fontWeight={600}>
                {cashierTransaction.length}
              </Text>
            </HStack>

            <HStack>
              <Text fontSize={15} opacity={0.5}>
                Total Sales :
              </Text>
              <HStack gap={1}>
                <Text opacity={0.5}>Rp</Text>
                <Text fontSize={19} fontWeight={600}>
                  {fn(totalSales) || 0}
                </Text>
              </HStack>
            </HStack>
          </HStack>

          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={MagnifyingGlass} fontSize={18} mb={[1, null, 0]} />
            </InputLeftElement>

            <Input
              ref={inputRef}
              name={"indexProduct"}
              placeholder="Transaction search by ID"
              bg={"var(--divider)"}
              variant={"filled"}
              border={"2px solid transparent !important"}
              pl={"40px !important"}
              pr={"36px !important"}
              value={transactionSearch}
              onChange={(e) => {
                setTransactionSearch(e.target.value);
              }}
            />

            {transactionSearch && (
              <IconButton
                position={"absolute"}
                right={0}
                top={0}
                onClick={() => {
                  inputRef.current?.focus();
                  setTransactionSearch("");
                }}
                _hover={{ bg: "transparent !important" }}
                _active={{ bg: "transparent !Important" }}
                zIndex={2}
                variant={"ghost"}
                className="sm-clicky"
                aria-label="clearSearchButton"
                icon={<Icon as={X} fontSize={16} />}
              />
            )}
          </InputGroup>
        </SimpleGrid>
      </Container>

      {transactionSearch === "" && cashierTransaction.length <= 0 && (
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
        >
          <Image
            bottom={4}
            position={"absolute"}
            w={"100%"}
            src={"/img/transaction.png"}
          />
        </VStack>
      )}

      {transactionSearch !== "" && filteredTransaction.length <= 0 && (
        <VStack flex={1} justify={"space-between"} p={4} transition={"300ms"}>
          <Text fontWeight={500} fontSize={[15, null, 17]} mb={4}>
            No Result
          </Text>

          <Image
            opacity={0.2}
            w={"100%"}
            maxW={"600px"}
            src={"/img/transaction.png"}
          />
        </VStack>
      )}

      {cashierTransaction.length > 0 && filteredTransaction.length > 0 && (
        <Container px={"0"} overflow={"auto"}>
          <Table variant={"unstyled"}>
            <Thead opacity={0.5}>
              <Tr>
                {sw < 770 ? (
                  <>
                    <Th pl={4} pr={2} py={2}>
                      ID/Total
                    </Th>
                    <Th px={2} py={2}>
                      Payment
                    </Th>
                    <Th textAlign={"right"} px={2} py={2}>
                      Change
                    </Th>
                    <Th textAlign={"right"} pl={2} pr={4} py={2}>
                      Detail
                    </Th>
                  </>
                ) : (
                  <>
                    <Th pl={6} pr={2} py={2}>
                      ID
                    </Th>
                    <Th textAlign={"right"} px={2} py={2}>
                      Total Payment
                    </Th>
                    <Th textAlign={"right"} px={2} py={2}>
                      Payment Method
                    </Th>
                    <Th textAlign={"right"} px={2} py={2}>
                      Pay Amount
                    </Th>
                    <Th textAlign={"right"} px={2} py={2}>
                      Change
                    </Th>
                    <Th textAlign={"right"} pr={6} pl={2} py={2}>
                      Detail
                    </Th>
                  </>
                )}
              </Tr>
            </Thead>

            <Tbody>
              {transactionSearch !== "" &&
                filteredTransaction.length > 0 &&
                filteredTransaction
                  .slice()
                  .reverse()
                  ?.map((t, i) => (
                    <Tr
                      key={i}
                      cursor="pointer"
                      _hover={{ bg: "var(--divider)" }}
                    >
                      <TransactionItem key={i} t={t} />
                    </Tr>
                  ))}

              {transactionSearch === "" &&
                cashierTransaction
                  .slice()
                  .reverse()
                  ?.map((t, i) => (
                    <Tr
                      key={i}
                      cursor="pointer"
                      _hover={{ bg: "var(--divider)" }}
                    >
                      <TransactionItem key={i} t={t} />
                    </Tr>
                  ))}
            </Tbody>
          </Table>
        </Container>
      )}
    </PageWithMainNav>
  );
}
