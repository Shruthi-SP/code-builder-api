import HintsHighlight from "./HintsHighlight"

const Hint = (props) => {
    const { hints, arrHints, isFocused, handleHintFocusEnter, handleHintFocusLeave } = props
    
    return (
        <div style={{ marginLeft: '75px' }}>
            <h4 style={{ marginBottom: '0px' }}>Hints</h4>
            {
                hints.map((ele, i)=>{
                    return <HintsHighlight key={i} hint={ele} same={arrHints && arrHints.includes(ele)} isFocused={isFocused} handleHintFocusEnter={handleHintFocusEnter} handleHintFocusLeave={handleHintFocusLeave} />
                })
            }
        </div>
    )
}
export default Hint