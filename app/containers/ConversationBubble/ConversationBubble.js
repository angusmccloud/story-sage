import React from 'react';
import Box from '@/app/components/Box/Box';
import Typography from '@/app/components/Typography/Typography';
import { useTheme } from '@mui/material';

const ConversationBubble = ({ entry }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '80%',
        alignSelf: entry.askedBy === 'user' ? 'flex-end' : 'flex-start',
        backgroundColor: entry.askedBy === 'user' ? theme.palette.primary.main : theme.palette.background.default,
        color: entry.askedBy === 'user' ? theme.palette.primary.contrastText : theme.palette.text.primary,
        borderRadius: entry.askedBy === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
        borderWidth: entry.askedBy === 'bot' ? 1 : 0,
        borderStyle: entry.askedBy === 'bot' ? 'solid' : 'none',
        borderColor: entry.askedBy === 'bot' ? theme.palette.primary.main : 'none',
        padding: 2,
        marginBottom: 1,
      }}
    >
      <Typography>{entry.text}</Typography>
    </Box>
  );
};

export default ConversationBubble;
