import React from "react";
import { Box, Button } from "@chakra-ui/react";
import styled from "styled-components";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPagination = () => {
    const pagesToShow = 5;

    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    if (totalPages <= pagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (endPage - startPage < pagesToShow - 1) {
        startPage = endPage - pagesToShow + 1;
      }
    }

    if (currentPage > 1) {
      pages.push(
        <StyledButton key="prev" onClick={() => onPageChange(currentPage - 1)}>
          {"<"}
        </StyledButton>
      );
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <StyledButton
          key={page}
          onClick={() => onPageChange(page)}
          colorScheme={currentPage === page ? 'blue' : undefined}
        >
          {page}
        </StyledButton>
      );
    }

    if (currentPage < totalPages) {
      pages.push(
        <StyledButton key="next" onClick={() => onPageChange(currentPage + 1)}>
          {">"}
        </StyledButton>
      );
    }

    return pages;
  };

  return (
    <PaginationBox>
      {renderPagination()}
    </PaginationBox>
  );
};

export default Pagination;

const PaginationBox = styled(Box)`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

const StyledButton = styled(Button)`
  height: 30px;
  width: 20px;
`;