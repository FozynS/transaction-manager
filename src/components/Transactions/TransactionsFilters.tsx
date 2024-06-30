import { Box, Select } from "@chakra-ui/react";
import styled from "styled-components";

import ImportTransactions from "./ImportTransactions";
import ExportTransactions from "./ExportTransactions";

interface TransactionFiltersProps {
  onFilterChange: (name: string, value: string) => void;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({ onFilterChange }) => {

  return (
    <FilterAndButtonBox>
      <StyledBox>
        <StyledSelect 
          borderColor='blue.500' 
          variant='flushed' 
          name="status"
          width='150px' 
          placeholder='Status'
          onChange={(e) => onFilterChange(e.target.name, e.target.value)}>
          <option value="Pending"> - Pending</option>
          <option value="Completed"> - Completed</option>
          <option value="Canceled"> - Canceled</option>
        </StyledSelect>
        <StyledSelect 
          borderColor='blue.500' 
          variant='flushed' 
          name="type"
          width='150px' 
          placeholder='Type'
          onChange={(e) => onFilterChange(e.target.name, e.target.value)}>
          <option value="Refill"> - Refill</option>
          <option value="Withdrawal"> - Withdrawal</option>
        </StyledSelect>
      </StyledBox>
      <StyledBox>
        <ImportTransactions />
        <ExportTransactions />
      </StyledBox>
    </FilterAndButtonBox>
  );
};

export default TransactionFilters;


const FilterAndButtonBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

const StyledBox = styled(Box)`
  display: flex;
  gap: 15px;
`

const StyledSelect = styled(Select)`
  width: ${(props) => props.width || '200px'};
`;
