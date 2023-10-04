import {
  Badge,
  Box,
  Button,
  HStack,
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
        <Button className="btn-solid clicky" onClick={onOpen}>
          Order List
        </Button>

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          scrollBehavior="inside"
          size={"xl"}
        >
          <ModalOverlay backdropFilter={"blur(10px)"} />

          <ModalContent>
            <ModalCloseButton
              borderRadius={"full"}
              h={"32px !important"}
              right={3}
              top={3}
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
      <HStack h={"36px"} gap={8} justify={"space-between"} align={"flex-end"}>
        <Box w={"35%"}>
          <Badge colorScheme="p">{`${t.id}`}</Badge>
          <Text>{fn(t.totalPayment)}</Text>
        </Box>

        <Box w={"20%"}>
          <Text opacity={0.5}>{t.paymentMethod}</Text>
          <Text>{fn(t.pay)}</Text>
        </Box>

        <Box w={"20%"}>
          <Text opacity={0}>Change</Text>
          <Text textAlign={"right"}>{fn(t.change) || 0}</Text>
        </Box>

        <VStack align={"flex-end"} w={"25%"}>
          <OrderListModal orderList={t.orderList} />
        </VStack>
      </HStack>
    );
  };

  const TransactionItem = ({ t }: Props) => {
    return (
      <HStack gap={8}>
        <Box w={"5%"}>
          <Badge colorScheme="p">{`${t.id}`}</Badge>
        </Box>

        <Text w={"20%"} textAlign={"right"}>
          {fn(t.totalPayment)}
        </Text>

        <Text w={"20%"}>{t.paymentMethod}</Text>

        <Text w={"20%"} textAlign={"right"}>
          {fn(t.pay)}
        </Text>

        <Text w={"10%"} textAlign={"right"}>
          {fn(t.change) || 0}
        </Text>

        <VStack w={"25%"} align={"flex-end"}>
          <OrderListModal orderList={t.orderList} />
        </VStack>
      </HStack>
    );
  };

  if (sw < 770) return <TransactionItemMobile t={t} />;

  return <TransactionItem t={t} />;
}
