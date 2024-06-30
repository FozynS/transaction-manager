import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import styled from "styled-components";

import Header from "../components/common/Header";
import TransactionsChart from "../components/Transactions/TransactionsChart";
import TransactionFilters from "../components/Transactions/TransactionsFilters";
import TransactionTable from "../components/Transactions/TransactionTable";
import Footer from "../components/common/Footer";

const Dashboard: React.FC = () => {

  const [filters, setFilters] = useState({
    status: "",
    type: "",
    searchQuery: "",

  });

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearchChange = (value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchQuery: value,
    }));
  };


  return (
    <Box>
      <Header handleSearchChange={handleSearchChange}/>

      <Main>
        <TransactionsChart />
        
        <MainSection>

          <TransactionFilters onFilterChange={handleFilterChange} />

          <DashboardContainer>
            <TransactionTable filters={filters} />
          </DashboardContainer>

        </MainSection>
      </Main>

      <Footer/>
    </Box>
  );
};

export default Dashboard;


const Main = styled.main`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #e9ecef;
  border-radius: 5px;
`;

const MainSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
`;

const DashboardContainer = styled(Box)`
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
  margin-top: 20px;
`;