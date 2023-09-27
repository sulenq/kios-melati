import {
  Box,
  Button,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  // Table,
  // Tbody,
  // Td,
  // Th,
  // Thead,
  // Tr,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import CashierNav from "../components/CashierNav";
import Page from "../components/Page";
import NavHeader from "../components/NavHeader";
import {
  Scan,
  ArrowElbowDownLeft,
  Plus,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { useScreenWidth } from "../utils";
// import products from "../const/products";

export default function Cashier() {
  const sw = useScreenWidth();

  // const productsTable = () => (
  //   <Box
  //     h={"calc(100% - 117px)"}
  //     overflow={"auto"}
  //     bg={componentsBg}
  //     borderRadius={12}
  //   >
  //     <Table>
  //       <Thead>
  //         <Tr opacity={0.5}>
  //           <Th px={3} fontSize={10}>
  //             Name
  //           </Th>
  //           <Th px={3} fontSize={10} isNumeric>
  //             Stock
  //           </Th>
  //           <Th px={3} fontSize={10} isNumeric>
  //             Price
  //           </Th>
  //           <Th px={3} fontSize={10}>
  //             Category
  //           </Th>
  //           <Th px={3} fontSize={10}>
  //             Code
  //           </Th>
  //         </Tr>
  //       </Thead>
  //       <Tbody>
  //         {products.map((p, i) => (
  //           <Tr key={i}>
  //             <Td px={3} py={3} fontSize={14}>
  //               <Text noOfLines={1}>{p.name}</Text>
  //             </Td>

  //             <Td px={3} py={3} opacity={0.5} isNumeric>
  //               {p.stock}
  //             </Td>

  //             <Td px={3} py={3} isNumeric>
  //               {p.price}
  //             </Td>

  //             <Td px={3} py={3} opacity={0.5}>
  //               {p.category}
  //             </Td>

  //             <Td px={3} py={3} opacity={0.5}>
  //               {p.code}
  //             </Td>
  //           </Tr>
  //         ))}
  //       </Tbody>
  //     </Table>
  //   </Box>
  // );

  return (
    <>
      <VStack
        px={[3, null, 5]}
        borderBottom={"1px solid var(--divider)"}
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

      <Page>
        <CashierNav />

        {sw < 770 ? (
          <VStack
            gap={4}
            py={3}
            justify={"space-between"}
            // borderBottom={"2px solid var(--divider)"}
          >
            <HStack
              w={"100%"}
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

            <HStack>
              <Box>
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

                      <IconButton
                        aria-label="indexProductButton"
                        icon={<Icon as={MagnifyingGlass} fontSize={18} />}
                        colorScheme="bnw"
                        className="clicky"
                        position={"absolute"}
                        right={0}
                        top={0}
                        zIndex={2}
                      />
                    </Box>
                  </HStack>
                </FormControl>
              </Box>

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

                    <IconButton
                      aria-label="indexProductButton"
                      icon={<Icon as={MagnifyingGlass} fontSize={18} />}
                      colorScheme="bnw"
                      className="clicky"
                      position={"absolute"}
                      right={0}
                      top={0}
                      zIndex={2}
                    />
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
      </Page>
    </>
  );
}
