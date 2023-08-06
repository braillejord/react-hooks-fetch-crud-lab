import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(r => r.json())
      .then(data => setQuestions(data))
  }, [])

  function onDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE'
    })
    const updatedQuestions = questions.filter((question) => {
      if (question.id !== id) {
        return true;
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
            onDelete={onDelete} />
        ))
        }
      </ul>
    </section>
  );
}

export default QuestionList;
