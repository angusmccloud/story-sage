'use client';
import React, { useState, useEffect, useRef } from 'react';
import PageHeader from '@/app/containers/PageHeader/PageHeader';
import Box from '@/app/components/Box/Box';
import Button from '@/app/components/Button/Button';
import Typography from '@/app/components/Typography/Typography';
import Select from '@/app/components/Select/Select';
import Slider from '@/app/components/Slider/Slider';
import FormControl from '@/app/components/FormControll/FormControl';
import InputLabel from '@/app/components/InputLabel/InputLabel';
import MenuItem from '@/app/components/MenuItem/MenuItem';
import TextField from '@/app/components/TextField/TextField';
import SageLoading from '@/app/components/SageLoading/SageLoading';
import ConditionalWrapper from '@/app/components/ConditionalWrapper/ConditionalWrapper';
import getSeries from '@/app/services/getSeries';
import getAnswer from '@/app/services/getAnswer';
import { useMediaQuery, useTheme } from '@mui/material';
import ConversationBubble from '@/app/containers/ConversationBubble/ConversationBubble';

export default function HomePage() {
  const [series, setSeries] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [conversationLoading, setConversationLoading] = useState(false);
  const conversationEndRef = useRef(null);

  const theme = useTheme();
  const isXL = useMediaQuery(theme.breakpoints.up('xl'));
  const isL = useMediaQuery(theme.breakpoints.up('lg'));
  const isM = useMediaQuery(theme.breakpoints.up('md'));
  const isS = useMediaQuery(theme.breakpoints.up('sm'));

  const handleSeriesChange = (event) => {
    setSelectedSeries(event.target.value);
    setSelectedBook(null);
    setSelectedChapter(null);
  };

  const handleBookChange = (event) => {
    setSelectedBook(event.target.value);
    setSelectedChapter(null);
  };

  const handleChapterChange = (event, value) => {
    setSelectedChapter(value);
  };

  const handleAskQuestion = async () => {
    if (!currentQuestion) return;

    setConversationLoading(true);
    const newConversation = [
      ...conversation,
      { text: currentQuestion, askedBy: 'user', book: selectedBook, chapter: selectedChapter }
    ];
    setConversation(newConversation);
    setCurrentQuestion(''); // Clear the text field

    try {
      const answer = await getAnswer(currentQuestion, selectedBook, selectedChapter, selectedSeries);
      setConversation([
        ...newConversation,
        { text: answer, askedBy: 'bot', book: selectedBook, chapter: selectedChapter }
      ]);
      conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error getting answer:', error);
    } finally {
      setConversationLoading(false);
    }
  }

  useEffect(() => {
    const fetchSeries = async () => {
      const seriesData = await getSeries();
      setSeries(seriesData);
    };

    fetchSeries();
  }, []);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const selectedSeriesBooks = selectedSeries ? series.find(s => s.seriesId === selectedSeries).books : [];

  return (
    <>
      <PageHeader pageName="Story Sage" />
      <Box sx={{ paddingLeft: 5, paddingRight: 5, paddingTop: 2, paddingBottom: 2 }}>
        <Box sx={{paddingBottom: 2}}>
          <Typography>
            Welcome to Story Sage. You can choose a series then ask questions about the books and chapters that you've read so far.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: isXL || isL || isM ? 'row' : 'column', gap: 2 }}>
          <FormControl fullWidth={isS}>
            <InputLabel id="series-select-label">Select a Series</InputLabel>
            <Select
              labelId="series-select-label"
              id="series-select"
              label="Select a Series"
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
            <InputLabel id="book-select-label">Select Current Book</InputLabel>
            <Select
              labelId="book-select-label"
              id="book-select"
              label="Select Current Book"
              value={selectedBook || ''}
              onChange={handleBookChange}
              disabled={!selectedSeries || conversationLoading}
            >
              {selectedSeriesBooks.map(b => (
                <MenuItem key={b.numberInSeries} value={b.numberInSeries}>{b.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Typography>
            Chapters Read
          </Typography>
          <Slider
            value={selectedChapter || 1}
            onChange={handleChapterChange}
            min={1}
            max={selectedBook ? selectedSeriesBooks.find(b => b.numberInSeries === selectedBook).numberOfChapters : 1}
            disabled={!selectedBook || conversationLoading}
            valueLabelDisplay="auto"
          />
        </Box>
        <ConditionalWrapper
          condition={conversation.length > 0 || conversationLoading}
          wrapper={(children) => (
            <Box sx={{borderRadius: 3, borderColor: theme.palette.primary.main, borderWidth: 1, borderStyle: 'solid'}}>
              <Box sx={{paddingTop: 2, paddingBottom: 2, paddingLeft: 2, paddingRight: 2, display: 'flex', flexDirection: 'column', maxHeight: '50vh', overflowY: 'auto'}}>
                {conversation.map((entry, index) => {
                  const previousEntry = conversation[index - 1];
                  const showDivider = previousEntry && (previousEntry.book !== entry.book || previousEntry.chapter !== entry.chapter);
              
                  return (
                    <React.Fragment key={index}>
                      {showDivider && (
                        <Box sx={{ display: 'flex', alignItems: 'center', marginY: 2 }}>
                          <Box sx={{ flexGrow: 1, borderBottom: '1px solid', borderColor: theme.palette.divider }} />
                          <Typography sx={{ marginX: 2, whiteSpace: 'nowrap' }}>
                            {`Book ${entry.book}, Chapter ${entry.chapter}`}
                          </Typography>
                          <Box sx={{ flexGrow: 1, borderBottom: '1px solid', borderColor: theme.palette.divider }} />
                        </Box>
                      )}
                      <ConversationBubble entry={entry} />
                    </React.Fragment>
                  );
                })}
                {conversationLoading && <SageLoading />}
                <div ref={conversationEndRef} />
              </Box>
              {children}
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
              color="primary"
              sx={{marginTop: 1, marginBottom: 1}}
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
        {/* <Typography>
          {JSON.stringify(series)}
        </Typography> */}
      </Box>
    </>
  );
}