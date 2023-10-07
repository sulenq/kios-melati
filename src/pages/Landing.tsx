import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import Container from "../components/Container";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Landing() {
  const bg = useColorModeValue("#ffffffcc", "#050505cc");
  // const signInColor = useColorModeValue("bt", "wt");

  return (
    <VStack
      bgImage={"/img/grocery.jpg"}
      bgSize={"cover"}
      minH={"100vh"}
      justify={"center"}
    >
      <Container>
        <VStack
          gap={3}
          mx={"auto"}
          w={"100%"}
          maxW={"420px"}
          justify={"center"}
          borderRadius={6}
          p={5}
          bg={bg}
          backdropFilter={"blur(10px)"}
        >
          <ColorModeSwitcher
            position={"absolute"}
            borderRadius={"full"}
            h={"40px !important"}
            top={2}
            right={2}
          />

          <HStack gap={4} alignSelf={"flex-start"} mb={1}>
            <Image src={"./logo512.png"} w={"64px"} />

            <Box>
              <Text fontWeight={600} opacity={0.5}>
                Welcome to the
              </Text>
              <Text fontSize={24} fontWeight={800} lineHeight={1}>
                JASMINE KIOSK
              </Text>
            </Box>
          </HStack>

          <Button
            as={Link}
            to={"/signin"}
            className="clicky"
            colorScheme="ap"
            color={'wt'}
            w={"100%"}
            h={"44px"}
            borderRadius={"full"}
            // h={["40px", null, "50px"]}
          >
            SIGN IN
          </Button>

          <HStack gap={1}>
            <Text>Don't have an account?</Text>
            <Text
              fontSize={14}
              as={Link}
              to={"/signup"}
              fontWeight={600}
              color={"p.500"}
            >
              Sign Up
            </Text>
          </HStack>
        </VStack>
      </Container>

      <Container>
        <VStack w={"100%"} maxW={"420px"} mx={"auto"}>
          <Accordion allowMultiple mb={4} w={"100%"}>
            <AccordionItem
              border={"none"}
              bg={bg}
              backdropFilter={"blur(10px)"}
              borderRadius={6}
            >
              <AccordionButton h={"40px !important"} borderRadius={6}>
                <Text
                  flex="1"
                  fontWeight={600}
                  // fontSize={15}
                  color={"p.500"}
                  textAlign={"left"}
                >
                  Demo Account
                </Text>

                <AccordionIcon opacity={0.5} />
              </AccordionButton>

              <AccordionPanel px={4} pt={2} pb={4}>
                <HStack justify={"space-between"}>
                  <SimpleGrid columns={[1, null, 2]} gap={2}>
                    <Box>
                      <Text fontWeight={500} mb={1}>
                        Admin Sign in
                      </Text>

                      <HStack>
                        <Text fontSize={11} opacity={0.5}>
                          username :
                        </Text>
                        <Text fontSize={11}>admin</Text>
                      </HStack>
                      <HStack>
                        <Text fontSize={11} opacity={0.5}>
                          password :
                        </Text>
                        <Text fontSize={11}>admin</Text>
                      </HStack>
                    </Box>

                    <Box>
                      <Text fontWeight={500} mb={1}>
                        Cashier Sign in
                      </Text>
                      <HStack>
                        <Text opacity={0.5} fontSize={11}>
                          username :
                        </Text>
                        <Text fontSize={11}>cashier</Text>
                      </HStack>
                      <HStack>
                        <Text fontSize={11} opacity={0.5}>
                          password :
                        </Text>
                        <Text fontSize={11}>cashier</Text>
                      </HStack>
                    </Box>
                  </SimpleGrid>

                  <Image src="/img/profile.png" w={"140px"} />
                </HStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </VStack>
      </Container>
    </VStack>
  );
}
