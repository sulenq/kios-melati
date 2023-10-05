import {
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Td,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import useFormatNumber from "../utils/useFormatNumber";
import { Transaction } from "../pages/CashierTransaction";
import useScreenWidth from "../utils/useGetScreenWidth";
import { OrderItem } from "../globalState/useOrder";
import TransactionOrderList from "./TransactionOrderList";
import { useEffect, useRef } from "react";
import { ShoppingBag } from "@phosphor-icons/react";

type Props = { t: Transaction };

export default function TransactionItem({ t }: Props) {
  const fn = useFormatNumber;
  const sw = useScreenWidth();

  const OrderListModal = ({ orderList }: { orderList: OrderItem[] }) => {
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
        <IconButton
          aria-label="orderListButton"
          icon={<Icon as={ShoppingBag} fontSize={[17, null, 19]} />}
          className="btn-solid clicky"
          onClick={onOpen}
        />

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          scrollBehavior="inside"
          size={"xl"}
          initialFocusRef={undefined}
        >
          <ModalOverlay backdropFilter={"blur(5px)"} />

          <ModalContent ref={modalContentRef}>
            <ModalCloseButton
              borderRadius={"full"}
              h={"32px !important"}
              fontSize={"11px !important"}
              right={2}
              top={2}
              className="btn sm-clicky"
            />

            <ModalHeader
              px={[4, null, 6]}
              py={3}
              fontSize={[15, null, 17]}
              borderBottom={"1px solid var(--divider)"}
            >{`ID : ${t.id}`}</ModalHeader>

            <ModalBody px={0} py={0}>
              <TransactionOrderList orderList={orderList} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };

  const TransactionItemMobile = ({ t }: Props) => {
    return (
      <>
        <Td px={[4, null, 2]} py={2}>
          <Text opacity={0.8} color={"p.500"}>{`${t.id}`}</Text>
          <HStack gap={1}>
            <Text fontSize={11} opacity={0.5}>
              Rp
            </Text>
            <Text fontWeight={500}>{fn(t.totalPayment)}</Text>
          </HStack>
        </Td>

        <Td px={[4, null, 2]} py={2}>
          <Text opacity={0.8}>{t.paymentMethod}</Text>
          <HStack gap={1}>
            <Text fontSize={11} opacity={0.5}>
              Rp
            </Text>
            <Text>{fn(t.pay)}</Text>
          </HStack>
        </Td>

        <Td px={[4, null, 2]} py={2}>
          {/* <Text opacity={0}>Change</Text> */}
          <HStack gap={1} justify={"flex-end"}>
            <Text fontSize={11} opacity={0.5}>
              Rp
            </Text>
            <Text>{fn(t.change) || 0}</Text>
          </HStack>
        </Td>

        <Td px={[4, null, 2]} py={2}>
          <HStack justify={"flex-end"}>
            <OrderListModal orderList={t.orderList} />
          </HStack>
        </Td>
      </>
    );
  };

  const TransactionItem = ({ t }: Props) => {
    return (
      <>
        <Td px={[4, null, 2]} py={2} borderRadius={"6px 0 0 6px"}>
          <Text opacity={0.8} color={"p.500"}>{`${t.id}`}</Text>
        </Td>

        <Td px={[4, null, 2]} py={2}>
          <HStack gap={1} justify={"flex-end"}>
            <Text fontSize={11} opacity={0.5}>
              Rp
            </Text>
            <Text>{fn(t.totalPayment)}</Text>
          </HStack>
        </Td>

        <Td textAlign={"right"} px={[4, null, 2]} py={2}>
          <Text>{`${t.paymentMethod}`}</Text>
        </Td>

        <Td px={[4, null, 2]} py={2}>
          <HStack gap={1} justify={"flex-end"}>
            <Text fontSize={11} opacity={0.5}>
              Rp
            </Text>
            <Text>{fn(t.pay)}</Text>
          </HStack>
        </Td>

        <Td px={[4, null, 2]} py={2}>
          <HStack gap={1} justify={"flex-end"}>
            <Text fontSize={11} opacity={0.5}>
              Rp
            </Text>
            <Text>{fn(t.change) || 0}</Text>
          </HStack>
        </Td>

        <Td px={[4, null, 2]} py={2} borderRadius={"0 6px 6px 0"}>
          <HStack justify={"flex-end"}>
            <OrderListModal orderList={t.orderList} />
          </HStack>
        </Td>
      </>
    );
  };

  if (sw < 770) return <TransactionItemMobile t={t} />;

  return <TransactionItem t={t} />;
}
