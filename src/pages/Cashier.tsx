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
import Container from "../components/Container";
import {
  Scan,
  Plus,
  MagnifyingGlass,
  X,
  ArrowRight,
  ShoppingCartSimple,
} from "@phosphor-icons/react";

import { Link, useNavigate } from "react-router-dom";
import useProductSearch from "../globalState/useProductSearch";
import useScreenWidth from "../utils/useGetScreenWidth";
import useOrder from "../globalState/useOrder";
import { useRef, useEffect } from "react";
import OrderItem from "../components/OrderItem";
import useFormatNumber from "../utils/useFormatNumber";
import products from "../const/products";
import PageWithMainNav from "../components/PageWithMainNav";
import { useComponentsBg } from "../const/colorModeValues";

export default function Cashier() {
  const sw = useScreenWidth();
  const fn = useFormatNumber;
  const { productSearch, setProductSearch } = useProductSearch();
  const { addOrder, orderList, resetOrder, totalPayment } = useOrder();
  const searchProductButton = useRef(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cbg = useComponentsBg();
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleEndKey = (e: KeyboardEvent) => {
      if (e.key === "End") {
        navigate("/checkout");
      } else if (e.key === "Home") {
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEndKey);

    return () => {
      document.removeEventListener("keydown", handleEndKey);
    };
  }, [navigate]);

  const handleIndexProductKeydown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchProductButton.current) {
        const productFound = products.find((p) => p.code === productSearch);

        if (productFound) {
          setProductSearch("");
          addOrder({
            id: productFound.id,
            code: productFound.code,
            name: productFound.name,
            price: productFound.price,
            qty: 1,
            totalPrice: productFound.price,
            stock: productFound.stock,
            category: productFound.category,
          });
        } else {
          (searchProductButton.current as HTMLElement).click();
        }
      }
    }
  };

  const handleIndexProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductSearch(e.target.value);
  };

  const handleClearIndexProduct = () => {
    inputRef.current?.focus();
    setProductSearch("");
  };

  return (
    <PageWithMainNav
      title="Cashiering"
      headerRight={
        <Tooltip
          openDelay={500}
          label={"New Transaction"}
          hasArrow
          placement="left"
        >
          <IconButton
            aria-label="newTransaction"
            className="btn sm-clicky"
            variant={"ghost"}
            borderRadius={"full"}
            h={"40px !important"}
            icon={<Icon as={Plus} fontSize={18} />}
            onClick={resetOrder}
          />
        </Tooltip>
      }
    >
      <Container zIndex={3} position={"sticky"} top={"56.8px"} {...cbg}>
        {sw < 770 ? (
          <VStack gap={3} mt={4} mb={2} justify={"space-between"}>
            <HStack
              w={"100%"}
              gap={1}
              mb={1}
              align={"flex-start"}
              justify={"space-between"}
            >
              <Text opacity={0.5}>Total Payment</Text>

              <HStack align={"flex-end"}>
                <Text>Rp</Text>
                <Text
                  fontSize={32}
                  fontWeight={800}
                  textAlign={"center"}
                  lineHeight={1}
                >
                  {fn(totalPayment) || 0}
                </Text>
              </HStack>
            </HStack>

            <HStack gap={1} w={"100%"}>
              <Tooltip openDelay={500} label={"Camera Scan"} hasArrow>
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
                    pr={"80px !important"}
                    pl={"12px !important"}
                    value={productSearch}
                    onChange={handleIndexProduct}
                    onKeyDown={handleIndexProductKeydown}
                    variant={"filled"}
                  />

                  <HStack gap={"2px"} position={"absolute"} right={0} top={0}>
                    {productSearch && (
                      <IconButton
                        onClick={handleClearIndexProduct}
                        _hover={{ bg: "transparent !important" }}
                        _active={{ bg: "transparent !Important" }}
                        zIndex={2}
                        variant={"ghost"}
                        className="sm-clicky"
                        aria-label="clearSearchButton"
                        icon={<Icon as={X} fontSize={16} />}
                      />
                    )}

                    <Tooltip openDelay={500} label={"Open Seacrh Tab"} hasArrow>
                      <IconButton
                        ref={searchProductButton}
                        as={Link}
                        to={"/product-search"}
                        aria-label="indexProductButton"
                        icon={<Icon as={MagnifyingGlass} fontSize={18} />}
                        // colorScheme="bnw"
                        className="btn-solid sm-clicky"
                        zIndex={2}
                      />
                    </Tooltip>
                  </HStack>
                </form>
              </Box>

              <Tooltip openDelay={500} label={"Chekout"} hasArrow>
                <Link to={"/checkout"}>
                  <IconButton
                    isDisabled={orderList.length === 0 ? true : false}
                    aria-label="checkoutButton"
                    colorScheme="ap"
                    className="clicky"
                    fontSize={15}
                    px={5}
                    icon={
                      <HStack gap={1}>
                        <Icon
                          as={ShoppingCartSimple}
                          fontSize={22}
                          color={"wt"}
                          weight="fill"
                        />
                        <Icon
                          as={ArrowRight}
                          fontSize={18}
                          weight="bold"
                          color={"wt"}
                        />
                      </HStack>
                    }
                  />
                </Link>
              </Tooltip>
            </HStack>
          </VStack>
        ) : (
          <HStack gap={4} mt={3} mb={2} justify={"space-between"}>
            <Box w={"25%"}>
              <Text opacity={0.5} mb={1} fontSize={11}>
                Total Payment
              </Text>

              <HStack align={"flex-end"}>
                <Text>Rp</Text>
                <Text
                  fontSize={32}
                  fontWeight={800}
                  textAlign={"center"}
                  lineHeight={1}
                >
                  {fn(totalPayment) || 0}
                </Text>
              </HStack>
            </Box>

            <HStack w={"50%"}>
              <Tooltip openDelay={500} label={"Camera Scan"} hasArrow>
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
                    pr={"80px"}
                    value={productSearch}
                    onChange={handleIndexProduct}
                    onKeyDown={handleIndexProductKeydown}
                  />

                  <Box position={"absolute"} right={0} top={0}>
                    {productSearch && (
                      <IconButton
                        onClick={handleClearIndexProduct}
                        _hover={{ bg: "transparent !important" }}
                        _active={{ bg: "transparent !Important" }}
                        zIndex={2}
                        variant={"ghost"}
                        className="sm-clicky"
                        aria-label="clearSearchButton"
                        icon={<Icon as={X} fontSize={16} />}
                      />
                    )}

                    <Tooltip openDelay={500} label={"Open Seacrh Tab"} hasArrow>
                      <IconButton
                        ref={searchProductButton}
                        as={Link}
                        to={"/product-search"}
                        aria-label="indexProductButton"
                        icon={<Icon as={MagnifyingGlass} fontSize={18} />}
                        className="btn-solid sm-clicky"
                        zIndex={2}
                      />
                    </Tooltip>
                  </Box>
                </form>
              </Box>
            </HStack>

            <HStack w={"25%"} justify={"flex-end"}>
              <Tooltip openDelay={500} label={"Chekout"} hasArrow>
                <Link to={"/checkout"}>
                  <IconButton
                    isDisabled={orderList.length === 0 ? true : false}
                    aria-label="checkoutButton"
                    colorScheme="ap"
                    className="clicky"
                    fontSize={15}
                    px={5}
                    icon={
                      <HStack gap={1}>
                        <Icon
                          as={ShoppingCartSimple}
                          fontSize={22}
                          color={"wt"}
                          weight="fill"
                        />
                        <Icon
                          as={ArrowRight}
                          fontSize={18}
                          color={"wt"}
                          weight="bold"
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

      {orderList.length === 0 && (
        <VStack
          flex={1}
          w={"100%"}
          maxW={"600px"}
          p={4}
          opacity={0.2}
          mx={"auto"}
          justify={"flex-end"}
          // h={sw < 770 ? "calc(100% - 170px)" : "calc(100% - 136px)"}
        >
          <Image src={"/img/cashier.png"} />
        </VStack>
      )}

      {orderList.length !== 0 && (
        <VStack
          w={"100%"}
          overflow={"auto"}
          flex={1}
          gap={0}
          pb={sw < 770 ? "72px" : ""}
          // h={sw < 770 ? "calc(100% - 161px)" : "calc(100% - 136px)"}
        >
          <Container>
            <HStack w={"100%"} mb={2} justify={"space-between"}>
              <Text fontSize={15} fontWeight={600}>
                Order
              </Text>

              <Text fontSize={15} fontWeight={600}>
                {`Total : ${orderList.length}`}
              </Text>
            </HStack>
          </Container>

          {orderList
            .slice()
            .reverse()
            .map((o, i) => (
              <Container key={i} px={"0"}>
                <Box
                  px={[4, 6, 8]}
                  py={2}
                  mb={2}
                  _hover={{ bg: "var(--divider)" }}
                >
                  <OrderItem order={o} />
                </Box>
              </Container>
            ))}
        </VStack>
      )}
    </PageWithMainNav>
  );
}
