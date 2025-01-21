import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Crafting your story...",
  "Weaving narrative threads...",
  "Developing characters...",
  "Building the world...",
  "Adding dramatic tension...",
  "Polishing the prose...",
  "Turning the page…",
  "Decoding plot points…",
  "Summoning literary insights…",
  "Consulting the narrative oracle…",
  "Extracting metaphorical meaning…",
  "Parsing plot twists…",
  "Analyzing character arcs…",
  "Brewing literary wisdom…",
  "Translating subtext…",
  "Unraveling symbolic threads…",
  "Calibrating narrative intelligence…",
  "Assembling critical perspectives…",
  "Generating reading recommendations…",
  "Diving into the story’s depths…",
  "Connecting literary dots…"
];

const StoryGeneration: React.FC<Props> = ({ prompt, onComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * loadingMessages.length);
        setCurrentMessage(loadingMessages[randomIndex]);
      }, 3000); // Change message every 3 seconds
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isLoading]);

  const generateStory = async () => {
    setIsLoading(true);
    // ...existing code to generate story...
    setIsLoading(false);
    onComplete();
  };

  return (
    <div>
      <button onClick={generateStory}>Generate Story</button>
      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">{currentMessage}</p>
        </div>
      )}
      {/* ...existing code to display generated story... */}
    </div>
  );
};

export default StoryGeneration;
