import { Box, HStack, Icon, Text, Tooltip, VStack } from "@chakra-ui/react";
import useScreenWidth from "../utils/useGetScreenWidth";
import useProductCategoryIcon from "../const/productCategoryIcon";
import useFormatNumber from "../utils/useFormatNumber";

type Props = {
  category: string;
  name: string;
  code: string;
  price: number;
  stock: number;
};

export default function ProductSearchResult({
  category,
  name,
  code,
  price,
  stock,
}: Props) {
  const sw = useScreenWidth();
  const fn = useFormatNumber;
  const productCategoryIcon = useProductCategoryIcon;

  return sw < 770 ? (
    <HStack gap={3} justify={"space-between"}>
      <HStack gap={3}>
        <Icon as={productCategoryIcon(category)} fontSize={26} weight="light" />
        <Box>
          <Tooltip label={name} hasArrow>
            <Text noOfLines={1}>{name}</Text>
          </Tooltip>
          <Text opacity={0.5} fontSize={[10, null, 12]}>
            {code}
          </Text>
        </Box>
      </HStack>

      <VStack align={"flex-end"} gap={0} mr={1} flexShrink={0}>
        <HStack gap={1}>
          <Text opacity={0.5} fontSize={[10, null, 12]}>
            Rp
          </Text>
          <Text>{fn(price)}</Text>
        </HStack>

        <Text opacity={0.5} fontSize={[10, null, 12]}>{`Stock : ${fn(
          stock
        )}`}</Text>
      </VStack>
    </HStack>
  ) : (
    <HStack gap={3}>
      <HStack w={"5%"} justify={"flex-start"}>
        <Icon as={productCategoryIcon(category)} fontSize={20} weight="light" />
      </HStack>

      <Box w={"40%"}>
        <Tooltip label={name} hasArrow placement="right">
          <Text w={"max-content"} noOfLines={1}>
            {name}
          </Text>
        </Tooltip>
      </Box>

      <Text w={"30%"} opacity={0.5} fontSize={[10, null, 12]}>
        {code}
      </Text>

      <Text w={"10%"} opacity={0.5} fontSize={[10, null, 12]}>{`Stock : ${fn(
        stock
      )}`}</Text>

      <HStack w={"15%"} gap={1} justify={"flex-end"}>
        <Text opacity={0.5} fontSize={[10, null, 12]}>
          Rp
        </Text>
        <Text>{fn(price)}</Text>
      </HStack>
    </HStack>
  );
}
