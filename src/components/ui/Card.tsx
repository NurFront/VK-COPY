import React, { FC, ReactNode } from 'react';
import { Box } from '@mui/material';

interface CardProps {
  children: ReactNode;
}

const Card: FC<CardProps> = ({ children }) => {
  return (
    <Box
      sx={{
        border: '1px solid #e2e2e2',
        borderRadius: 10,
        padding: 2,
        marginTop: 4,
      }}
    >
      {children} {/* Рендерим дочерние элементы */}
    </Box>
  );
};

export default Card;
