import { IconButton, Icon } from "@chakra-ui/react";
import { ArrowLeft } from "@phosphor-icons/react";

export default function BackButton(props: any) {
  return (
    <IconButton
      {...props}
      id="backBtn"
      onClick={() => {
        window.history.back();
      }}
      className="btn sm-clicky"
      aria-label="backBtn"
      borderRadius={"full"}
      h={"40px !important"}
      icon={
        <Icon
          as={ArrowLeft}
          fontSize={props.fontSize || 20}
          {...props?.color}
        />
      }
      variant={"ghost"}
    />
  );
}
