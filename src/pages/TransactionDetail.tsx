import { useEffect, useState } from "react";
import Page from "../components/Page";
import {
  Box,
  HStack,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import NavHeader from "../components/NavHeader";
import { useParams } from "react-router-dom";
import { Transaction } from "./Checkout";
import TransactionOrderList from "../components/TransactionOrderList";
import useFormatNumber from "../utils/useFormatNumber";

export default function TransactionDetail() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        window.history.back();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const { id } = useParams();
  const bg = useColorModeValue("white", "#05050550");
  const color = useColorModeValue("bt", "wt");
  const tc = localStorage.getItem("transaction");
  const [td, setTd] = useState<Transaction>();
  const fn = useFormatNumber;
  useEffect(() => {
    if (tc) {
      const tl = JSON.parse(tc);
      const td = tl.find((t: Transaction) => t.id === id);
      if (td) {
        setTd(td);
      }
    }
  }, [tc, id]);

  return (
    <Page>
      <VStack w={"100%"} borderBottom={"1px solid var(--divider)"} p={2}>
        <NavHeader title={"Transaction Detail"} right={null} />
      </VStack>

      {td && (
        <Box p={4} position={"relative"} w={"100%"} maxW={"500px"}>
          <VStack
            gap={0}
            bg={bg}
            color={color}
            backdropFilter={"blur(100px)"}
            border={"2px solid var(--divider)"}
            borderRadius={6}
          >
            <Box px={5} pt={5} pb={4} w={"100%"}>
              <HStack
                justify={"space-between"}
                pb={4}
                borderBottom={"2px dashed var(--divider)"}
              >
                <Image w={"50px"} src="/logo.svg" />

                <VStack align="flex-end" gap={0} opacity={0.5}>
                  <Text>{td.id}</Text>
                  <Text>5 October 2023</Text>
                </VStack>
              </HStack>
            </Box>

            <Box w={"100%"}>
              <HStack mx={5} mb={2} justify={"space-between"}>
                <Text fontSize={15} fontWeight={600}>
                  Order
                </Text>
                <Text fontSize={15} fontWeight={600}>
                  {`Total : ${td.orderList.length}`}
                </Text>
              </HStack>

              <VStack w={"100%"}>
                <Table variant={"unstyled"}>
                  <Tbody>
                    <TransactionOrderList orderList={td.orderList} />
                  </Tbody>
                </Table>
              </VStack>

              {/* <Box
                w={"100%"}
                maxW={"460px"}
                mx={"auto"}
                pb={4}
                borderBottom={"2px dashed var(--divider)"}
              /> */}
            </Box>

            <Box mt={4} px={5} w={"100%"}>
              <VStack
                w={"100%"}
                py={4}
                borderTop={"2px dashed var(--divider)"}
                // borderBottom={"2px dashed var(--divider)"}
              >
                <Table size={"sm"} variant={"unstyled"}>
                  <Tbody>
                    <Tr>
                      <Td
                        pl={0}
                        fontWeight={600}
                        fontSize={15}
                        lineHeight={1.4}
                      >
                        Total Payment
                      </Td>

                      <Td></Td>
                      <Td></Td>

                      <Td px={2} opacity={0.5} fontSize={[10, null, 12]}>
                        Rp
                      </Td>

                      <Td
                        pr={0}
                        fontSize={15}
                        fontWeight={600}
                        textAlign={"right"}
                      >
                        {fn(td.totalPayment)}
                      </Td>
                    </Tr>

                    <Tr>
                      <Td pl={0}>{td.paymentMethod}</Td>

                      <Td></Td>
                      <Td></Td>

                      <Td px={2} opacity={0.5} fontSize={[10, null, 12]}>
                        Rp
                      </Td>

                      <Td pr={0} textAlign={"right"}>
                        {fn(td.totalPayment)}
                      </Td>
                    </Tr>

                    <Tr>
                      <Td pl={0}>Change</Td>

                      <Td></Td>
                      <Td></Td>

                      <Td px={2} opacity={0.5} fontSize={[10, null, 12]}>
                        Rp
                      </Td>

                      <Td pr={0} textAlign={"right"}>
                        {fn(td.change) || 0}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </VStack>
            </Box>
          </VStack>

          {/* <VStack
            p={4}
            maxW={"500px"}
            position={"absolute"}
            bottom={0}
            zIndex={-1}
            opacity={0.2}
          >
            <Image w={"100%"} src="/img/transaction.png" />
          </VStack> */}
        </Box>
      )}
    </Page>
  );
}
