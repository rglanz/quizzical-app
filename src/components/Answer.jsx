import React from 'react'
import {nanoid} from 'nanoid'

function Answers(props) {
    return(
        <button className={props.className} onClick={props.selectAnswer}
        dangerouslySetInnerHTML={{__html :props.answer}}>
        </button>
    )
}

export default Answers
