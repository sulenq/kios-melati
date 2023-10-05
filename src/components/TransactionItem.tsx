import {
  Button,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Td,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import useFormatNumber from "../utils/useFormatNumber";
import useScreenWidth from "../utils/useGetScreenWidth";
import { useEffect, useRef } from "react";
import { ListMagnifyingGlass, Printer } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Transaction } from "../pages/Checkout";

type Props = { t: Transaction };

export default function TransactionItem({ t }: Props) {
  const fn = useFormatNumber;
  const sw = useScreenWidth();

  const TransactionDetail = () => {
    return (
      <Tooltip label="Transaction Detail" hasArrow openDelay={500}>
        <Link to={`/transaction/${t.id}`}>
          <IconButton
            aria-label="orderListButton"
            icon={<Icon as={ListMagnifyingGlass} fontSize={[17, null, 19]} />}
            className="btn-solid clicky"
          />
        </Link>
      </Tooltip>
    );
  };

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
            icon={<Icon as={Printer} fontSize={[17, null, 19]} />}
            className="btn-solid clicky"
            onClick={onOpen}
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

  const TransactionItemMobile = ({ t }: Props) => {
    return (
      <>
        <Td pl={4} pr={2} py={2}>
          <Text opacity={0.8} color={"p.500"}>{`${t.id}`}</Text>
          <HStack gap={1}>
            <Text fontSize={11} opacity={0.5}>
              Rp
            </Text>
            <Text fontWeight={500}>{fn(t.totalPayment)}</Text>
          </HStack>
        </Td>

        <Td px={2} py={2}>
          <Text opacity={0.8}>{t.paymentMethod}</Text>
          <HStack gap={1}>
            <Text fontSize={11} opacity={0.5}>
              Rp
            </Text>
            <Text>{fn(t.pay)}</Text>
          </HStack>
        </Td>

        <Td px={2} py={2}>
          <Text opacity={0}>Change</Text>
          <HStack gap={1} justify={"flex-end"}>
            <Text fontSize={11} opacity={0.5}>
              Rp
            </Text>
            <Text>{fn(t.change) || 0}</Text>
          </HStack>
        </Td>

        <Td pl={2} pr={4} py={2}>
          <HStack justify={"flex-end"}>
            <TransactionDetail />

            <PrintReceiptModal id={t.id} />
          </HStack>
        </Td>
      </>
    );
  };

  const TransactionItem = ({ t }: Props) => {
    return (
      <>
        <Td px={2} py={2} borderRadius={"6px 0 0 6px"}>
          <Text opacity={0.8} color={"p.500"}>{`${t.id}`}</Text>
        </Td>

        <Td px={2} py={2}>
          <HStack gap={1} justify={"flex-end"}>
            <Text fontSize={11} opacity={0.5}>
              Rp
            </Text>
            <Text>{fn(t.totalPayment)}</Text>
          </HStack>
        </Td>

        <Td textAlign={"right"} px={2} py={2}>
          <Text>{`${t.paymentMethod}`}</Text>
        </Td>

        <Td px={2} py={2}>
          <HStack gap={1} justify={"flex-end"}>
            <Text fontSize={11} opacity={0.5}>
              Rp
            </Text>
            <Text>{fn(t.pay)}</Text>
          </HStack>
        </Td>

        <Td px={2} py={2}>
          <HStack gap={1} justify={"flex-end"}>
            <Text fontSize={11} opacity={0.5}>
              Rp
            </Text>
            <Text>{fn(t.change) || 0}</Text>
          </HStack>
        </Td>

        <Td px={2} py={2} borderRadius={"0 6px 6px 0"}>
          <HStack justify={"flex-end"}>
            <TransactionDetail />

            <PrintReceiptModal id={t.id} />
          </HStack>
        </Td>
      </>
    );
  };

  if (sw < 770) return <TransactionItemMobile t={t} />;

  return <TransactionItem t={t} />;
}
