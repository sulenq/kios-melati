import { Button, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <VStack justify={"center"} h={"100vh"} bg={"b"} color={"wt"}>
      <Text fontSize={[64, 82, 124]} fontWeight={700} lineHeight={1}>
        404
      </Text>

      <Text mb={4} fontSize={24} fontWeight={600}>
        Page Not Found
      </Text>

      <Button
        as={Link}
        to={"/"}
        color={"wt"}
        className="divider"
        bg={"var(--divider2)"}
      >
        Go to Landing Page
      </Button>
    </VStack>
  );
}
