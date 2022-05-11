//import { useSelector } from "react-redux"
import Break from './tools/Break'
import Tab from "./tools/Tab"
import Space from "./tools/Space"
import Submit from "./tools/Submit"
import Control from './tools/Control'
//import ErrorBoundary from "./ErrorBoundary"

const CodeSolution = (props) => {
    const { codeId, obj, handleSolution, admin } = props
    const array = [...obj.snippets].sort((a, b) => a.displayOrder - b.displayOrder)

    if (Object.keys(obj).length === 0) {
        throw new Error('CodeSolution crashed. no code obj')
    }

    const buildFor = (ele) => {
        if (ele.group === 'texts') {
            return ele.value
        } else if (ele.group === 'break') {
            return <Break />
        } else if (ele.group === 'tab') {
            return <Tab />
        } else if (ele.group === 'doubleTab') {
            return <><Tab /><Tab /></>
        } else if (ele.group === 'space') {
            return <Space />
        } else if (ele.group === 'submit') {
            return <Submit isSubmitted={true} />
        } else if (ele.group === 'input') {
            return <code style={{ textDecorationLine: 'underline' }} ><b>{ele.answer}</b></code>
        } else if (ele.group === 'control') {
            return <Control />
        }
    }

    return <div style={{margin:'0px', marginLeft:'10px' }}>
        <h3 style={{margin: '0px'}}>Solution</h3>
        <code>
            {
                array.map(ele => {
                    return <code key={ele._id}>{buildFor(ele)}</code>
                })
            }
        </code>
        <br />
    </div>
}
export default CodeSolution