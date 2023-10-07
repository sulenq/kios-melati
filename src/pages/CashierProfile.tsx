import { useState, useEffect } from "react";
import {
  Badge,
  Box,
  Button,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import CashierNav from "../components/CashierNav";
import Page from "../components/Page";
import NavHeader from "../components/NavHeader";
import Container from "../components/Container";
import { getCookie, removeCookie } from "typescript-cookie";
import { useNavigate } from "react-router-dom";
import useScreenWidth from "../utils/useGetScreenWidth";

export type typeCashierProfile = {
  idPublic: number;
  username: string;
  role: "cashier";
  name: string;
  age: number;
  phone: string;
  gender: "Male" | "Female";
  address: string;
  status: boolean;
  storeName: string;
};

export default function CashierProfile() {
  const [profile, setProfile] = useState<typeCashierProfile>();
  useEffect(() => {
    const pc = getCookie("authState");
    if (pc) {
      const profileData: typeCashierProfile = JSON.parse(pc);
      setProfile(profileData);
    }
  }, []);

  const navigate = useNavigate();
  const sw = useScreenWidth();

  const profileData = [
    { key: "ID", value: profile?.idPublic },
    { key: "Store Name", value: profile?.storeName },
    { key: "Role", value: profile?.role },
    { key: "Username", value: profile?.username },
    { key: "Name", value: profile?.name },
  ];
  const profileData2 = [
    { key: "Age", value: profile?.age },
    { key: "Gender", value: profile?.gender },
    { key: "Address", value: profile?.address },
    { key: "Phone", value: profile?.phone },
    { key: "Status", value: profile?.status },
  ];

  const handleSignOut = () => {
    removeCookie("authState");
    removeCookie("token");
    navigate("/");
  };

  const SignoutModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <Button
          onClick={onOpen}
          w={"200px"}
          // maxW={"300px"}
          colorScheme="bnw"
          className="clicky"
          borderRadius={"full"}
          h={"44px !important"}
        >
          SIGN OUT
        </Button>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay backdropFilter={"blur(10px)"} bg={"var(--divider)"} />

          <ModalContent>
            <ModalHeader px={4} py={3} pt={4}>
              Signing Out
            </ModalHeader>
            <ModalBody px={4}>
              <Text>Finish working, wanna sign out?</Text>
            </ModalBody>
            <ModalFooter>
              <HStack w={"100%"}>
                <Button
                  w={"50%"}
                  colorScheme="bnw"
                  className="clicky"
                  onClick={onClose}
                >
                  CANCEL
                </Button>
                <Button
                  className="btn clicky"
                  variant={"ghost"}
                  w={"50%"}
                  onClick={handleSignOut}
                >
                  SIGN OUT
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

  return (
    <Page>
      <CashierNav />

      <VStack w={"100%"} borderBottom={"1px solid var(--divider)"} p={2}>
        <NavHeader title={"Cashier Profile"} left={null} right={null} />
      </VStack>

      <VStack
        w={"100%"}
        position={"relative"}
        pb={"72px"}
        flex={1}
        overflow={"auto"}
      >
        <Container justify={"center"}>
          <SimpleGrid
            my={5}
            mx={"auto"}
            w={"100%"}
            columns={[1, null, 1]}
            gap={6}
            maxW={"680px"}
          >
            <VStack>
              <Center
                borderRadius={6}
                flexDir={"column"}
                w={"100%"}
                minH={"500px"}
                h={"100%"}
                // bg={"var(--divider)"}
              >
                <Box
                  borderRadius={"full"}
                  overflow={"hidden"}
                  w={"300px"}
                  h={"300px"}
                  bgImage={"/img/users/cashier.jpg"}
                  bgPos={"center top"}
                  bgSize={"cover"}
                  mb={4}
                />

                <Text fontSize={19} fontWeight={600} mb={1}>
                  {profile?.name}
                </Text>

                <Badge fontSize={13} colorScheme="yellow" mb={4}>
                  {profile?.role}
                </Badge>

                <SignoutModal />
              </Center>
            </VStack>

            <VStack align={"flex-start"} justify={"center"} gap={4}>
              <Text fontWeight={700} fontSize={23}>
                Account Details
              </Text>

              <SimpleGrid
                w={"100%"}
                gap={sw < 770 ? 0 : 6}
                columns={[1, null, 2]}
              >
                <Box w={"100%"}>
                  {profileData.map((p, i) => (
                    <HStack key={i} mb={3} w={"100%"}>
                      <Text w={"100%"} maxW={"100px"} flexShrink={0}>
                        {p.key}
                      </Text>

                      <Box className="inputlike">
                        <Text>{p.value || "No Data"}</Text>
                      </Box>
                    </HStack>
                  ))}
                </Box>

                <Box w={"100%"}>
                  {profileData2.map((p, i) => (
                    <HStack key={i} mb={3} w={"100%"}>
                      <Text w={"100%"} maxW={"100px"} flexShrink={0}>
                        {p.key}
                      </Text>

                      <Box className="inputlike">
                        <Text>{p.value || "No Data"}</Text>
                      </Box>
                    </HStack>
                  ))}
                </Box>
              </SimpleGrid>
            </VStack>
          </SimpleGrid>
        </Container>
      </VStack>
    </Page>
  );
}
