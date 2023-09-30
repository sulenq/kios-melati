import {
  Box,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import HeaderContainer from "../components/HeaderContainer";
import Container from "../components/Container";
import { MagnifyingGlass } from "@phosphor-icons/react";
import NavHeader from "../components/NavHeader";
import useSearchProduct from "../globalState/useSearchProduct";
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
  const { searchProduct, setSearchProduct } = useSearchProduct();
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      if (!inputRef.current.value) {
        inputRef.current.focus();
      }
    }
  }, []);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | []>([]);
  const { setOrder } = useOrder();
  const handleAddOrder = (p: any) => {
    setOrder({
      id: p.id,
      code: p.code,
      name: p.name,
      price: p.price,
      qty: 1,
      totalPrice: p.price,
      stock: p.stock,
      category: p.category,
    });
  };

  useEffect(() => {
    let filterProductDelay = setTimeout(() => {
      const filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchProduct.toLowerCase()) ||
          product.code.toLowerCase().includes(searchProduct.toLowerCase())
      );
      setFilteredProducts(filteredProducts);
    }, 200);

    return () => {
      clearTimeout(filterProductDelay);
    };
  }, [searchProduct]);

  return (
    <Box h={"100vh"}>
      <VStack borderBottom={"1px solid var(--divider)"} p={2}>
        <HeaderContainer>
          <NavHeader title={"Search Product (Cashiering)"} right={null} />
        </HeaderContainer>
      </VStack>

      <Container>
        <HStack justify={"center"} py={4}>
          <InputGroup maxW={"420px"}>
            <InputLeftElement pointerEvents="none">
              <Icon as={MagnifyingGlass} fontSize={18} mb={[1, null, 0]} />
            </InputLeftElement>

            <Input
              ref={inputRef}
              name={"indexProduct"}
              placeholder="Search Product"
              bg={"var(--divider)"}
              border={"2px solid transparent !important"}
              pl={"40px !important"}
              value={searchProduct}
              onChange={(e) => {
                setSearchProduct(e.target.value);
              }}
              onFocus={() => {
                inputRef.current?.select();
              }}
            />
          </InputGroup>
        </HStack>
      </Container>

      {searchProduct !== "" && (
        <Box
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
                  onClick={() => {
                    handleAddOrder(p);
                    setSearchProduct("");
                    navigate("/cashier");
                  }}
                  key={i}
                  _hover={{ bg: "var(--divider)" }}
                  cursor="pointer"
                  borderRadius={sw > 1280 ? 8 : 0}
                >
                  <SearchProductResult
                    category={p?.category}
                    name={p?.name}
                    code={p?.code}
                    price={p?.price}
                    stock={p?.stock}
                  />
                </Container>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}
