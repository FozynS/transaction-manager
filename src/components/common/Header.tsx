import { Input } from "@chakra-ui/react";
import styled from "styled-components";

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Input borderColor="blue" type="text" placeholder='Search transaction...'/>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  padding: 20px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 5px;
`;