import React, { useState } from 'react'
import './Editor.css'
import MyText from '../MyText/MyText'

function Editor() {
    const [someText, setSomeText] = useState('hello')

    const [colour, setColour] = useState(false)
    const [fontSize, setFontSize] = useState(false)
    const [background, setBackground] = useState(false)

    const changeColour = () => {
        console.log(colour)
        setColour(!colour);
    }
    const changeFontSize = () => {
        console.log(fontSize)
        setFontSize(!fontSize);
    }
    const changeBackground = () => {
        console.log(background)
        setBackground(!background);
    }

    return (
        <div className='editor__container'>===
            <textarea
                value={someText}
                onChange={(e) => setSomeText(e.target.value)}
                className="text__field"
                type='text' />
            <div className='btn__container'>
                <button onClick={changeColour} className='btn__row'>Colour</button>
                <button onClick={changeFontSize} className='btn__row'>Font-size</button>
                <button onClick={changeBackground} className='btn__row'>Background</button>
            </div>
           <MyText someText={someText} colour={colour} fontSize={fontSize} background={background}/>

        </div>
    )
}

export default Editor
