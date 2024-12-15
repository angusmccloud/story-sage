export default function getConversationHistory(series) {
  const history = localStorage.getItem(`conversationHistory_${series}`);
  return history ? JSON.parse(history) : [];
}
