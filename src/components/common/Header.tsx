import { Input } from "@chakra-ui/react";
import styled from "styled-components";
import LogoutButton from "../Logout/LogoutButtom";

interface HeaderProps {
  handleSearchChange: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ handleSearchChange }) => {
  return (
    <StyledHeader>
      <Input 
      borderColor="blue" 
      type="text" 
      placeholder='Search transaction...' 
      onChange={(e) => handleSearchChange(e.target.value)}/>
      <LogoutButton />
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