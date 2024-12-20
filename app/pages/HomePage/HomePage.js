'use client';
import React, { useState, useEffect, useRef } from 'react';
import PageHeader from '@/app/containers/PageHeader/PageHeader';
import Box from '@/app/components/Box/Box';
import Typography from '@/app/components/Typography/Typography';
import getSeries from '@/app/services/getSeries';
import getAnswer from '@/app/services/getAnswer';
import ConversationInterface from '@/app/containers/ConversationInterface/ConversationInterface';
import getConversationHistory from '@/app/utils/getConversationHistory';
import setConversationHistory from '@/app/utils/setConversationHistory';
import PageWrapper from '@/app/containers/PageWrapper/PageWrapper';
import Dialog from '@/app/components/Dialog/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@/app/components/Button/Button';

export default function HomePage() {
  const [series, setSeries] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [conversationLoading, setConversationLoading] = useState(false);
  const conversationEndRef = useRef(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSeriesChange = (event) => {
    const newSeries = event.target.value;
    setSelectedSeries(newSeries);
    const history = getConversationHistory(newSeries);
    setConversation(history);

    if (history.length > 0) {
      const lastEntry = history[history.length - 1];
      setSelectedBook(lastEntry.book || null);
      setSelectedChapter(lastEntry.chapter || null);
    } else {
      setSelectedBook(null);
      setSelectedChapter(null);
    }
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
    setConversationHistory(selectedSeries, newConversation); // Update localStorage

    const questionHistory = conversation.filter(
      entry => entry.book === selectedBook && entry.chapter === selectedChapter
    ).map(entry => entry.askedBy === 'user' ? `question: ${entry.text}` : `answer: ${entry.text}`);

    const formattedQuestion = questionHistory.length > 0
      ? `QUESTION: ${currentQuestion}\n\nQUESTION HISTORY FOR CONTEXT: ${questionHistory.join('\n')}`
      : currentQuestion;

    try {
      const answer = await getAnswer(formattedQuestion, selectedBook, selectedChapter, selectedSeries);
      const updatedConversation = [
        ...newConversation,
        { text: answer.result, askedBy: 'bot', book: selectedBook, chapter: selectedChapter, requestId: answer.request_id, context: answer.context }
      ];
      setConversation(updatedConversation);
      setConversationHistory(selectedSeries, updatedConversation); // Update localStorage
      conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error getting answer:', error);
    } finally {
      setConversationLoading(false);
    }
  }

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    setConversation([]);
    setConversationHistory(selectedSeries, []);
    handleCloseDialog();
  };

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

  return (
    <>
      <PageHeader pageName="Story Sage" />
      <PageWrapper>
        <Box sx={{ paddingBottom: 2 }}>
          <Typography>
            Welcome to Story Sage. You can choose a series then ask questions about the books and chapters that you've read so far.
          </Typography>
        </Box>
        <ConversationInterface
          series={series}
          selectedSeries={selectedSeries}
          selectedBook={selectedBook}
          selectedChapter={selectedChapter}
          currentQuestion={currentQuestion}
          conversation={conversation}
          conversationLoading={conversationLoading}
          handleSeriesChange={handleSeriesChange}
          handleBookChange={handleBookChange}
          handleChapterChange={handleChapterChange}
          handleAskQuestion={handleAskQuestion}
          setCurrentQuestion={setCurrentQuestion}
          conversationEndRef={conversationEndRef}
          handleOpenDialog={handleOpenDialog}
        />
      </PageWrapper>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Delete Conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will restart your conversation on this book series. Deleting the conversation can't be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}