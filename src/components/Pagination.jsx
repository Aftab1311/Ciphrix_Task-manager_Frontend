import React from 'react';
import { 
  Pagination as MuiPagination, 
  Box, 
  Typography 
} from '@mui/material';

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        mt: 4,
        gap: 3,
        flexDirection: { xs: 'column', sm: 'row' }
      }}
    >
      <Typography 
        variant="body1" 
        fontWeight="medium"
        color="text.secondary"
      >
        Page {page} of {totalPages}
      </Typography>

      <MuiPagination
        count={totalPages}
        page={page}
        onChange={(e, p) => onChange(p)}
        color="primary"
        sx={{
          '& .MuiPaginationItem-root': {
            borderRadius: 2,
            fontWeight: 'bold',
            margin: '0 4px',
            minWidth: '40px',
            height: '40px',
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: 'primary.light',
              color: 'white',
              transform: 'translateY(-1px)',
            },
            '&.Mui-selected': {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              }
            },
          },
        }}
      />
    </Box>
  );
}