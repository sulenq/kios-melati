import {
  Box,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import CashierNav from "../components/CashierNav";
import Container from "../components/Container";
import NavHeader from "../components/NavHeader";
import {
  Scan,
  ArrowElbowDownLeft,
  Plus,
  MagnifyingGlass,
  ShoppingBagOpen,
} from "@phosphor-icons/react";

import { Link } from "react-router-dom";
import useProductSearch from "../globalState/useProductSearch";
import useScreenWidth from "../utils/useGetScreenWidth";
import useOrder from "../globalState/useOrder";
import { useRef, useEffect } from "react";
import OrderItem from "../components/OrderItem";
import useFormatNumber from "../utils/useFormatNumber";

export default function Cashier() {
  const sw = useScreenWidth();
  const fn = useFormatNumber;
  const { productSearch, setProductSearch } = useProductSearch();
  const { order, resetOrder } = useOrder();
  const searchProductButton = useRef(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Box h={"100vh"}>
      <VStack borderBottom={"1px solid var(--divider)"} p={2}>
        <NavHeader
          title={"Cashiering"}
          left={null}
          right={
            <Tooltip
              openDelay={1000}
              label={"New Transaction"}
              hasArrow
              placement="left"
            >
              <IconButton
                aria-label="newTransaction"
                className="btn sm-clicky"
                variant={"ghost"}
                icon={<Icon as={Plus} fontSize={18} weight="bold" />}
                onClick={resetOrder}
              />
            </Tooltip>
          }
        />
      </VStack>

      <Container>
        <CashierNav />

        {sw < 770 ? (
          <VStack gap={3} py={3} justify={"space-between"}>
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
                  {fn(order.total) || 0}
                </Text>
              </HStack>
            </HStack>

            <HStack gap={1} w={"100%"} maxW={"400px"}>
              <HStack gap={1}>
                <Tooltip openDelay={1000} label={"Camera Scan"} hasArrow>
                  <IconButton
                    aria-label="cameraScan"
                    icon={<Icon as={Scan} fontSize={20} />}
                    className="btn-solid sm-clicky"
                    flexShrink={0}
                  />
                </Tooltip>

                <Box position={"relative"} w={"100%"}>
                  <form>
                    <Input
                      ref={inputRef}
                      name={"indexProduct"}
                      placeholder="Index Product"
                      bg={"var(--divider)"}
                      border={"2px solid transparent !important"}
                      pr={"50px !important"}
                      value={productSearch}
                      onChange={(e) => {
                        setProductSearch(e.target.value);
                      }}
                      onFocus={() => {
                        inputRef.current?.select();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (searchProductButton.current) {
                            (
                              searchProductButton.current as HTMLElement
                            ).click();
                          }
                        }
                      }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (searchProductButton.current) {
                          (searchProductButton.current as HTMLElement).click();
                        }
                      }}
                    />

                    <Box position={"absolute"} right={0} top={0}>
                      <Tooltip
                        openDelay={1000}
                        label={"Open Seacrh Tab"}
                        hasArrow
                      >
                        <IconButton
                          ref={searchProductButton}
                          as={Link}
                          to={"/search-product"}
                          h={"36px"}
                          aria-label="indexProductButton"
                          icon={<Icon as={MagnifyingGlass} fontSize={18} />}
                          // colorScheme="bnw"
                          className="btn-solid clicky"
                          zIndex={2}
                        />
                      </Tooltip>
                    </Box>
                  </form>
                </Box>
              </HStack>

              <HStack justify={"flex-end"}>
                <Tooltip openDelay={1000} label={"Chekout"} hasArrow>
                  <Link to={"/checkout"}>
                    <IconButton
                      isDisabled={order.orderList.length === 0 ? true : false}
                      aria-label="checkoutButton"
                      colorScheme="ap"
                      className="clicky"
                      fontSize={15}
                      px={5}
                      icon={
                        <HStack>
                          <Icon
                            as={ShoppingBagOpen}
                            fontSize={24}
                            color={"wt"}
                          />
                          <Icon
                            as={ArrowElbowDownLeft}
                            fontSize={16}
                            weight="bold"
                            color={"wt"}
                          />
                        </HStack>
                      }
                    />
                  </Link>
                </Tooltip>
              </HStack>
            </HStack>
          </VStack>
        ) : (
          <HStack
            gap={4}
            py={3}
            justify={"space-between"}
            // borderBottom={"2px solid var(--divider)"}
          >
            <Box w={"30%"}>
              <Text opacity={0.5}>Total</Text>

              <HStack align={"flex-end"}>
                <Text>Rp</Text>
                <Text
                  fontSize={32}
                  fontWeight={800}
                  textAlign={"center"}
                  lineHeight={1}
                >
                  {fn(order.total) || 0}
                </Text>
              </HStack>
            </Box>

            <HStack w={"40%"}>
              <Tooltip openDelay={1000} label={"Camera Scan"} hasArrow>
                <IconButton
                  aria-label="cameraScan"
                  icon={<Icon as={Scan} fontSize={20} />}
                  className="btn-solid sm-clicky"
                  flexShrink={0}
                />
              </Tooltip>

              <Box position={"relative"} w={"100%"}>
                <form>
                  <Input
                    ref={inputRef}
                    name={"indexProduct"}
                    placeholder="Index Product"
                    bg={"var(--divider)"}
                    border={"2px solid transparent !important"}
                    pr={"50px"}
                    value={productSearch}
                    onChange={(e) => {
                      setProductSearch(e.target.value);
                    }}
                    onFocus={() => {
                      inputRef.current?.select();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (searchProductButton.current) {
                          (searchProductButton.current as HTMLElement).click();
                        }
                      }
                    }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (searchProductButton.current) {
                        (searchProductButton.current as HTMLElement).click();
                      }
                    }}
                  />

                  <Box position={"absolute"} right={0} top={0}>
                    <Tooltip
                      openDelay={1000}
                      label={"Open Seacrh Tab"}
                      hasArrow
                    >
                      <IconButton
                        ref={searchProductButton}
                        as={Link}
                        to={"/search-product"}
                        aria-label="indexProductButton"
                        icon={<Icon as={MagnifyingGlass} fontSize={18} />}
                        className="btn-solid clicky"
                        zIndex={2}
                      />
                    </Tooltip>
                  </Box>
                </form>
              </Box>
            </HStack>

            <HStack w={"30%"} justify={"flex-end"}>
              <Tooltip openDelay={1000} label={"Chekout"} hasArrow>
                <Link to={"/checkout"}>
                  <IconButton
                    isDisabled={order.orderList.length === 0 ? true : false}
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
                </Link>
              </Tooltip>
            </HStack>
          </HStack>
        )}
      </Container>

      {order.orderList.length === 0 && (
        <VStack
          opacity={0.3}
          justify={"center"}
          p={4}
          pb={"80px"}
          minH={"400px"}
          overflow={"auto"}
          h={sw < 770 ? "calc(100% - 159px)" : "calc(100% - 136px)"}
          position={"relative"}
          animation={"fade-in-fade 1s"}
        >
          <Image
            bottom={"0"}
            position={"absolute"}
            w={"100%"}
            maxW={"400px"}
            src={"../img/cashier.png"}
          />
        </VStack>
      )}

      {order.orderList.length !== 0 && (
        <Box
          pb={"72px"}
          overflow={"auto"}
          h={sw < 770 ? "calc(100% - 159px)" : "calc(100% - 136px)"}
        >
          <Container>
            <Text fontSize={24} fontWeight={600} mb={2}>
              Orders
            </Text>
          </Container>

          {order.orderList
            .slice()
            .reverse()
            .map((o, i) => (
              <Container>
                <Box
                  borderRadius={6}
                  p={2}
                  mb={2}
                  _hover={{ bg: "var(--divider)" }}
                  // w={"100%"}
                  // maxW={"700px"}
                  // mx={"auto"}
                >
                  <OrderItem key={i} order={o} />
                </Box>
              </Container>
            ))}
        </Box>
      )}
    </Box>
  );
}
