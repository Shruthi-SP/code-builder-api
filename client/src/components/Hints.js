import HintsHighlight from "./HintsHighlight"

const Hint = (props) => {
    const { hints, arrHints, isFocused, handleHintFocusEnter, handleHintFocusLeave } = props
    
    return (
        <div style={{ marginLeft: '25px' }}>
            <h4 style={{ marginBottom: '0px', marginTop: '0px' }}>Hints</h4>
            <ol>
               {
                hints.map((ele, i)=>{
                    return <HintsHighlight key={i} hint={ele} same={arrHints && arrHints.includes(ele)} isFocused={isFocused} handleHintFocusEnter={handleHintFocusEnter} handleHintFocusLeave={handleHintFocusLeave} num={i+1} />
                })
            } 
            </ol>
        </div>
    )
}
export default Hint