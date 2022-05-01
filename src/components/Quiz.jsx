import React from 'react'
import Question from './Question'
import Answer from './Answer'
import { nanoid } from 'nanoid'

function Quiz(props) {
    function selectAnswer(answerId, questionId) {
        if (props.isFinished) {
            return
        }

        props.setQuestions(prevQuestions => prevQuestions.map(question => {
            return(
                {
                    ...question,
                    answers: question.answers.map(answer => {
                        if (question.id != questionId) {
                            return answer
                        } else if (answer.id != answerId) {
                            return {...answer, isSelected: false}
                        } else if (answer.id === answerId) {
                            return {...answer, isSelected: !answer.isSelected}
                        }
                    })
                }
            )
        }))
    }

    function colorButton(answer) {
        let btnClassSuffix = ''
        if (!props.isFinished && answer.isSelected) {
            btnClassSuffix = '-selected'
        } else if (!props.isFinished && !answer.isSelected) {
            btnClassSuffix = ''
        } else if (props.isFinished && answer.isCorrect) {
            btnClassSuffix = '-correct'
        } else if (props.isFinished && !answer.isCorrect && answer.isSelected) {
            btnClassSuffix = '-incorrect'
        }

        return btnClassSuffix
    }

    const questionArray = props.questions.map(question => {
        const answers = question.answers
        return(
            <div className='question-container'>
                <Question
                    key={nanoid()}
                    question={question.question}
                />
                <div className="answers">
                    {answers.map(answer => {
                        const btnClassSuffix = colorButton(answer)
                        return(
                            <Answer
                                key={nanoid()}
                                className={'answer-btn' + btnClassSuffix}
                                answer={answer.answer}
                                question={question}
                                selectAnswer={() => selectAnswer(answer.id, question.id)}
                            />
                        )
                    })}
                </div>
                <hr className="hr" />
            </div>
        )
    })

    function calculateScore() {
        props.questions.forEach(question => {
            question.answers.forEach(answer => {
                if (answer.isSelected && answer.isCorrect) {
                    props.setScore(prevScore => prevScore + 1)
                } else {
                }
            })
        })

        props.setIsFinished(true)
    }

    const checkBtn = (
        <button
            className={'check-btn'}
            onClick={calculateScore}>
            Check answers
        </button>
    )

    const replayBtn = (
        <div className="replay-container">
            <p className="score-text">You scored {props.score} / 5!</p>
            <button
                className={'replay-btn'}
                onClick={props.startQuiz}>
                Replay?
            </button>
        </div>
    )

    return(
        <div className="main-container">
            {questionArray}
            {props.isFinished ? replayBtn : checkBtn}
        </div>
        
    )
}

export default Quiz
