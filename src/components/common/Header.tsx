import { Button, Input } from "@chakra-ui/react";
import styled from "styled-components";

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Input borderColor="blue" type="text" placeholder='Search transaction...'/>
      <Button colorScheme='gray' variant="outline">Logout</Button>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  display: flex;
  gap: 70px;
  padding: 20px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 5px;
`;