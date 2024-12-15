const axios = require('axios');

async function getAnswer(question, bookNumber, chapterNumber, seriesId) {
  try {
    const response = await axios.post('https://rapid-terribly-shrew.ngrok-free.app/invoke', {
      question,
      book_number: bookNumber,
      chapter_number: chapterNumber,
      series_id: seriesId
    }, {
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
