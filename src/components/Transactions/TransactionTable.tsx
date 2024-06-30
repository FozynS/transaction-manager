import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import Pagination from "./Pagination";

import TransactionItem from '../../types/TransactionItem';
import DeleteTransactionButton from "./DeleteTransactionButton";
import Filters from '../../types/FiltersType';
import EditTransactionModal from "./EditTransactionModal";

interface TransactionTableProps {
  data: TransactionItem[];
  token: string;
  isLoading: boolean;
  error: string | null | unknown;
  filters: Filters;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ITEMS_PER_PAGE = 10;

const TransactionTable: React.FC<TransactionTableProps> = ({ 
    data,
    token,
    isLoading,
    error,
    filters,
    currentPage,
    totalPages,
    onPageChange,
  }) => {
  
  const applyFilters = (transactions: TransactionItem[]): TransactionItem[] => {
    return transactions.filter((transaction) => {
      if (filters.status && transaction.status !== filters.status) {
        return false;
      }
      if (filters.type && transaction.type !== filters.type) {
        return false;
      }
      if (filters.searchQuery && !transaction.clientName.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    });
  };
  
  const filteredTransactions = applyFilters(data || []);

  const limitedTransactions = filteredTransactions?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

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
                  <EditTransactionModal transaction={transaction} />
                  <DeleteTransactionButton id={transaction.id} token={token}/>
                </StyledActionTd>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>
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