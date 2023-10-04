import {
  Box,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import useFormatNumber from "../utils/useFormatNumber";
import { Transaction } from "../pages/CashierTransaction";
import useScreenWidth from "../utils/useGetScreenWidth";
import { OrderItem } from "../globalState/useOrder";
import TransactionOrderList from "./TransactionOrderList";
import { useEffect } from "react";
import { ShoppingBag } from "@phosphor-icons/react";

type Props = { t: Transaction };

export default function TransactionItem({ t }: Props) {
  const fn = useFormatNumber;
  const sw = useScreenWidth();

  const OrderListModal = ({ orderList }: { orderList: OrderItem[] }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
      const handleBackNavigation = (e: PopStateEvent) => {
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
          icon={<Icon as={ShoppingBag} fontSize={[15, null, 18]} />}
          className="btn-solid clicky"
          onClick={onOpen}
        />

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          scrollBehavior="inside"
          size={"xl"}
        >
          <ModalOverlay
          backdropFilter={"blur(5px)"}
          />

          <ModalContent>
            <ModalCloseButton
              borderRadius={"full"}
              h={"32px !important"}
              fontSize={"11px !important"}
              right={3}
              top={2}
            />

            <ModalHeader
              px={[4, 6, 8]}
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
      <HStack gap={8} justify={"space-between"}>
        <Box w={"40%"}>
          <Text opacity={0.8} color={"p.500"}>{`${t.id}`}</Text>
          <HStack gap={1}>
            <Text fontSize={11} opacity={0.5}>
              Rp
            </Text>
            <Text color={"p.500"} fontWeight={500}>
              {fn(t.totalPayment)}
            </Text>
          </HStack>
        </Box>

        <Box w={"20%"}>
          <Text opacity={0.8}>{t.paymentMethod}</Text>
          <HStack gap={1}>
            <Text fontSize={11} opacity={0.5}>
              Rp
            </Text>
            <Text>{fn(t.pay)}</Text>
          </HStack>
        </Box>

        <Box w={"20%"}>
          <Text opacity={0}>Change</Text>
          <HStack gap={1} justify={"flex-end"}>
            <Text fontSize={11} opacity={0.5}>
              Rp
            </Text>
            <Text>{fn(t.change) || 0}</Text>
          </HStack>
        </Box>

        <VStack align={"flex-end"} w={"20%"}>
          <OrderListModal orderList={t.orderList} />
        </VStack>
      </HStack>
    );
  };

  const TransactionItem = ({ t }: Props) => {
    return (
      <HStack gap={8}>
        <Box w={"15%"}>
          <Text opacity={0.8} color={"p.500"}>{`${t.id}`}</Text>
        </Box>

        <HStack
          gap={1}
          w={"15%"}
          color={"p.500"}
          fontWeight={500}
          justify={"flex-end"}
        >
          <Text fontSize={11} opacity={0.5}>
            Rp
          </Text>
          <Text>{fn(t.totalPayment)}</Text>
        </HStack>

        <Text w={"15%"} textAlign={"right"}>
          {t.paymentMethod}
        </Text>

        <HStack gap={1} w={"20%"} justify={"flex-end"}>
          <Text fontSize={11} opacity={0.5}>
            Rp
          </Text>
          <Text>{fn(t.pay)}</Text>
        </HStack>

        <HStack gap={1} w={"15%"} justify={"flex-end"}>
          <Text fontSize={11} opacity={0.5}>
            Rp
          </Text>
          <Text>{fn(t.change) || 0}</Text>
        </HStack>
        <VStack w={"20%"} align={"flex-end"}>
          <OrderListModal orderList={t.orderList} />
        </VStack>
      </HStack>
    );
  };

  if (sw < 770) return <TransactionItemMobile t={t} />;

  return <TransactionItem t={t} />;
}
