import { useState } from "react"

const HintsHighlight = (props) => {
    const { hint, same, isFocused, handleHintFocusEnter, handleHintFocusLeave } = props
    //console.log(hint, same)
    const [underline, setUnderline] = useState(false)

    const handleMouseEnter = (e, hint) => {
        setUnderline(true)
        handleHintFocusEnter(e, hint)
    }
    const handleMouseLeave = (e, hint) => {
        setUnderline(false) 
        handleHintFocusLeave(e, hint)
    }

    return (
        <li
            style={{ textDecorationLine: (underline || (same && isFocused)) && 'underline' }}
            onMouseEnter={(e) => { handleMouseEnter(e, hint) }}
            onMouseLeave={(e) => { handleMouseLeave(e, hint) }}
        >
            {hint}
        </li>
    )
}
export default HintsHighlight