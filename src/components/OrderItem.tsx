import {
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
import { Minus, Plus, TrashSimple } from "@phosphor-icons/react";
import useReverseFormatNumber from "../utils/useReverseFormatNumber";
import useProductCategoryIcon from "../utils/useProductCategoryIcon";
import useScreenWidth from "../utils/useGetScreenWidth";

type Props = {
  order: OrderItem;
};

export default function OrderItemComponent({ order }: Props) {
  const fn = useFormatNumber;
  const rfn = useReverseFormatNumber;
  const sw = useScreenWidth();
  const { setQty, deleteOrder } = useOrder();
  const productCategoryIcon = useProductCategoryIcon;

  return (
    <HStack gap={3} justify={"space-between"}>
      <HStack gap={3}>
        <VStack h={sw < 770 ? "61px" : "68px"} justify={"space-between"}>
          <Icon mt={1} as={productCategoryIcon(order.category)} fontSize={18} />

          <IconButton
            onClick={() => {
              deleteOrder(order.id);
            }}
            aria-label="deleteOrderButton"
            icon={<Icon as={TrashSimple} fontSize={14} />}
            className="btn-solid clicky"
            minW={"30px !important"}
            flex={1}
          />
        </VStack>

        <VStack gap={"2px"} justify={"space-between"} align={"flex-start"}>
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
        </VStack>
      </HStack>

      <VStack align={"flex-end"} gap={1} flexShrink={0}>
        <HStack gap={1}>
          <Text opacity={0.5} fontSize={[10, null, 12]}>
            Rp
          </Text>
          <Text fontSize={14}>{fn(order.totalPrice)}</Text>
        </HStack>

        <HStack gap={1}>
          <ButtonGroup isAttached>
            <IconButton
              onClick={() => {
                setQty(order.id, order.qty > 1 ? order.qty - 1 : 1);
              }}
              className="btn-solid clicky"
              aria-label="qtyMinusButton"
              icon={<Icon as={Minus} />}
            />

            <Input
              value={order.qty}
              onChange={(e) => {
                let qty;
                if (e.target.value === "" || e.target.value === "0") {
                  qty = 1;
                } else {
                  qty = rfn(e.target.value);
                }
                setQty(order.id, qty);
              }}
              onFocus={(e) => {
                e.target.select();
              }}
              textAlign={"right"}
              borderRadius={"0 !important"}
              placeholder="qty"
              w={"50px"}
            />

            <IconButton
              onClick={() => {
                setQty(order.id, order.qty + 1);
              }}
              className="btn-solid clicky"
              aria-label="qtyPlusButton"
              icon={<Icon as={Plus} />}
            />
          </ButtonGroup>
        </HStack>
      </VStack>
    </HStack>
  );
}
