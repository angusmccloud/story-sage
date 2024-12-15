export default function setConversationHistory(series, conversation) {
  localStorage.setItem(`conversationHistory_${series}`, JSON.stringify(conversation));
}
