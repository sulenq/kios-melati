import {
  Box,
  ButtonGroup,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import useFormatNumber from "../utils/useFormatNumber";
import useOrder, { OrderItem } from "../globalState/useOrder";
import { Minus, Plus } from "@phosphor-icons/react";
import useReverseFormatNumber from "../utils/useReverseFormatNumber";

type Props = {
  order: OrderItem;
};

export default function OrderItemComponent({ order }: Props) {
  const fn = useFormatNumber;
  const rfn = useReverseFormatNumber;
  const { setOrder } = useOrder();

  return (
    <HStack gap={3} justify={"space-between"} mb={3}>
      <HStack gap={3}>
        <Box>
          <Tooltip label={order.name} hasArrow placement="right">
            <Text noOfLines={1}>{order.name}</Text>
          </Tooltip>

          <Text opacity={0.5} fontSize={[10, null, 12]}>
            {order.code}
          </Text>

          <HStack gap={1}>
            <Text opacity={0.5} fontSize={[10, null, 12]}>
              Rp
            </Text>
            <Text>{fn(order.price)}</Text>
          </HStack>
        </Box>
      </HStack>

      <VStack align={"flex-end"} gap={2} mr={2} flexShrink={0}>
        <HStack gap={1}>
          <Text opacity={0.5} fontSize={[10, null, 12]}>
            Rp
          </Text>
          <Text fontSize={15}>{fn(order.totalPrice)}</Text>
        </HStack>

        <ButtonGroup isAttached>
          <IconButton
            className="btn-solid clicky"
            aria-label="qtyMinusButton"
            icon={<Icon as={Minus} />}
          />

          <Input
            value={order.qty}
            onChange={(e) => {
              setOrder({
                ...order,
                qty: rfn(e.target.value),
                totalPrice: rfn(e.target.value) * order.price,
              });
            }}
            textAlign={"right"}
            borderRadius={"0 !important"}
            placeholder="qty"
            w={"50px"}
          />

          <IconButton
            className="btn-solid clicky"
            aria-label="qtyPlusButton"
            icon={<Icon as={Plus} />}
          />
        </ButtonGroup>
      </VStack>
    </HStack>
  );
}
