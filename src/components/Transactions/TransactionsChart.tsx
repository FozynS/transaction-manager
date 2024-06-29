import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";

const TransactionsChart: React.FC = () => {

  return (
    <TransactionChart>
      <Table>
        <Thead>
          <Tr>
            <Th scope='col'>Transactions</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
          </Tr>
          <Tr>
            <Td>2</Td>
          </Tr>
          <Tr>
            <Td>3</Td>
          </Tr>
        </Tbody>
      </Table>
    </TransactionChart>
  )
}

export default TransactionsChart;

const TransactionChart = styled(Box)`
  width: 25%;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 10px;
`;
