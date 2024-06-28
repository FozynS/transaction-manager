import React from 'react';
import { Box } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Box as="footer" padding="1.5rem" background="blue.300" color="white" textAlign="center">
      © 2024 Transaction Manager
    </Box>
  );
};

export default Footer;