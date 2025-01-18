import React from 'react';
import Box from '@/app/components/Box/Box';
import Typography from '@/app/components/Typography/Typography';
import Select from '@/app/components/Select/Select';
import Slider from '@/app/components/Slider/Slider';
import FormControl from '@/app/components/FormControll/FormControl';
import InputLabel from '@/app/components/InputLabel/InputLabel';
import MenuItem from '@/app/components/MenuItem/MenuItem';
import TextField from '@/app/components/TextField/TextField';
import Button from '@/app/components/Button/Button';
import SageLoading from '@/app/components/SageLoading/SageLoading';
import ConditionalWrapper from '@/app/components/ConditionalWrapper/ConditionalWrapper';
import ConversationBubble from '@/app/containers/ConversationBubble/ConversationBubble';
import ConversationDivider from '@/app/containers/ConversationDivider/ConversationDivider';
import Fab from '@/app/components/Fab/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTheme, useMediaQuery } from '@mui/material';

const ConversationInterface = ({
  series,
  selectedSeries,
  selectedBook,
  selectedChapter,
  currentQuestion,
  conversation,
  conversationLoading,
  handleSeriesChange,
  handleBookChange,
  handleChapterChange,
  handleAskQuestion,
  setCurrentQuestion,
  conversationEndRef,
  handleOpenDialog,
  conversationId
}) => {
  const theme = useTheme();
  const isXL = useMediaQuery(theme.breakpoints.up('xl'));
  const isL = useMediaQuery(theme.breakpoints.up('lg'));
  const isM = useMediaQuery(theme.breakpoints.up('md'));
  const isS = useMediaQuery(theme.breakpoints.up('sm'));

  const selectedSeriesBooks = selectedSeries ? series.find(s => s.seriesId === selectedSeries).books : [];

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: isXL || isL || isM ? 'row' : 'column', gap: 2 }}>
        <FormControl fullWidth={isS}>
          <InputLabel 
            id="series-select-label"
            sx={{ 
              fontFamily: theme.typography.inputLabel.fontFamily,
              fontSize: theme.typography.inputLabel.fontSize,
              '&.Mui-focused': {
                fontFamily: theme.typography.inputLabel.fontFamily,
              },
              top: "-10px"
            }}
          >
            Series
          </InputLabel>
          <Select
            labelId="series-select-label"
            id="series-select"
            label="Series"
            value={selectedSeries || ''}
            onChange={handleSeriesChange}
            disabled={series.length === 0 || conversationLoading}
          >
            {series.map(s => (
              <MenuItem key={s.seriesId} value={s.seriesId}>{s.seriesName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth={isS}>
          <InputLabel 
            id="book-select-label"
            sx={{ 
              fontFamily: theme.typography.inputLabel.fontFamily,
              fontSize: theme.typography.inputLabel.fontSize,
              '&.Mui-focused': {
                fontFamily: theme.typography.inputLabel.fontFamily,
              },
              top: "-10px"
            }}
          >
            Book
          </InputLabel>
          <Select
            labelId="book-select-label"
            id="book-select"
            label="Book"
            value={selectedBook || ''}
            onChange={handleBookChange}
            disabled={!selectedSeries || conversationLoading}
          >
            {selectedSeriesBooks.map(b => (
              <MenuItem key={b.numberInSeries} value={b.numberInSeries}>{b.title} ({b.numberInSeries})</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {selectedSeries && selectedBook ? (
        <Box sx={{ marginTop: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, marginBottom: 1 }}>
            <Button
              size="small"
              variant="outlined"
              color="primaryDark"
              onClick={() => handleChapterChange(null, Math.max(1, (selectedChapter || 1) - 1))}
              disabled={!selectedBook || conversationLoading || selectedChapter === 1}
            >
              <RemoveIcon />
            </Button>
            <Typography 
              variant="pageAccent"
              sx={{ minWidth: '120px', textAlign: 'center', fontSize: '2rem' }}
            >
              Chapter: {selectedChapter || 1}
            </Typography>
            <Button
              size="small"
              variant="outlined"
              color="primaryDark"
              onClick={() => handleChapterChange(null, Math.min(selectedSeriesBooks.find(b => b.numberInSeries === selectedBook).numberOfChapters, (selectedChapter || 1) + 1))}
              disabled={!selectedBook || conversationLoading || selectedChapter === selectedSeriesBooks.find(b => b.numberInSeries === selectedBook).numberOfChapters}
            >
              <AddIcon />
            </Button>
          </Box>
          <Slider
            value={selectedChapter || 1}
            onChange={handleChapterChange}
            min={1}
            max={selectedBook ? selectedSeriesBooks.find(b => b.numberInSeries === selectedBook).numberOfChapters : 1}
            disabled={!selectedBook || conversationLoading}
            valueLabelDisplay="auto"
            sx={{
              color: theme.palette.primary.dark,
              '& .MuiSlider-thumb': {
                color: theme.palette.primary.dark,
              },
              '& .MuiSlider-track': {
                color: theme.palette.primary.dark,
              },
              '& .MuiSlider-rail': {
                color: theme.palette.primary.dark,
                opacity: 0.3,
              }
            }}
          />
        </Box>
      ) : (
        <Box sx={{ marginTop: 2, marginBottom: 2 }}>
          <Typography>
            Please select a series and book.
          </Typography>
        </Box>
      )}
      <ConditionalWrapper
        condition={conversation.length > 0 || conversationLoading}
        wrapper={(children) => (
          <Box sx={{
            borderRadius: 3, 
            borderColor: theme.palette.primary.main, 
            borderWidth: 1, 
            borderStyle: 'solid', 
            position: 'relative',
          }}>
            <Box sx={{paddingTop: 2, paddingBottom: 2, paddingLeft: 2, paddingRight: 2, display: 'flex', flexDirection: 'column', maxHeight: { xs: '50vh', sm: '55vh', md: '60vh', lg: '65vh', xl: '70vh' }, overflowY: 'auto'}}>
              {conversation.map((entry, index) => {
                const previousEntry = conversation[index - 1];
                const showDivider = previousEntry && (previousEntry.book !== entry.book || previousEntry.chapter !== entry.chapter);
              
                return (
                  <React.Fragment key={index}>
                    {(index === 0 || showDivider) && (
                      <ConversationDivider book={entry.book} chapter={entry.chapter} />
                    )}
                    <ConversationBubble entry={entry} conversationId={conversationId} />
                  </React.Fragment>
                );
              })}
              {conversationLoading && <SageLoading />}
              <div ref={conversationEndRef} />
            </Box>
            {children}
            {conversation.length >= 1 && (
              <Fab color="secondary" sx={{ position: 'absolute', bottom: 88, right: 16 }} onClick={handleOpenDialog}>
                <DeleteIcon />
              </Fab>
            )}
          </Box>
        )}
      >
        <Box sx={{borderTopWidth: 1, borderTopColor: theme.palette.primary.main, borderTopStyle: 'solid', paddingLeft: conversation.length > 0 ? 2 : 0, paddingRight: conversation.length > 0 ? 2 : 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextField
            label="Ask a question"
            fullWidth
            variant="outlined"
            value={currentQuestion || ''}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAskQuestion();
              }
            }}
            sx = {{marginTop: 1, marginBottom: 1, marginRight: 1}}
            disabled={
              series.length === 0 ||
              !selectedSeries ||
              !selectedBook ||
              !selectedChapter ||
              conversationLoading
            }
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{
              marginTop: 1, 
              marginBottom: 1,
              // backgroundColor: theme.palette.primary.dark,
              // color: "white",
              // '&:hover': {
              //   backgroundColor: theme.palette.primary.highlight,
              // }
            }}
            onClick={handleAskQuestion}
            disabled={
              series.length === 0 ||
              !selectedSeries ||
              !selectedBook ||
              !selectedChapter ||
              !currentQuestion ||
              conversationLoading
            }
          >
            Ask
          </Button>
        </Box>
      </ConditionalWrapper>
    </>
  );
};

export default ConversationInterface;
