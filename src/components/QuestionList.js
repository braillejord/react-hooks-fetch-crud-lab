import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(r => r.json())
      .then(data => setQuestions(data))
  }, [])

  function deleteQuestion(id) {
    const updatedQuestions = questions.filter((question) => {
      if (question.id !== id) {
        return true;
      }
    })
    setQuestions(updatedQuestions)
  }

  function onAnswerChange(updatedQuestion) {
    const updatedQuestions = questions.map((question) => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion;
      } else {
        return question;
      }
    })
    setQuestions(updatedQuestions)
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            id={question.id}
            prompt={question.prompt}
            answers={question.answers}
            correctIndex={question.correctIndex}
            deleteQuestion={deleteQuestion}
            changeAnswer={onAnswerChange}
          />
        ))
        }
      </ul>
    </section>
  );
}

export default QuestionList;
