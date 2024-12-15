import React from 'react';
import ReactMarkdown from 'react-markdown';
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
      <ReactMarkdown
        children={entry.text}
        components={{
          p: ({ children }) => (
            <Typography>
              {children}
            </Typography>
          ),
          ul: ({ children }) => (
            <ul style={{ marginTop: 0, marginBottom: 0, paddingInlineStart: '1em' }}>
              {children}
            </ul>
          ),
        }}
      />
    </Box>
  );
};

export default ConversationBubble;
