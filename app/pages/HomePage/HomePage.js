// 'use client' directive for Next.js to indicate this is a client-side component
'use client';

// Import necessary React hooks and components
import React, { useState, useEffect, useRef } from 'react';
import PageHeader from '@/app/containers/PageHeader/PageHeader';
import Box from '@/app/components/Box/Box';
import Typography from '@/app/components/Typography/Typography';
import getSeries from '@/app/services/getSeries';
import getAnswer from '@/app/services/getAnswer';
import ConversationInterface from '@/app/containers/ConversationInterface/ConversationInterface';
import getConversationHistory from '@/app/utils/getConversationHistory';
import setConversationHistory from '@/app/utils/setConversationHistory';
import getLastSeries from '@/app/utils/getLastSeries';
import setLastSeries from '@/app/utils/setLastSeries';
import PageWrapper from '@/app/containers/PageWrapper/PageWrapper';
import Dialog from '@/app/components/Dialog/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@/app/components/Button/Button';
import CoffeeWidget from "@/app/components/CoffeeWidget/CoffeeWidget";

const loadingMessages = [
  "Consulting the ancient tomes...",
  "Analyzing the narrative...",
  "Gathering literary insights...",
  "Processing chapter context...",
  "Crafting a thoughtful response...",
  "Delving into the story...",
  "Searching for the answer...",
  "Exploring the plot...",
  "Decoding the text...",
  "Seeking meaning...",
  "Interpreting the story...",
  "Analyzing the text...",
  "Unraveling the mystery...",
  "Investigating the plot...",
  "Plotting a response...",
  "Deciphering the story...",
];

// Main component for the HomePage
export default function HomePage() {
  // State variables to manage the component's state
  const [series, setSeries] = useState([]); // List of series
  const [selectedSeries, setSelectedSeries] = useState(null); // Currently selected series
  const [selectedBook, setSelectedBook] = useState(null); // Currently selected book
  const [selectedChapter, setSelectedChapter] = useState(null); // Currently selected chapter
  const [currentQuestion, setCurrentQuestion] = useState(''); // Current question being asked
  const [conversation, setConversation] = useState([]); // Conversation history
  const [conversationLoading, setConversationLoading] = useState(false); // Loading state for conversation
  const conversationEndRef = useRef(null); // Reference to the end of the conversation for auto-scrolling
  const [dialogOpen, setDialogOpen] = useState(false); // State to manage the dialog visibility
  const [conversationId, setConversationId] = useState(null); // Conversation ID
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState(0);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const questionInputRef = useRef(null);

  useEffect(() => {
    let interval;
    if (conversationLoading) {
      interval = setInterval(() => {
        setCurrentLoadingMessage((prev) => (prev + 1) % loadingMessages.length);
      }, 3000);
    }
    return () => interval && clearInterval(interval);
  }, [conversationLoading]);

  // Handle series change event
  const handleSeriesChange = (event) => {
    const newSeries = event.target.value;
    setSelectedSeries(newSeries);
    setLastSeries(newSeries);
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

  // Handle book change event
  const handleBookChange = (event) => {
    setSelectedBook(event.target.value);
    setSelectedChapter(null);
  };

  // Handle chapter change event
  const handleChapterChange = (event, value) => {
    setSelectedChapter(value);
  };

  // Handle asking a question
  const handleAskQuestion = async () => {
    if (!currentQuestion) return;

    setConversationLoading(true);
    const newConversation = [
      ...conversation,
      { text: currentQuestion, askedBy: 'user', book: selectedBook, chapter: selectedChapter }
    ];
    setConversation(newConversation);
    setCurrentQuestion(''); // Clear the text field
    questionInputRef.current?.focus(); // Keep focus on input
    setConversationHistory(selectedSeries, newConversation); // Update localStorage

    const formattedQuestion = currentQuestion;

    try {
      const answer = await getAnswer(formattedQuestion, selectedBook, selectedChapter, selectedSeries, conversationId);
      const updatedConversation = [
        ...newConversation,
        { text: answer.result, askedBy: 'bot', book: selectedBook, chapter: selectedChapter, requestId: answer.request_id, context: answer.context }
      ];
      setConversation(updatedConversation);
      setConversationHistory(selectedSeries, updatedConversation); // Update localStorage
      setConversationId(answer.conversation_id); // Update conversation ID
      conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error getting answer:', error);
      setErrorMessage('Unable to connect to Story Sage. Please try again later.');
      setErrorDialogOpen(true);
      // Remove the user's question from the conversation since we couldn't get an answer
      setConversation([...conversation]);
      setConversationHistory(selectedSeries, [...conversation]);
    } finally {
      setConversationLoading(false);
    }
  }

  // Handle opening the dialog
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Handle confirming the deletion of the conversation
  const handleConfirmDelete = () => {
    setConversation([]);
    setConversationHistory(selectedSeries, []);
    setConversationId(null);
    handleCloseDialog();
  };

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
  };

  // Fetch series data when the component mounts
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const seriesData = await getSeries();
        setSeries(seriesData);
        const lastSeries = getLastSeries();
        // Check if lastSeries exists in the fetched data
        if (lastSeries && seriesData.some(series => series.id === lastSeries.id)) {
          setSelectedSeries(lastSeries);
          const history = getConversationHistory(lastSeries);
          setConversation(history);
          if (history.length > 0) {
            const lastEntry = history[history.length - 1];
            setSelectedBook(lastEntry.book || null);
            setSelectedChapter(lastEntry.chapter || null);
          }
        }
      } catch (error) {
        console.error('Error fetching series:', error);
        setErrorMessage("Sorry, but I'm having trouble getting into my library. Please try again later.");
        setErrorDialogOpen(true);
      }
    };

    fetchSeries();
  }, []);

  // Scroll to the end of the conversation when it updates
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  // Render the component
  return (
    <>
      <PageHeader pageName="Story Sage" />
      <PageWrapper>
        <Box sx={{ paddingBottom: 4 }}>
          <Typography variant="introMessage">
            Welcome to Story Sage! I'm an AI that can answer questions about books without
            give you spoilers. I'm pretty smart, but I may not always be accurate or complete.
            If you see something strange, click the thumbs down button to let my creator know!
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
          conversationId={conversationId}
          loadingMessage={loadingMessages[currentLoadingMessage]}
          questionInputRef={questionInputRef}
        />
        <Box sx={{ 
          marginTop: 4,
          paddingTop: 2,
          borderTop: 1,
          textAlign: 'center'
        }}>
        <Typography variant="body2" color="text.secondary">
          Made with ❤️ (and GitHub Copilot) by Chris Patten. &copy; {new Date().getFullYear()}
        <br />
        <a href="https://github.com/ChrisPatten/story_sage" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i> Check this out on GitHub
        </a>
        </Typography>
      </Box>
      <CoffeeWidget 
        scale={0.8} 
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
      <Dialog open={errorDialogOpen} onClose={handleCloseErrorDialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}