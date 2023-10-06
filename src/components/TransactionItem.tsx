import { HStack, Icon, IconButton, Td, Text, Tooltip } from "@chakra-ui/react";
import useFormatNumber from "../utils/useFormatNumber";
import useScreenWidth from "../utils/useGetScreenWidth";
import { ListMagnifyingGlass } from "@phosphor-icons/react";
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
          {/* <Text opacity={0}>Change</Text> */}
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
          </HStack>
        </Td>
      </>
    );
  };

  if (sw < 770) return <TransactionItemMobile t={t} />;

  return <TransactionItem t={t} />;
}
