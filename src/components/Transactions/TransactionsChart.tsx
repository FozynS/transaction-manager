import { Box } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import TransactionItem from "../../types/TransactionItem";

interface TransactionsChartProps {
  data: TransactionItem[];
}

const TransactionsChart: React.FC<TransactionsChartProps> = ({ data }) => {

  const lastTransactions = data && data.length > 0 ? data.slice(0, 9) : [];


  return (
    <TransactionChart>
      <BarChart width={360} height={250} data={lastTransactions}>
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="amount" />
        <YAxis dataKey="id"/>
        <Tooltip />
        <Legend />
        <Bar dataKey="clientName" fill="#2b6cb0" />
        <Bar dataKey="status" stackId="a" fill="#8884d8" />
        <Bar dataKey="amount" stackId="b" fill="#ffc658" />
        <Bar dataKey="type" stackId="c" fill="#82ca9d" />
      </BarChart>
    </TransactionChart>
  );
};

export default TransactionsChart;

const TransactionChart = styled(Box)`
  box-sizing: border-box;
  display: flex;
  width: 28%;
  height: 280px;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
