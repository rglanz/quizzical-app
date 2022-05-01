import React from 'react'
import StartScreen from './components/StartScreen'
import Quiz from './components/Quiz'
import {nanoid} from 'nanoid'

function App() {
  // State
  const [isStarted, setIsStarted] = React.useState(false)
  const [isFinished, setIsFinished] = React.useState(false)
  const [questions, setQuestions] = React.useState([])
  const [score, setScore] = React.useState(0)

  // Functions
  function startQuiz() {
    fetchAPI('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
    setIsStarted(true)
    setIsFinished(false)
    setScore(0)
  }

  function fetchAPI(url) {
    fetch(url)
      .then(res => res.json())
      .then(data => formatQuestions(data.results))
  }

  function formatQuestions(data) {
    const questionArray = data.map(question => {
      return {
        id: nanoid(),
        question: question.question,
        answers: [
          ...question.incorrect_answers.map(answer => {
            return {
              id: nanoid(),
              answer: answer,
              isCorrect: false,
              isSelected: false
            }
          }),
          {
            id: nanoid(),
            answer: question.correct_answer,
            isCorrect: true,
            isSelected: false
          }
        ].sort(() => Math.random() - 0.5)   // not truly random
      }
    })

    setQuestions(questionArray)
  }
  
  return(
    <div>
      {isStarted ? (
        <Quiz
          questions={questions}
          setQuestions={setQuestions}
          score={score}
          setScore={setScore}
          startQuiz={startQuiz}
          isFinished={isFinished}
          setIsFinished={setIsFinished}
        />
      ) : (
        <StartScreen
          handleClick={startQuiz}
        />
      )}
    </div>
  )
}

export default App
