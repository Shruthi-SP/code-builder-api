const Input = (props) => {
    const { isSubmitted, ele, handleInputChange, handleInputBlur } = props
    return <input
        // style={{border: 'none', borderBottom: isSubmitted ? (ele.answer===ele.value? '2px solid green' : '2px solid red') : '1px solid blue'}}
        style={{ border: isSubmitted ? (ele.answer===ele.value? '2px solid green' : '2px solid red') : '1px solid black', width: (ele.answer.length)*6+'px' }}
        type='text'
        name='inputText'
        value={ele.value}
        onChange={(e) => { handleInputChange(e, ele) }}
        //size={ele.answer.length}
        onBlur={(e) => {handleInputBlur(e, ele)}}
        disabled={ele.isDisable}
    />
}
export default Input