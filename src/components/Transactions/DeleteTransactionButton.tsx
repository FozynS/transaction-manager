import { Button, useToast } from "@chakra-ui/react";
import React from "react";
import { deleteTransaction } from "../../services/api";

type DeleteTransactionProps = {
  id: number;
  token: string | null;
}

const DeleteTransactionButton: React.FC<DeleteTransactionProps> = ({ id, token }) => {
  const toast = useToast();

  const handleDelete = async () => {
    if (token) {
      const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
      if (confirmDelete) {
        try {
          await deleteTransaction(id, token);
          toast({
            title: "Transaction deleted.",
            status: "success",
            duration: 3000,
            isClosable: true,
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