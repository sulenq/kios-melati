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
import { useState, useEffect } from "react";

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
  const { searchProduct, setSearchProduct } = useSearchProduct();
  const [filteredProducts, setFilteredProducts] = useState<Product[] | []>([]);

  useEffect(() => {
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchProduct.toLowerCase()) ||
        product.code.toLowerCase().includes(searchProduct.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  }, [searchProduct]);

  return (
    <Box h={"100vh"}>
      <VStack borderBottom={"1px solid var(--divider2)"} p={2}>
        <HeaderContainer>
          <NavHeader title={"Search Product"} right={null} />
        </HeaderContainer>
      </VStack>

      <Container>
        <HStack justify={"center"} py={4}>
          <InputGroup maxW={"500px"}>
            <InputLeftElement pointerEvents="none">
              <Icon as={MagnifyingGlass} fontSize={18} mb={[1, null, 0]} />
            </InputLeftElement>

            <Input
              name={"indexProduct"}
              placeholder="Search Product"
              bg={"var(--divider)"}
              border={"2px solid transparent !important"}
              pl={"40px !important"}
              value={searchProduct}
              onChange={(e) => {
                setSearchProduct(e.target.value);
              }}
            />
          </InputGroup>
        </HStack>
      </Container>

      {searchProduct !== "" && (
        <>
          <Container>
            <Text opacity={0.5} mb={2}>
              Result
            </Text>
          </Container>

          <Box
            overflow={"auto"}
            h={sw < 770 ? "calc(100% - 148.3px)" : "calc(100% - 160px)"}
          >
            {filteredProducts.map((p, i) => {
              return (
                <Container
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
        </>
      )}
    </Box>
  );
}
