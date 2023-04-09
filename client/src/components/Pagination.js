import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationButtons({ totalPages, page, onPageChange }) {
  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        page={page}
        count={totalPages}
        color="primary"
        showFirstButton
        showLastButton
        onChange={handleChange}
      />
    </Stack> 
  )
}
