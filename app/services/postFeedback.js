const axios = require('axios');

async function postFeedback(requestId, type) {
  try {
    const response = await axios.post('https://rapid-terribly-shrew.ngrok-free.app/feedback', {
      request_id: requestId,
      type: type,
      feedback: '',
    }, {
      headers: {
        "ngrok-skip-browser-warning": "skip"
      },
      crossDomain: true
    });
    return response.status === 200;
  } catch (error) {
    console.error('Failed to post feedback:', error);
    return false;
  }
}

module.exports = postFeedback;
