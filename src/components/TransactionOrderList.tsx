import { Box, HStack, Icon, Text, Tooltip, VStack } from "@chakra-ui/react";
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
    <VStack gap={4}>
      {orderList.map((o, i) => (
        <HStack
          _hover={{ bg: "var(--divider)" }}
          py={2}
          px={[4, 6, 8]}
          key={i}
          w={"100%"}
          gap={3}
          justify={"space-between"}
          borderRadius={i === orderList.length - 1 ? "0 0 6px 6px" : ""}
        >
          <HStack gap={3}>
            <Icon as={pci(o.category)} fontSize={20} />

            <Box>
              <Tooltip label={o.name} hasArrow>
                <Text noOfLines={1}>{o.name}</Text>
              </Tooltip>
              <Text opacity={0.5} fontSize={11}>
                {o.code}
              </Text>
            </Box>
          </HStack>

          <HStack gap={4} w={"50%"} justify={"flex-end"}>
            <HStack gap={1} opacity={0.5} w={"40%"}>
              <Text opacity={0.5} fontSize={[10, null, 12]}>
                @
              </Text>
              <Text>{fn(o.price)}</Text>
            </HStack>

            <Text opacity={0.5} w={"20%"}>{`x${o.qty}`}</Text>

            <HStack gap={1} w={"40%"} justify={"flex-end"}>
              <Text opacity={0.5} fontSize={[10, null, 12]}>
                Rp
              </Text>
              <Text fontSize={14}>{fn(o.totalPrice)}</Text>
            </HStack>
          </HStack>
        </HStack>
      ))}
    </VStack>
  );
}
