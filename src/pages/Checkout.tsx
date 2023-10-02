import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import Container from "../components/Container";
import NavHeader from "../components/NavHeader";
import useOrder from "../globalState/useOrder";
import useFormatNumber from "../utils/useFormatNumber";
import useReverseFormatNumber from "../utils/useReverseFormatNumber";
import { CaretDown, X } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import useScreenWidth from "../utils/useGetScreenWidth";
import { useNavigate } from "react-router-dom";
import cashList from "../const/cashList";
import paymentMethods from "../const/paymentMethods";

export default function Checkout() {
  const { totalPayment, paymentMethod, setPaymentMethod, pay, setPay } =
    useOrder();
  const { resetOrder } = useOrder();
  const fn = useFormatNumber;
  const rfn = useReverseFormatNumber;
  const sw = useScreenWidth();
  const inputPayRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (totalPayment <= 0) {
      navigate("/cashier");
    }
  }, [totalPayment, navigate]);

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
              <Text opacity={0.5}>Total Payment</Text>

              <HStack align={"flex-end"}>
                <Text>Rp</Text>
                <Text
                  fontSize={32}
                  fontWeight={800}
                  textAlign={"center"}
                  lineHeight={1}
                  color={"p.500"}
                >
                  {fn(totalPayment) || 0}
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
                  {fn(pay - totalPayment) || 0}
                </Text>
              </HStack>
            </HStack>

            <FormControl mb={4}>
              <HStack align={"flex-start"}>
                <VStack h={"40px !important"}>
                  <Menu>
                    <MenuButton
                      className="btn-solid "
                      flexShrink={0}
                      flex={1}
                      fontWeight={500}
                      w={"87px"}
                      as={Button}
                      rightIcon={<Icon as={CaretDown} />}
                    >
                      {paymentMethod}
                    </MenuButton>

                    <MenuList minW={"87px"}>
                      {paymentMethods.map((p, i) => (
                        <MenuItem
                          key={i}
                          onClick={() => {
                            setPaymentMethod(p);
                            if (p === "QRIS") {
                              setPay(totalPayment);
                            } else {
                              setPay(0);
                            }
                          }}
                        >
                          <Text>{p}</Text>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </VStack>

                <InputGroup position={"relative"}>
                  <Input
                    ref={inputPayRef}
                    placeholder="Pay amount"
                    textAlign={"right"}
                    fontSize={"17px !important"}
                    fontWeight={600}
                    h={"40px !important"}
                    value={fn(pay)}
                    onChange={(e) => {
                      setPay(rfn(e.target.value));
                    }}
                    name={"indexProduct"}
                    bg={"var(--divider)"}
                    border={"2px solid transparent !important"}
                    pl={"88px !important"}
                  />

                  {pay && (
                    <IconButton
                      position={"absolute"}
                      left={0}
                      top={0}
                      onClick={() => {
                        setPay(0);
                      }}
                      _hover={{ bg: "transparent !important" }}
                      _active={{ bg: "transparent !Important" }}
                      zIndex={2}
                      variant={"ghost"}
                      className="sm-clicky"
                      aria-label="clearSearchButton"
                      mt={sw < 770 ? "2px" : 0}
                      icon={<Icon as={X} fontSize={16} />}
                    />
                  )}
                </InputGroup>
              </HStack>
            </FormControl>

            <Accordion allowMultiple mb={4}>
              <AccordionItem
                border={"none"}
                bg={"var(--divider)"}
                backdropFilter={"blur(10px)"}
                borderRadius={6}
              >
                <AccordionButton h={"40px !important"} borderRadius={6}>
                  <Box as="span" flex="1" textAlign="left" opacity={0.5}>
                    Cash list
                  </Box>

                  <AccordionIcon opacity={0.5} />
                </AccordionButton>

                <AccordionPanel p={2}>
                  <Wrap justify={"center"}>
                    {cashList.map((c, i) => (
                      <HStack key={i} flex={1}>
                        <Button
                          onClick={() => {
                            setPay(pay + c.nominal);
                          }}
                          bg={`${c.color} !important`}
                          _hover={{ bg: `${c.color} !important` }}
                          flex={1}
                          className="clicky"
                          fontWeight={400}
                        >
                          {fn(c.nominal)}
                        </Button>
                      </HStack>
                    ))}
                  </Wrap>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Button
              onClick={() => {
                resetOrder();
                navigate("/cashier");
              }}
              w={"100%"}
              h={"44px !important"}
              borderRadius={"full"}
              colorScheme="ap"
              color={"white"}
              className="clicky"
              mb={4}
            >
              CONFRIM TRANSACTION
            </Button>
          </Box>

          <VStack zIndex={-1} position={"absolute"} bottom={0} p={4}>
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
