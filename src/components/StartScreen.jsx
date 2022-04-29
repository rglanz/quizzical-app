import React from 'react'
import blob1 from '../assets/yellow_blob.png'
import blob2 from '../assets/blue_blob.png'

function StartScreen(props) {
    return(
        <section className="start-section">
            <img src={blob1} id="blob-1"/>
            <img src={blob2} id="blob-2"/>
            <div className="start-box">
                <h1 className="start-title">Quizzical</h1>
                <p className="start-description">Test your knowledge with the OpenTriviaDatabase API!</p>
                <button
                    className="start-btn"
                    onClick={() => props.handleClick()}
                >Start Quiz!</button>
            </div>
        </section>
    )
}

export default StartScreen
