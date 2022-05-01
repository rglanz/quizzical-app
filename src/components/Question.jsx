import React from 'react'
import {nanoid} from 'nanoid'

function Question(props) {
    return(
        <p className="question-text" dangerouslySetInnerHTML={{__html: props.question}}>
        </p>
    )
}

export default Question
