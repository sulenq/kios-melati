import { useState, useEffect } from "react";
import {
  Badge,
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Container from "../components/Container";
import { getCookie, removeCookie } from "typescript-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import useScreenWidth from "../utils/useGetScreenWidth";
import PageWithMainNav from "../components/PageWithMainNav";
import {
  GenderIntersex,
  Hash,
  IdentificationBadge,
  IdentificationCard,
  MapPin,
  PersonSimple,
  Phone,
  Pulse,
  Storefront,
  User,
} from "@phosphor-icons/react";

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

  const navigate = useNavigate();
  const location = useLocation();
  const sw = useScreenWidth();

  const profileData = [
    { key: "ID", icon: IdentificationBadge, value: profile?.idPublic },
    { key: "Store Name", icon: Storefront, value: profile?.storeName },
    { key: "Role", icon: PersonSimple, value: profile?.role },
    { key: "Username", icon: User, value: profile?.username },
    { key: "Name", icon: IdentificationCard, value: profile?.name },
  ];
  const profileData2 = [
    { key: "Age", icon: Hash, value: profile?.age },
    { key: "Gender", icon: GenderIntersex, value: profile?.gender },
    { key: "Address", icon: MapPin, value: profile?.address },
    { key: "Phone", icon: Phone, value: profile?.phone },
    {
      key: "Status",
      icon: Pulse,
      value: profile?.status ? "Active" : "Not Active",
    },
  ];

  useEffect(() => {
    const pc = getCookie("authState");
    if (pc) {
      const profileData: typeCashierProfile = JSON.parse(pc);
      setProfile(profileData);
    }
  }, []);

  const handleSignOut = () => {
    removeCookie("authState");
    removeCookie("token");
    navigate("/");
  };

  const SignoutModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    // console.log(isOpen);
    useEffect(() => {
      const handleBack = (e: PopStateEvent) => {
        e.preventDefault();
        window.history.pushState(null, "", location.pathname);
        console.log("titit");
      };

      window.addEventListener("popstate", handleBack);

      // Cleanup function
      return () => {
        window.removeEventListener("popstate", handleBack);
      };
    }, []);

    return (
      <>
        <Button
          onClick={onOpen}
          w={"200px"}
          className="btn-p-outline clicky"
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
    <PageWithMainNav title="Cashier Profile" headerRight={null}>
      <Container pb={sw < 770 ? "72px" : ""}>
        <VStack my={5} mx={"auto"} w={"100%"} gap={6} maxW={"600px"}>
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

          <VStack align={"flex-start"} gap={4}>
            <Text fontWeight={700} fontSize={23}>
              Account Details
            </Text>

            <Box>
              <Box w={"100%"}>
                {profileData.map((p, i) => (
                  <HStack key={i} mb={3} w={"100%"}>
                    <HStack w={"100%"} maxW={"120px"}>
                      <Icon as={p.icon} />
                      <Text flexShrink={0}>{p.key}</Text>
                    </HStack>

                    <Box className="inputlike">
                      <Text>{p.value || "No Data"}</Text>
                    </Box>
                  </HStack>
                ))}
              </Box>

              <Box w={"100%"}>
                {profileData2.map((p, i) => (
                  <HStack key={i} mb={3} w={"100%"}>
                    <HStack w={"100%"} maxW={"120px"}>
                      <Icon as={p.icon} />
                      <Text flexShrink={0}>{p.key}</Text>
                    </HStack>

                    <Box className="inputlike">
                      <Text>{p.value || "No Data"}</Text>
                    </Box>
                  </HStack>
                ))}
              </Box>
            </Box>
          </VStack>
        </VStack>
      </Container>
    </PageWithMainNav>
  );
}
