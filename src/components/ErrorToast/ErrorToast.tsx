import {
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
} from "@gluestack-ui/themed";

type ErrorToastTypes = {
  title: string;
  message: string;
  type?: "error" | "warning" | "success" | "info" | "attention";
};

export const ErrorToast = ({
  title,
  message,
  type = "error",
}: ErrorToastTypes) => {
  return (
    <Toast action={type} variant="accent">
      <VStack space="xs">
        <ToastTitle>{title}</ToastTitle>
        <ToastDescription>{message}</ToastDescription>
      </VStack>
    </Toast>
  );
};
