import React from 'react'
import './MyText.css'

function MyText({someText, colour, fontSize, background}) {

    return (
        <div className={'text__value'} >
        <span className={(colour && 'yellow') + ' ' + (fontSize && 'font__size') + ' ' + (background && 'background__colour')}>
            {someText}
        </span>
    </div>
    )
}

export default MyText
