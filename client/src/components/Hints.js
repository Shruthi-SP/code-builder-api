import HintsHighlight from "./HintsHighlight"

const Hint = (props) => {
    const { hints, arrHints, isFocused, handleHintFocusEnter, handleHintFocusLeave } = props
    console.log('hints props=', hints, arrHints)
    //const [underline, setUnderline] = useState(false)
    return (
        <div style={{ marginLeft: '75px' }}>
            <h4 style={{ marginBottom: '0px' }}>Hints</h4>
            {
                hints.map((ele, i)=>{
                    return <HintsHighlight key={i} hint={ele} same={arrHints && arrHints.includes(ele)} isFocused={isFocused} handleHintFocusEnter={handleHintFocusEnter} handleHintFocusLeave={handleHintFocusLeave} />
                })
            }
            {/* <ul>
                {
                    hints.map((ele, i) => {
                        return <li key={i}
                            style={{ textDecorationLine: underline && 'underline' }}
                            onMouseEnter={(e) => { setUnderline(true) }}
                            onMouseLeave={(e) => { setUnderline(false) }}
                        >
                            {ele}
                        </li>
                    })
                }
            </ul> */}
        </div>
    )
}
export default Hint