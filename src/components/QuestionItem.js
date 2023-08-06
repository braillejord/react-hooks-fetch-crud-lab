import React from "react";

function QuestionItem({ id, prompt, answers, correctIndex, deleteQuestion, changeAnswer }) {
  // const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE'
    })
    deleteQuestion(id)
  }

  function handleAnswerChange(e, id) {
    const newAnswer = parseInt(e.target.value)

    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }, body: JSON.stringify({
        correctIndex: newAnswer
      })
    })
      .then(r => r.json())
      .then(updatedQuestion => changeAnswer(updatedQuestion))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={(e) => handleAnswerChange(e, id)}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
