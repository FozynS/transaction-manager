import { Button, useToast } from "@chakra-ui/react";
import React from "react";
import { useDeleteTransaction } from "../../services/api";
import { useQueryClient } from "react-query";

type DeleteTransactionProps = {
  id: number;
  token: string | null;
}

const DeleteTransactionButton: React.FC<DeleteTransactionProps> = ({ id, token }) => {
  const toast = useToast();
  const { mutate } = useDeleteTransaction();
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (token) {
      const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
      if (confirmDelete) {
        try {
          mutate({ id, token }, {
            onSuccess() {
              queryClient.invalidateQueries('transactions');
              toast({
                title: "Transaction deleted.",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            }, 
            onError() {
              toast({
                title: "Error deleting transaction.",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          });
        } catch (error) {
          toast({
            title: "Error deleting transaction.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    }
  };

  return (
    <Button colorScheme='red' variant="outline" onClick={handleDelete}>Delete</Button>
  )
} 

export default DeleteTransactionButton;