import React, { useRef } from "react";
import Papa from 'papaparse';

import { Button, useToast } from "@chakra-ui/react";

import { Transaction } from "../../types/TransactionType";
import { useImportTransactions } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const ImportTransactions: React.FC = () => {
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { token } = useAuth();

  const { mutate } = useImportTransactions();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      handleImport(selectedFile, token);
    }
  };
  
  const handleImport = (file: File, token: string | null) => {
    Papa.parse<Transaction>(file, {
      header: true,
      complete: async (results) => {
        try {
          const data = results.data as Transaction[];
          if (token) {
            mutate({ data, token }, {
              onSuccess: () => {
                toast({
                  title: "Import successful",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
              },
              onError: (error) => {
                toast({
                  title: "Import failed",
                  description: "There was an error importing the transactions.",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
                console.error("Error importing transactions:", error);
              },
            });
          } else {
            toast({
              title: "Error",
              description: "User is not authenticated.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        } catch (error) {
          toast({
            title: "Import failed",
            description: "There was an error importing the transactions.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          console.error("Error importing transactions:", error);
        }
      },
      error: () => {
        toast({
          title: "Error",
          description: "Failed to parse CSV file.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    });
    resetFileInput();
  };
  
  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept=".csv"
        />
        <Button colorScheme='purple' variant="outline" onClick={handleButtonClick}>Import</Button> 
      </div>
    </>
  );
};

export default ImportTransactions;
