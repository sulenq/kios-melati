import { useEffect, useRef, useState } from "react";
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
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Tooltip,
  IconButton,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Transaction } from "./Checkout";
import TransactionOrderList from "../components/TransactionOrderList";
import useFormatNumber from "../utils/useFormatNumber";
import { Printer } from "@phosphor-icons/react";
import PageWithMainNav from "../components/PageWithMainNav";

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

  const logo = useColorModeValue("/logob.svg", "/logow.svg");
  const { id } = useParams();
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

  const PrintReceiptModal = ({ id }: { id: string }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const modalContentRef = useRef(null);

    useEffect(() => {
      const handleBackNavigation = () => {
        onClose();
      };

      window.addEventListener("popstate", handleBackNavigation);

      return () => {
        window.removeEventListener("popstate", handleBackNavigation);
      };
    }, [onClose]);

    return (
      <>
        <Tooltip label={"Print Receipt"} hasArrow openDelay={500}>
          <IconButton
            aria-label="orderListButton"
            icon={<Icon as={Printer} fontSize={19} />}
            className="btn clicky"
            variant={"ghost"}
            onClick={onOpen}
            borderRadius={"full"}
            h={"40px !important"}
          />
        </Tooltip>

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          scrollBehavior="inside"
          initialFocusRef={undefined}
          isCentered
        >
          <ModalOverlay backdropFilter={"blur(5px)"} />

          <ModalContent ref={modalContentRef}>
            <ModalHeader px={4} py={3} pt={4}>
              Printing Receipt
            </ModalHeader>

            <ModalBody px={4}>
              <Text>{`Are you sure want to print this transaction (ID : ${id}) receipt?`}</Text>
            </ModalBody>

            <ModalFooter>
              <HStack w={"100%"}>
                <Button
                  w={"50%"}
                  colorScheme="bnw"
                  className="clicky"
                  onClick={onClose}
                >
                  CANCEL
                </Button>
                <Button className="btn clicky" variant={"ghost"} w={"50%"}>
                  PRINT RECEIPT
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

  return (
    <PageWithMainNav
      title={"Transaction Detail"}
      headerLeft={"backButton"}
      headerRight={<PrintReceiptModal id={id ? id : ""} />}
    >
      {!td && (
        <VStack
          p={4}
          w={"100%"}
          maxW={"600px"}
          flex={1}
          justify={"space-between"}
          // h={sw < 770 ? "calc(100% - 170px)" : "calc(100% - 136px)"}
        >
          <Text fontWeight={500} fontSize={[15, null, 17]} mb={4}>
            No Result
          </Text>
          <Image opacity={0.2} src={"/img/transaction.png"} />
        </VStack>
      )}

      {td && (
        <Box position={"relative"} w={"100%"} mx={"auto"}>
          <VStack
            gap={0}
            borderRadius={6}
            // border={"1px solid var(--divider)"}
          >
            <Box px={[4, 5, 6]} mt={5} mb={4} w={"100%"}>
              <HStack
                justify={"space-between"}
                pb={4}
                borderBottom={"2px dashed var(--divider)"}
              >
                <Image w={"50px"} src={logo} />

                <VStack align="flex-end" gap={0} opacity={0.5}>
                  <Text fontSize={17}>{td.id}</Text>
                  <Text>5 October 2023</Text>
                </VStack>
              </HStack>
            </Box>

            <Box w={"100%"}>
              <HStack px={[4, 5, 6]} mb={2} justify={"space-between"}>
                <Text fontSize={15} fontWeight={600}>
                  Order
                </Text>

                <Text fontSize={15} fontWeight={600}>
                  {`Total : ${td.orderList.length}`}
                </Text>
              </HStack>

              <VStack w={"100%"} align={"stretch"}>
                <TransactionOrderList orderList={td.orderList} />
              </VStack>
            </Box>

            <Box mt={4} px={[4, 5, 6]} w={"100%"} overflow={"auto"}>
              <VStack
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
                        fontSize={17}
                        lineHeight={1.4}
                      >
                        Total Payment
                      </Td>

                      <Td
                        pr={0}
                        fontSize={15}
                        fontWeight={600}
                        textAlign={"right"}
                      >
                        <HStack gap={1} justify={"flex-end"}>
                          <Text opacity={0.5} fontSize={[10, null, 12]}>
                            Rp
                          </Text>
                          <Text fontSize={17}>{fn(td.totalPayment)}</Text>
                        </HStack>
                      </Td>
                    </Tr>

                    <Tr>
                      <Td pl={0}>{td.paymentMethod}</Td>

                      <Td pr={0} textAlign={"right"}>
                        <HStack gap={1} justify={"flex-end"}>
                          <Text opacity={0.5} fontSize={[10, null, 12]}>
                            Rp
                          </Text>
                          <Text fontSize={14}>{fn(td.pay)}</Text>
                        </HStack>
                      </Td>
                    </Tr>

                    <Tr>
                      <Td pl={0}>Change</Td>

                      <Td pr={0} textAlign={"right"}>
                        <HStack gap={1} justify={"flex-end"}>
                          <Text opacity={0.5} fontSize={[10, null, 12]}>
                            Rp
                          </Text>
                          <Text fontSize={14}>{fn(td.change) || 0}</Text>
                        </HStack>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </VStack>
            </Box>
          </VStack>
        </Box>
      )}
    </PageWithMainNav>
  );
}
