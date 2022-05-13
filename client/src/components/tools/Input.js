import { Tooltip } from '@mui/material'
import { useState } from 'react'
const Input = (props) => {
    const { isSubmitted, ele, handleInputChange, handleInputBlur, handleInputFocusEnter, handleInputFocusLeave, hintFocus, focusedObj, num } = props

    const [highlight, setHighlight] = useState(false)
    const [enter, setEnter] = useState(false)

    const handleMouseEnter = (e, ele) => {
        setHighlight(true)
        if (handleInputFocusEnter) {
            handleInputFocusEnter(e, ele)
        }

    }
    const handleMouseLeave = (e, ele) => {
        setHighlight(false)
        if (handleInputFocusLeave) {
            handleInputFocusLeave(e, ele)
        }
    }
    return <>
        <Tooltip title={num ? num : ''}>
            <input
                style={{ width: ((ele.answer.length) * 6 + 1) + 'px', border: (enter && '2px solid #6da9df') || ((highlight || (hintFocus && ele.id === focusedObj.id)) && '2px solid blue') || (isSubmitted ? (ele.answer === ele.value ? '2px solid green' : '2px solid red') : '1px solid black'), cursor: highlight && 'default' }}
                type='text'
                name='inputText'
                value={ele.value}
                onChange={(e) => { handleInputChange(e, ele); setEnter(true) }}
                //size={ele.answer.length}
                onBlur={(e) => { handleInputBlur(e, ele); setEnter(false) }}
                onMouseOver={(e) => { handleMouseEnter(e, ele) }}
                onMouseLeave={(e) => { handleMouseLeave(e, ele) }}
                disabled={ele.isDisable}
            />
        </Tooltip>
    </>
}
export default Input