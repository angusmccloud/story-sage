const axios = require('axios');

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function postFeedback(requestId, type, conversationId) {
  try {
    const response = await axios.post(`${backendUrl}/feedback`, {
      request_id: requestId,
      type: type,
      feedback: '',
      conversation_id: conversationId
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
