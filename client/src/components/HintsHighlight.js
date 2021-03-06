import { useState } from "react"

const HintsHighlight = (props) => {
    const { hint, same, isFocused, handleHintFocusEnter, handleHintFocusLeave } = props
    //console.log(hint, same)
    const [underline, setUnderline] = useState(false)

    const handleMouseEnter = (e, hint) => {
        setUnderline(true)
        if (handleHintFocusEnter) {
            handleHintFocusEnter(e, hint)
        }

    }
    const handleMouseLeave = (e, hint) => {
        setUnderline(false)
        if (handleHintFocusLeave) {
            handleHintFocusLeave(e, hint)
        }
    }

    return (
        <li
            // style={{ textDecoration: (underline || (same && isFocused)) && 'underline', background: (underline || (same && isFocused)) && '#5f0a5f', color: (underline || (same && isFocused)) && '#ffffff' }}
            onMouseEnter={(e) => { handleMouseEnter(e, hint) }}
            onMouseLeave={(e) => { handleMouseLeave(e, hint) }}
        >
            <span style={{ textDecoration: (underline || (same && isFocused)) && 'underline', background: (underline || (same && isFocused)) && '#5f0a5f', color: (underline || (same && isFocused)) && '#ffffff' }}>{hint}</span>
        </li>
    )
}
export default HintsHighlight