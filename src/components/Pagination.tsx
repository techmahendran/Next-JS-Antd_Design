import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Box,
} from "@chakra-ui/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Box mt={4} display="flex" justifyContent="center">
      <Table variant="striped" colorScheme="teal">
        <TableCaption placement="top">Pagination</TableCaption>
        <Tbody>
          <Tr>
            {pageNumbers.map((pageNumber) => (
              <Td key={pageNumber}>
                <Button
                  variant={currentPage === pageNumber ? "solid" : "outline"}
                  colorScheme={currentPage === pageNumber ? "teal" : undefined}
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </Button>
              </Td>
            ))}
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default Pagination;
