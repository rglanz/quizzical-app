import React from 'react'
import StartScreen from './components/StartScreen'
import Question from './components/Question'
import {nanoid} from 'nanoid'

function App() {
  // State
  const [isStarted, setIsStarted] = React.useState(false)
  const [questions, setQuestions] = React.useState([])

  // Effects
  React.useEffect(() => {
    if (isStarted) {
      pullAPI()
    }
  }, [isStarted])

  // Functions
  function startQuiz() {
    setIsStarted(true)
  }

  function pullAPI() {
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
      .then(res => res.json())
      .then(data => setQuestions(data.results))
  }

  function makeQuestion(question) {
    const correctAnswer = question.correct_answer
    let answers = question.incorrect_answers
    answers.push(correctAnswer)

    let shuffled = answers
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)

    return(
      {
        id: nanoid(),
        question: question.question,
        answers: shuffled,
        correctAnswer: shuffled.indexOf(correctAnswer)
      }
    )
  }

  // Elements
  const questionList = questions.map(question => {
    const data = makeQuestion(question)
    return(
      <Question 
        key={data.id}
        id={data.id}
        answers={data.answers}
        correctAnswer={data.correctAnswer}
      />
    )
  })

  return(
    <div>
      {!isStarted && <StartScreen handleClick={startQuiz}/>}
      {isStarted && questionList}
    </div>
  )
}

export default App
