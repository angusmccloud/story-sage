const axios = require('axios');

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getAnswer(question, bookNumber, chapterNumber, seriesId, conversationId = null) {
  try {
    const requestBody = {
      question,
      book_number: bookNumber,
      chapter_number: chapterNumber,
      series_id: seriesId
    };

    if (conversationId) {
      requestBody.conversation_id = conversationId;
    }

    const response = await axios.post(`${backendUrl}/invoke`, requestBody, {
      headers: {
        "ngrok-skip-browser-warning": "skip"
      },
      crossDomain: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching answer:', error);
    throw error;
  }
}

module.exports = getAnswer;
