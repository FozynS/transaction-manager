import { Button, useToast } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import { useExportTransactions } from "../../services/api";
import Filters from "../../types/FiltersType";

interface ExportTransactionsProps {
  filters: Filters;
}

const ExportTransactions: React.FC<ExportTransactionsProps> = ({ filters }) => {
  const toast = useToast();
  const { token } = useAuth();

  const { mutate } = useExportTransactions();

  const handleExport = async () => {
    try {
      mutate({ token: token!, filters });

      toast({
        title: "Export started",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Export error",
        description: "Что-то пошло не так при экспорте транзакций.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Button colorScheme='purple' variant="outline" onClick={handleExport}>Export</Button>
  );
};

export default ExportTransactions;