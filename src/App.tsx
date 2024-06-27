import React from 'react';
import './App.css'
import { Box, Button, Input, Select, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import styled from 'styled-components';

const App: React.FC = () => {

  return (
    <>
      <Header>
        <Input borderColor="blue" type="text" placeholder='Search transaction...'/>
      </Header>
      <Main>
        <TransactionsMiniTableBox>
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
        </TransactionsMiniTableBox>

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
              <Button colorScheme='purple' variant="outline">Import</Button>
              <Button colorScheme='purple' variant="outline">Export</Button>
            </StyledBox>
          </FilterAndButtonBox>

          <DashboardContainer>
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
                <Tr>
                  <StyledTh scope='row'>1</StyledTh>
                  <StyledTd>Pending</StyledTd>
                  <StyledTd>Withdrawal</StyledTd>
                  <StyledTd>Dale Cotton</StyledTd>
                  <StyledTd>$28.43</StyledTd>
                  <StyledActionTd>
                    <Button colorScheme='blue' variant="outline">Edit</Button>
                    <Button colorScheme='red' variant="outline">Delete</Button>
                  </StyledActionTd>
                </Tr>
              </Tbody>
            </Table>

          </DashboardContainer>
        </MainSection>
        
      </Main>
    </>
  )
}

export default App;

const Header = styled.header`
  padding: 20px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 5px;
`;

const Main = styled.main`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #e9ecef;
  border-radius: 5px;
`;

const TransactionsMiniTableBox = styled(Box)`
  width: 25%;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 10px;
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
`;

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
  width: 85%;
`;
const StyledBox = styled(Box)`
  display: flex;
  gap: 15px;
`

const StyledSelect = styled(Select)`
  width: ${(props) => props.width || '200px'};
`;
