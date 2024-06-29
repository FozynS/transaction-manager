import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import styled from "styled-components";
import { fetchTransactions } from "../../services/api";
import { useQuery } from "react-query";
import { useAuth } from "../../context/AuthContext";
import Pagination from "./Pagination";

export interface TransactionItem {
  id: number;
  status: string;
  type: string;
  clientName: string;
  amount: number;
}

const ITEMS_PER_PAGE = 10;

const TransactionTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { token } = useAuth();
  
  const { data, error, isLoading } = useQuery('transactions', () => {
    if(token) {
      return fetchTransactions(token, currentPage, ITEMS_PER_PAGE);
    }
  });
  
  const totalPages = Math.ceil(data?.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const limitedTransactions = data?.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <StyledTh scope='col'>ID</StyledTh>
            <StyledTh scope='col'>Status</StyledTh>
            <StyledTh scope='col'>Type</StyledTh>
            <StyledTh scope='col'>Client name</StyledTh>
            <StyledTh scope='col'>Amount</StyledTh>
            <Th scope='col'>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <Tr>
              <Td colSpan={6}>Loading...</Td>
            </Tr>
          ) : error ? (
            <Tr>
              <Td colSpan={6}>Error fetching data</Td>
            </Tr>
          ) : (
            limitedTransactions?.map((transaction: TransactionItem) => (
              <Tr key={transaction.id}>
                <StyledTh scope='row'>{transaction.id}</StyledTh>
                <StyledTd>{transaction.status}</StyledTd>
                <StyledTd>{transaction.type}</StyledTd>
                <StyledTd>{transaction.clientName}</StyledTd>
                <StyledTd>{transaction.amount}</StyledTd>
                <StyledActionTd>
                  <Button colorScheme='blue' variant="outline">Edit</Button>
                  <Button colorScheme='red' variant="outline">Delete</Button>
                </StyledActionTd>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
    </>
  )
}

export default TransactionTable;

const StyledTh = styled(Th)`
  text-align: left;
  background-color: #f1f3f5;
  font-weight: bold;
`;
const StyledTd = styled(Td)`
  border-right: 1px solid;
`;

const StyledActionTd = styled(Td)`
  display: flex;
  justify-content: space-between;
`;