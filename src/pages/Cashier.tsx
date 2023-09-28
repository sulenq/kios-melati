import {
  Box,
  Button,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Tooltip,
  VStack,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
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
} from "@phosphor-icons/react";
import { useScreenWidth } from "../utils";
import products from "../const/products";
import { useComponentsBg } from "../const/colorModeValues";
// import products from "../const/products";

export default function Cashier() {
  const sw = useScreenWidth();
  const cbg = useComponentsBg();

  const SearchProductTab = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <Tooltip label={"Open Seacrh Tab"} hasArrow>
          <IconButton
            onClick={onOpen}
            aria-label="indexProductButton"
            icon={<Icon as={MagnifyingGlass} fontSize={18} />}
            colorScheme="bnw"
            className="clicky"
            position={"absolute"}
            right={0}
            top={0}
            zIndex={2}
          />
        </Tooltip>

        <Modal
          size={"full"}
          isOpen={isOpen}
          onClose={onClose}
          scrollBehavior="inside"
        >
          <ModalContent>
            <ModalBody p={0}>
              <HStack
                py={2}
                px={3}
                position={"sticky"}
                top={0}
                left={0}
                zIndex={2}
                {...cbg}
                borderBottom={"1px solid var(--divider2)"}
              >
                <IconButton
                  aria-label="searchProductBackButton"
                  icon={<Icon as={ArrowLeft} fontSize={20} />}
                  className="btn sm-clicky"
                  variant={"ghost"}
                  onClick={onClose}
                />

                <Input
                  name={"indexProduct"}
                  placeholder="Index Product"
                  bg={"var(--divider)"}
                  border={"2px solid transparent !important"}
                  pr={"50px !important"}
                />
              </HStack>

              <Box
                px={[4, 6, 8]}
                h={"calc(100% - 117px)"}
                overflow={"auto"}
                borderRadius={12}
              >
                <Table>
                  <Thead>
                    <Tr opacity={0.5}>
                      <Th px={3} fontSize={10} pl={0}>
                        Name
                      </Th>
                      <Th px={3} fontSize={10} isNumeric>
                        Stock
                      </Th>
                      <Th px={3} fontSize={10} isNumeric>
                        Price
                      </Th>
                      <Th px={3} fontSize={10}>
                        Category
                      </Th>
                      <Th px={3} fontSize={10} pr={0}>
                        Code
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {products.map((p, i) => (
                      <Tr key={i}>
                        <Td px={3} py={3} fontSize={14} pl={0}>
                          <Text noOfLines={2}>{p.name}</Text>
                        </Td>

                        <Td px={3} py={3} opacity={0.5} isNumeric>
                          <Text>{p.stock}</Text>
                        </Td>

                        <Td px={3} py={3} isNumeric>
                          <Text>{p.price}</Text>
                        </Td>

                        <Td px={3} py={3} opacity={0.5}>
                          <Text>{p.category}</Text>
                        </Td>

                        <Td px={3} py={3} opacity={0.5} pr={0}>
                          <Text>{p.code}</Text>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
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

            <HStack w={"100%"} maxW={"400px"}>
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
                      pr={"50px !important"}
                    />

                    <SearchProductTab />
                  </Box>
                </HStack>
              </FormControl>

              <HStack justify={"flex-end"}>
                <IconButton
                  aria-label="checkoutButton"
                  colorScheme="bnw"
                  className="clicky"
                  fontSize={15}
                  px={5}
                  icon={
                    <Icon as={ArrowElbowDownLeft} fontSize={18} weight="bold" />
                  }
                />
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

                    <SearchProductTab />
                  </Box>
                </HStack>
              </FormControl>
            </Box>

            <HStack justify={"flex-end"}>
              <Button
                colorScheme="bnw"
                className="clicky"
                fontSize={15}
                px={6}
                rightIcon={
                  <Icon as={ArrowElbowDownLeft} fontSize={18} weight="bold" />
                }
              >
                CHECKOUT
              </Button>
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
