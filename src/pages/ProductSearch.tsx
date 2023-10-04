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
import Container from "../components/Container";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import NavHeader from "../components/NavHeader";
import useProductSearch from "../globalState/useProductSearch";
import ProductSearchResult from "../components/ProductSearchResult";
import products, { Product } from "../const/products";
import { useState, useEffect, useRef } from "react";
import useOrder from "../globalState/useOrder";
import Page from "../components/Page";
import useScreenWidth from "../utils/useGetScreenWidth";

export default function ProductSearch() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      if (!inputRef.current.value) {
        inputRef.current.focus();
      }
    }
  }, []);

  const { productSearch, setProductSearch } = useProductSearch();
  useEffect(() => {
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        product.code.toLowerCase().includes(productSearch.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  }, [productSearch]);

  const [filteredProducts, setFilteredProducts] = useState<Product[] | []>([]);
  const { addOrder } = useOrder();
  const sw = useScreenWidth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        window.history.back();
      }
    };

    // Menambahkan event listener saat komponen dimuat
    window.addEventListener("keydown", handleKeyDown);

    // Menghapus event listener saat komponen dilepas
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Page>
      <VStack w={"100%"} borderBottom={"1px solid var(--divider)"} p={2}>
        <NavHeader
          title={"Cashiering - Product Search"}
          right={null}
          // backPath={"/cashier"}
        />
      </VStack>

      <Container>
        <HStack justify={"center"} py={'19px'}>
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
              pr={"36px !important"}
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
                onClick={() => {
                  inputRef.current?.focus();
                  setProductSearch("");
                }}
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
          opacity={0.2}
          justify={"flex-end"}
          p={4}
          animation={"fade-in-fade 1s"}
          maxW={"600px"}
        >
          <Image w={"100%"} src={"../img/search.png"} />
        </VStack>
      )}

      {productSearch !== "" && filteredProducts.length === 0 && (
        <VStack
          flex={1}
          opacity={0.2}
          justify={"space-between"}
          p={4}
          animation={"fade-in-fade 1s"}
          transition={"300ms"}
        >
          <Text fontWeight={500} fontSize={[17, null, 19]} mb={4}>
            No Result
          </Text>

          <Image w={"100%"} maxW={"600px"} src={"../img/noResult.png"} />
        </VStack>
      )}

      {productSearch !== "" && filteredProducts.length !== 0 && (
        <VStack
          w={"100%"}
          pb={"16px"}
          overflow={"auto"}
          flex={1}
          gap={0}
          // h={sw < 770 ? "calc(100% - 120.8px)" : "calc(100% - 128.67px)"}
        >
          <Container>
            <Text opacity={0.5} mb={1}>
              Result
            </Text>
          </Container>

          <Box w={"100%"}>
            {filteredProducts.map((p, i) => {
              return (
                <Container
                  key={i}
                  px={[0, null, 6]}
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
                    window.history.back();
                  }}
                >
                  <Box
                    cursor="pointer"
                    _hover={{ bg: "var(--divider)" }}
                    borderRadius={sw >= 770 ? 6 : ""}
                    px={[4, null, 2]}
                    py={2}
                  >
                    <ProductSearchResult
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
        </VStack>
      )}
    </Page>
  );
}
