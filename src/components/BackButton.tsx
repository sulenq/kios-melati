import { IconButton, Icon } from "@chakra-ui/react";
import {ArrowLeft} from "@phosphor-icons/react";

export default function BackButton(props: any) {
  return (
    <IconButton
      {...props}
      id="backBtn"
      onClick={() => {
        window.history.back();
      }}
      className="btn-sm divider"
      aria-label="backBtn"
      icon={<Icon as={ArrowLeft} fontSize={18} {...props.fontSize} {...props?.color} />}
      borderRadius={"full"}
      variant={"ghost"}
    />
  );
}
