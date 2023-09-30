import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import Container from "../components/Container";
import NavHeader from "../components/NavHeader";
import useOrder from "../globalState/useOrder";
import useFormatNumber from "../utils/useFormatNumber";

export default function Checkout() {
  const { order } = useOrder();
  const fn = useFormatNumber;

  return (
    <VStack minH={"100vh"}>
      <VStack w={"100%"} borderBottom={"1px solid var(--divider)"} p={2}>
        <NavHeader title={"Checkout"} right={null} />
      </VStack>

      <Container flex={1}>
        <VStack flex={1} justify={"space-between"}>
          <Box w={"100%"} maxW={"400px"} mx={"auto"}>
            <HStack
              align={"flex-start"}
              justify={"space-between"}
              mt={1}
              mb={4}
            >
              <Text opacity={0.5}>Total</Text>

              <HStack align={"flex-end"}>
                <Text>Rp</Text>
                <Text
                  fontSize={32}
                  fontWeight={800}
                  textAlign={"center"}
                  lineHeight={1}
                  color={"p.500"}
                >
                  {fn(order.total) || 0}
                </Text>
              </HStack>
            </HStack>

            <HStack
              w={"100%"}
              maxW={"400px"}
              mx={"auto"}
              gap={1}
              align={"flex-start"}
              justify={"space-between"}
              py={1}
              mb={4}
            >
              <Text opacity={0.5}>Change</Text>

              <HStack align={"flex-end"}>
                <Text>Rp</Text>
                <Text
                  fontSize={32}
                  fontWeight={800}
                  textAlign={"center"}
                  lineHeight={1}
                >
                  {fn(order.pay - order.total) || 0}
                </Text>
              </HStack>
            </HStack>

            <FormControl mb={8}>
              <FormLabel>Pay</FormLabel>
              <Input placeholder="Input payment amount" textAlign={"right"} />
            </FormControl>

            <Button
              w={"100%"}
              borderRadius={"full"}
              colorScheme="ap"
              color={"white"}
              className="clicky"
            >
              CHECKOUT
            </Button>
          </Box>

          <VStack p={4}>
            <Image
              animation={"fade-in-fade 1s"}
              opacity={0.3}
              w={"100%"}
              maxW={"400px"}
              src={"../img/pay.png"}
            />
          </VStack>
        </VStack>
      </Container>
    </VStack>
  );
}
