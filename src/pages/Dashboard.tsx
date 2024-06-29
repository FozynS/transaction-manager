import { Box, Button, Select } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import TransactionsChart from "../components/Transactions/TransactionsChart";
import ImportTransactions from "../components/Transactions/ImportTransactions";
import TransactionTable from "../components/Transactions/TransactionTable";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Dashboard: React.FC = () => {

  return (
    <Box>
      <Header />
      <Main>
        <TransactionsChart />

        <MainSection>
          
          <FilterAndButtonBox>
            <StyledBox>
              <StyledSelect borderColor='blue.500' variant='flushed' name="status" id="" width='150px' placeholder='Status'>
                <option value="Pending"> - Pending</option>
                <option value="Completed"> - Completed</option>
                <option value="Canceled"> - Canceled</option>
              </StyledSelect>
              <StyledSelect borderColor='blue.500' variant='flushed' name="type" id="" width='150px' placeholder='Type'>
                <option value="Refill"> - Refill</option>
                <option value="Withdrawal"> - Withdrawal</option>
              </StyledSelect>
            </StyledBox>
            <StyledBox>
              <ImportTransactions/>
              <Button colorScheme='purple' variant="outline">Export</Button>
            </StyledBox>
          </FilterAndButtonBox>

          <DashboardContainer>
            <TransactionTable/>
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

const FilterAndButtonBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

const DashboardContainer = styled(Box)`
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
  margin-top: 20px;
`;

const StyledBox = styled(Box)`
  display: flex;
  gap: 15px;
`

const StyledSelect = styled(Select)`
  width: ${(props) => props.width || '200px'};
`;
