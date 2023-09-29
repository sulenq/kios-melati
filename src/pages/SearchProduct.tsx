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

export default function SearchProduct() {
  const { searchProduct, setSearchProduct } = useSearchProduct();
  const sw = useScreenWidth();

  return (
    <>
      <VStack borderBottom={"1px solid var(--divider2)"} py={2} px={2}>
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

      <Container>
        <Text opacity={0.5} mb={2}>
          Result
        </Text>
      </Container>

      <Box>
        <Container
          _hover={{ bg: "var(--divider)" }}
          cursor="pointer"
          borderRadius={sw > 1280 ? 8 : 0}
        >
          <SearchProductResult
            category="drink"
            name="Okky Jelly"
            code="88919317209"
            price={1500}
            stock={23}
          />
        </Container>

        <Container
          _hover={{ bg: "var(--divider)" }}
          cursor="pointer"
          borderRadius={sw > 1280 ? 8 : 0}
        >
          <SearchProductResult
            category="food"
            name="Indomie Goreng Jumbo"
            code="88211231209"
            price={3000}
            stock={40}
          />
        </Container>
      </Box>
    </>
  );
}
