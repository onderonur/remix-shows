import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

type InfoAlertProps = {
  title: string;
};

export default function InfoAlert({ title }: InfoAlertProps) {
  return (
    <Alert status="info">
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
    </Alert>
  );
}
