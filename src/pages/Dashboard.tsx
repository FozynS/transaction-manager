import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useFetchTransactions } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Filters from "../types/FiltersType";

import Header from "../components/common/Header";
import TransactionsChart from "../components/Transactions/TransactionsChart";
import TransactionFilters from "../components/Transactions/TransactionsFilters";
import TransactionTable from "../components/Transactions/TransactionTable";
import Footer from "../components/common/Footer";

const ITEMS_PER_PAGE = 10;

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState<Filters>({
    status: "",
    type: "",
    searchQuery: "",
    
  });
  const { token } = useAuth();

  const { data, error, isLoading, refetch } = useFetchTransactions(
    token!,
    currentPage,
    ITEMS_PER_PAGE,
    filters
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);
  

  const totalPages = Math.ceil((data?.length || 0) / ITEMS_PER_PAGE);

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
        <TransactionsChart data={data}/>
        
        <MainSection>

          <TransactionFilters filters={filters} onFilterChange={handleFilterChange} />

          <DashboardContainer>
          <TransactionTable
              data={data}
              token={token!}
              isLoading={isLoading}
              error={error}
              filters={filters}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
            />
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