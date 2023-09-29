import {
  Box,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  Tooltip,
  VStack,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import CashierNav from "../components/CashierNav";
import Container from "../components/Container";
import NavHeader from "../components/NavHeader";
import {
  Scan,
  ArrowElbowDownLeft,
  Plus,
  MagnifyingGlass,
  ArrowLeft,
  ShoppingBagOpen,
} from "@phosphor-icons/react";
import { useScreenWidth } from "../utils";
// import products from "../const/products";
import { useComponentsBg } from "../const/colorModeValues";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import HeaderContainer from "../components/HeaderContainer";
import { useEffect } from "react";
// import products from "../const/products";

export default function Cashier() {
  const sw = useScreenWidth();
  const cbg = useComponentsBg();

  const SearchProductTab = (props: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
      const handleBackButton = (event: PopStateEvent) => {
        event.preventDefault();
        onClose();
      };

      window.addEventListener("popstate", handleBackButton);

      return () => {
        window.removeEventListener("popstate", handleBackButton);
      };
    }, [onClose]);

    return (
      <>
        <Tooltip label={"Open Seacrh Tab"} hasArrow>
          <IconButton
            onClick={onOpen}
            {...props}
            aria-label="indexProductButton"
            icon={<Icon as={MagnifyingGlass} fontSize={18} />}
            colorScheme="bnw"
            className="clicky"
            zIndex={2}
          />
        </Tooltip>

        <Modal
          size={"full"}
          isOpen={isOpen}
          onClose={onClose}
          scrollBehavior="inside"
          motionPreset="slideInRight"
        >
          <ModalContent>
            <ModalBody p={0}>
              <VStack borderBottom={"1px solid var(--divider2)"} py={2} px={3}>
                <HeaderContainer>
                  <HStack
                    w={"100%"}
                    position={"sticky"}
                    top={0}
                    left={0}
                    zIndex={2}
                    {...cbg}
                    justify={"space-between"}
                  >
                    <IconButton
                      aria-label="searchProductBackButton"
                      icon={<Icon as={ArrowLeft} fontSize={20} />}
                      className="btn sm-clicky"
                      variant={"ghost"}
                      onClick={onClose}
                    />

                    <Text fontWeight={600} color={"p.500"} fontSize={15}>
                      Search Product
                    </Text>

                    <ColorModeSwitcher className="btn sm-clicky" />
                  </HStack>
                </HeaderContainer>
              </VStack>

              <Container>
                <HStack justify={"center"} my={4}>
                  <InputGroup maxW={"500px"}>
                    <InputLeftElement pointerEvents="none">
                      <Icon
                        as={MagnifyingGlass}
                        fontSize={18}
                        mb={[1, null, 0]}
                      />
                    </InputLeftElement>

                    <Input
                      name={"indexProduct"}
                      placeholder="Search Product"
                      bg={"var(--divider)"}
                      border={"2px solid transparent !important"}
                      pl={"40px !important"}
                    />
                  </InputGroup>
                </HStack>
              </Container>

              <Container>
                <HStack py={2} borderBottom={"1px solid var(--divider)"}>
                  <Text>Indomie Bakar</Text>
                  <Text>3.000</Text>
                </HStack>
              </Container>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };

  return (
    <>
      <VStack
        px={[3, null, 5]}
        borderBottom={"1px solid var(--divider2)"}
        py={2}
      >
        <NavHeader
          title={"Cashiering"}
          right={
            <IconButton
              aria-label="newTransaction"
              className="btn sm-clicky"
              variant={"ghost"}
              icon={<Icon as={Plus} fontSize={18} weight="bold" />}
            />
          }
        />
      </VStack>

      <Container borderBottom={"1px solid var(--divider2)"}>
        <CashierNav />

        {sw < 770 ? (
          <VStack
            gap={3}
            py={3}
            justify={"space-between"}
            // borderBottom={"2px solid var(--divider)"}
          >
            <HStack
              w={"100%"}
              maxW={"400px"}
              gap={1}
              align={"flex-start"}
              justify={"space-between"}
            >
              <Text opacity={0.5}>Total</Text>

              <HStack align={"flex-end"}>
                <Text>Rp</Text>
                <Text
                  fontSize={32}
                  fontWeight={800}
                  textAlign={"center"}
                  lineHeight={1}
                >
                  250.000
                </Text>
              </HStack>
            </HStack>

            <HStack gap={1} w={"100%"} maxW={"400px"}>
              <FormControl>
                <HStack gap={1}>
                  <Tooltip label={"Camera Scan"} hasArrow>
                    <IconButton
                      aria-label="cameraScan"
                      icon={<Icon as={Scan} fontSize={20} />}
                      className="btn-solid sm-clicky"
                      flexShrink={0}
                    />
                  </Tooltip>

                  <Box position={"relative"} w={"100%"}>
                    <Input
                      name={"indexProduct"}
                      placeholder="Index Product"
                      bg={"var(--divider)"}
                      border={"2px solid transparent !important"}
                      pr={"50px !important"}
                    />

                    <Box position={"absolute"} right={0} top={0}>
                      <SearchProductTab />
                    </Box>
                  </Box>
                </HStack>
              </FormControl>

              <HStack justify={"flex-end"}>
                <Tooltip label={"Chekout"} hasArrow>
                  <IconButton
                    aria-label="checkoutButton"
                    colorScheme="ap"
                    className="clicky"
                    fontSize={15}
                    px={5}
                    icon={
                      <HStack>
                        <Icon as={ShoppingBagOpen} fontSize={24} color={"wt"} />
                        <Icon
                          as={ArrowElbowDownLeft}
                          fontSize={16}
                          weight="bold"
                          color={"wt"}
                        />
                      </HStack>
                    }
                  />
                </Tooltip>
              </HStack>
            </HStack>
          </VStack>
        ) : (
          <HStack
            gap={4}
            py={4}
            justify={"space-between"}
            // borderBottom={"2px solid var(--divider)"}
          >
            <Box>
              <Text opacity={0.5}>Total</Text>

              <HStack align={"flex-end"}>
                <Text>Rp</Text>
                <Text
                  fontSize={32}
                  fontWeight={800}
                  textAlign={"center"}
                  lineHeight={1}
                >
                  250.000
                </Text>
              </HStack>
            </Box>

            <Box w={"40%"}>
              <FormControl>
                <HStack>
                  <Tooltip label={"Camera Scan"} hasArrow>
                    <IconButton
                      aria-label="cameraScan"
                      icon={<Icon as={Scan} fontSize={20} />}
                      className="btn-solid sm-clicky"
                      flexShrink={0}
                    />
                  </Tooltip>

                  <Box position={"relative"} w={"100%"}>
                    <Input
                      name={"indexProduct"}
                      placeholder="Index Product"
                      bg={"var(--divider)"}
                      border={"2px solid transparent !important"}
                      pr={"50px"}
                    />

                    <Box position={"absolute"} right={0} top={0}>
                      <SearchProductTab />
                    </Box>
                  </Box>
                </HStack>
              </FormControl>
            </Box>

            <HStack justify={"flex-end"}>
              <Tooltip label={"Chekout"} hasArrow>
                <IconButton
                  aria-label="checkoutButton"
                  colorScheme="ap"
                  className="clicky"
                  fontSize={15}
                  px={5}
                  icon={
                    <HStack>
                      <Icon as={ShoppingBagOpen} fontSize={24} color={"wt"} />
                      <Icon
                        as={ArrowElbowDownLeft}
                        fontSize={16}
                        weight="bold"
                        color={"wt"}
                      />
                    </HStack>
                  }
                />
              </Tooltip>
            </HStack>
          </HStack>
        )}
      </Container>

      <Container pt={3}>
        <Text fontSize={24} fontWeight={600}>
          Order
        </Text>
      </Container>
    </>
  );
}
