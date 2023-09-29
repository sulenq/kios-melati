import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import useScreenWidth from "../utils/useGetScreenWidth";
import useProductCategoryIcon from "../utils/useProductCategoryIcon";

type Props = {
  category: string;
  name: string;
  code: string;
  price: number;
  stock: number;
};

export default function SearchProductResult({
  category,
  name,
  code,
  price,
  stock,
}: Props) {
  const sw = useScreenWidth();
  const productCategoryIcon = useProductCategoryIcon;

  return sw < 770 ? (
    <HStack gap={3} justify={"space-between"} py={3}>
      <HStack gap={3}>
        <Icon as={productCategoryIcon(category)} fontSize={32} weight="light" />
        <Box>
          <Text noOfLines={1}>{name}</Text>
          <Text opacity={0.5} fontSize={[10, null, 12]}>
            {code}
          </Text>
        </Box>
      </HStack>

      <Box>
        <HStack gap={1}>
          <Text opacity={0.5} fontSize={[10, null, 12]}>
            Rp
          </Text>
          <Text>{price}</Text>
        </HStack>
        <Text
          opacity={0.5}
          fontSize={[10, null, 12]}
        >{`Stock : ${stock}`}</Text>
      </Box>
    </HStack>
  ) : (
    <HStack gap={3} justify={"space-between"} py={3}>
      <HStack w={"5%"} justify={"flex-start"}>
        <Icon as={productCategoryIcon(category)} fontSize={20} weight="light" />
      </HStack>

      <Text w={"30%"} noOfLines={1}>
        {name}
      </Text>

      <Text w={"30%"} opacity={0.5} fontSize={[10, null, 12]}>
        {code}
      </Text>

      <Text
        w={"20%"}
        opacity={0.5}
        fontSize={[10, null, 12]}
      >{`Stock : ${stock}`}</Text>

      <HStack w={"15%"} gap={1} justify={"flex-end"}>
        <Text opacity={0.5} fontSize={[10, null, 12]}>
          Rp
        </Text>
        <Text>{price}</Text>
      </HStack>
    </HStack>
  );
}
