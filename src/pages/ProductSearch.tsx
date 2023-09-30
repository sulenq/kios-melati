import {
  Box,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import HeaderContainer from "../components/HeaderContainer";
import Container from "../components/Container";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import NavHeader from "../components/NavHeader";
import useProductSearch from "../globalState/useProductSearch";
import SearchProductResult from "../components/SearchProductResult";
import useScreenWidth from "../utils/useGetScreenWidth";
import products from "../const/products";
import { useState, useEffect, useRef } from "react";
import useOrder from "../globalState/useOrder";
import { useNavigate } from "react-router-dom";

export default function SearchProduct() {
  type Product = {
    id: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    code: string;
    name: string;
    price: number;
    stock: number;
    user_id: number;
    modal: number;
    category: string;
    color: string;
  };

  const sw = useScreenWidth();
  const navigate = useNavigate();
  const { productSearch, setProductSearch, resetProductSearch } =
    useProductSearch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      if (!inputRef.current.value) {
        inputRef.current.focus();
      }
    }
  }, []);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | []>([]);
  const { addOrder } = useOrder();

  useEffect(() => {
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        product.code.toLowerCase().includes(productSearch.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  }, [productSearch]);

  return (
    <VStack h={"100vh"}>
      <VStack w={"100%"} borderBottom={"1px solid var(--divider)"} p={2}>
        <HeaderContainer>
          <NavHeader title={"Cashiering - Product Search"} right={null} />
        </HeaderContainer>
      </VStack>

      <Container>
        <HStack justify={"center"} py={3}>
          <InputGroup maxW={"473px"} position={"relative"}>
            <InputLeftElement pointerEvents="none">
              <Icon as={MagnifyingGlass} fontSize={18} mb={[1, null, 0]} />
            </InputLeftElement>

            <Input
              ref={inputRef}
              name={"indexProduct"}
              placeholder="Product search"
              bg={"var(--divider)"}
              border={"2px solid transparent !important"}
              pl={"40px !important"}
              value={productSearch}
              onChange={(e) => {
                setProductSearch(e.target.value);
              }}
            />

            {productSearch && (
              <IconButton
                position={"absolute"}
                right={0}
                top={0}
                onClick={resetProductSearch}
                _hover={{ bg: "transparent !important" }}
                _active={{ bg: "transparent !Important" }}
                zIndex={2}
                variant={"ghost"}
                className="sm-clicky"
                aria-label="clearSearchButton"
                icon={<Icon as={X} fontSize={16} />}
              />
            )}
          </InputGroup>
        </HStack>
      </Container>

      {productSearch === "" && (
        <VStack
          flex={1}
          opacity={0.3}
          justify={"flex-end"}
          p={4}
          animation={"fade-in-fade 1s"}
        >
          <Image w={"100%"} maxW={"400px"} src={"../img/search.png"} />
        </VStack>
      )}

      {productSearch !== "" && filteredProducts.length === 0 && (
        <VStack
          flex={1}
          opacity={0.3}
          justify={"space-between"}
          p={4}
          animation={"fade-in-fade 1s"}
          transition={"300ms"}
        >
          <Text fontWeight={500} fontSize={[17, null, 19]} mb={4}>
            No Result
          </Text>

          <Image w={"100%"} maxW={"400px"} src={"../img/noResult.png"} />
        </VStack>
      )}

      {productSearch !== "" && filteredProducts.length !== 0 && (
        <Box
          w={"100%"}
          pb={"16px"}
          overflow={"auto"}
          h={sw < 770 ? "calc(100% - 120.8px)" : "calc(100% - 128.67px)"}
        >
          <Container>
            <Text opacity={0.5} mb={1}>
              Result
            </Text>
          </Container>

          <Box>
            {filteredProducts.map((p, i) => {
              return (
                <Container
                  px={[2, 4, 6]}
                  onClick={() => {
                    addOrder({
                      id: p.id,
                      code: p.code,
                      name: p.name,
                      price: p.price,
                      qty: 1,
                      totalPrice: p.price,
                      stock: p.stock,
                      category: p.category,
                    });
                    setProductSearch("");
                    navigate("/cashier");
                  }}
                  key={i}
                >
                  <Box
                    cursor="pointer"
                    _hover={{ bg: "var(--divider)" }}
                    borderRadius={6}
                    p={2}
                  >
                    <SearchProductResult
                      category={p?.category}
                      name={p?.name}
                      code={p?.code}
                      price={p?.price}
                      stock={p?.stock}
                    />
                  </Box>
                </Container>
              );
            })}
          </Box>
        </Box>
      )}
    </VStack>
  );
}
