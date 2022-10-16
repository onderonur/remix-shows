import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

type EmptyAlertProps = {
  title: string;
};

export default function EmptyAlert({ title }: EmptyAlertProps) {
  return (
    <Alert status="info">
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
    </Alert>
  );
}
