import { useState } from 'react'
const Input = (props) => {
    const { isSubmitted, ele, handleInputChange, handleInputBlur, handleInputFocusEnter, handleInputFocusLeave, isFocused } = props
    console.log('i/p=', ele, isFocused)
    const [highlight, setHighlight] = useState(false)

    const handleMouseEnter = (e, ele) => {
        setHighlight(true)
        handleInputFocusEnter(e, ele)
    }
    const handleMouseLeave = (e, ele) => {
        setHighlight(false)
        handleInputFocusLeave(e, ele)
    }
    return <input
        // style={{border: 'none', borderBottom: isSubmitted ? (ele.answer===ele.value? '2px solid green' : '2px solid red') : '1px solid blue'}}
        style={{ border: (isSubmitted ? (ele.answer === ele.value ? '2px solid green' : '2px solid red') : '1px solid black'), width: (ele.answer.length) * 6 + 'px', border: highlight && '2px solid blue' }}
        type='text'
        name='inputText'
        value={ele.value}
        onChange={(e) => { handleInputChange(e, ele) }}
        //size={ele.answer.length}
        onBlur={(e) => { handleInputBlur(e, ele) }}
        onMouseOver={(e) => { handleMouseEnter(e, ele) }}
        onMouseLeave={(e) => { handleMouseLeave(e, ele) }}
        disabled={ele.isDisable}
    />
}
export default Input