class QuestionHistory {
  constructor() {
    this.questions = [];
    this.currentIndex = -1;
  }

  add(question) {
    this.questions.push(question);
    this.currentIndex = this.questions.length;
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.questions[this.currentIndex];
    }
    return this.questions[0] || '';
  }

  next() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      return this.questions[this.currentIndex];
    }
    return '';
  }
}

export default QuestionHistory;
