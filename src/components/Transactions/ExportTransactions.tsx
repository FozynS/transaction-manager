import { Button, useToast } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import { exportTransactions } from "../../services/api";

// type ExportTransactionsProps = {
  
// }


const ExportTransactions: React.FC = () => {
  const { token } = useAuth();
  const toast = useToast();

  const handleExport = async () => {
    if(token) {
      try {
        await exportTransactions(token);
        toast({
          title: "Transactions exported.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error export transactions.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Button colorScheme='purple' variant="outline" onClick={handleExport}>Export</Button>
  );
};

export default ExportTransactions;