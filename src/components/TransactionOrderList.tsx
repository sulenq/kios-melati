import {
  HStack,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Tooltip,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { OrderItem } from "../globalState/useOrder";
import useProductCategoryIcon from "../const/productCategoryIcon";
import useFormatNumber from "../utils/useFormatNumber";

export default function TransactionOrderList({
  orderList,
}: {
  orderList: OrderItem[];
}) {
  const pci = useProductCategoryIcon;
  const fn = useFormatNumber;

  return (
    <VStack gap={0}>
      <Table variant={"unstyled"}>
        <Tbody>
          {orderList.map((o, i) => (
            <Tr key={i} cursor="pointer" _hover={{ bg: "var(--divider)" }}>
              <Td
                pl={[4, 5, 6]}
                pr={2}
                py={2}
                // borderRadius={i === orderList.length - 1 ? "0 0 0 6px" : ""}
              >
                <Icon as={pci(o.category)} fontSize={18} mt={1} />
              </Td>

              <Td px={2} py={2}>
                <Tooltip label={o.name} hasArrow>
                  <Text noOfLines={1}>{o.name}</Text>
                </Tooltip>

                <Text opacity={0.5} fontSize={11}>
                  {o.code}
                </Text>
              </Td>

              <Td px={2} py={2}>
                <HStack gap={1} opacity={0.5} justify={"flex-end"}>
                  <Text opacity={0.5} fontSize={[10, null, 12]}>
                    @
                  </Text>
                  <Text>{fn(o.price)}</Text>
                </HStack>
              </Td>

              <Td px={2} py={2}>
                <Text opacity={0.5} fontSize={[10, null, 12]}>
                  {`x${o.qty}`}
                </Text>
              </Td>

              <Td
                pr={[4, 5, 6]}
                pl={2}
                py={2}
                // borderRadius={i === orderList.length - 1 ? "0 0 6px 0" : ""}
              >
                <HStack gap={1} justify={"flex-end"}>
                  <Text opacity={0.5} fontSize={[10, null, 12]}>
                    Rp
                  </Text>
                  <Text fontSize={14}>{fn(o.totalPrice)}</Text>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
}
