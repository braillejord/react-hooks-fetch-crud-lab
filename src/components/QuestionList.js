import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState()

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(r => r.json())
      .then(data => setQuestions(data))
  }, [])

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions?.map((question) => (
          <QuestionItem
            key={question.id}
            id={question.id}
            prompt={question.prompt}
            answers={question.answers}
            correctIndex={question.correctIndex} />
        ))
        }
      </ul>
    </section>
  );
}

export default QuestionList;
