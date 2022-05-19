import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Hint from "./Hints"
import Input from "./tools/Input"
import Break from "./tools/Break"
import Space from "./tools/Space"
import Submit from "./tools/Submit"
import Tab from "./tools/Tab"
import CodeSolution from "./CodeSolution"
import { Grid } from "@mui/material"
import ErrorBoundary from "./ErrorBoundary"
import Explanations from "./Explanations"
import Control from "./tools/Control"

const ShowCode = (props) => {
    const { admin, isSubmitted, handleIsSubmit, codeId, handleInputChange, handleInputBlur, handleSubmitAns, errors, string } = props

    const codeSnippet = useSelector(state => {
        const obj = state.codes.data.find(ele => ele._id === codeId)
        return obj
    })

    const getHints = (a) => {
        const ar = []
        a.forEach(ele => {
            if (ele.hasOwnProperty('hints')) {
                if (ele.hints.length > 0) {
                    for (let i = 0; i < ele.hints.length; i++) {
                        ar.push(ele.hints[i].hint)
                    }
                }
            }
        })
        return ar
    }
    const getExplanations = (a) => {
        const ar = []
        a.forEach(ele => {
            if (ele.hasOwnProperty('explanation')) {
                if (ele.explanation !== '') {
                    ar.push(ele.explanation)
                }
            }
        })
        return ar
    }

    const [code, setCode] = useState(codeSnippet || {})
    const [hints, setHints] = useState([])
    const [solution, setSolution] = useState(false)
    //const [activeStep, setActiveStep] = useState(0);
    const [explanations, setExplanations] = useState([])

    useEffect(() => {
        if (codeSnippet) {
            setCode(codeSnippet)
            const a = getHints(codeSnippet.snippets)
            setHints(a)
            const ex = getExplanations(codeSnippet.snippets)
            setExplanations(ex)
        }
        else throw new Error('I ShowCode crashed! Code is {}');
    }, [codeSnippet])

    const handleSolution = () => {
        handleIsSubmit()
        setSolution(!solution)
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
            return <Submit />
        } else if (ele.group === 'input') {
            return <Input ele={ele} isSubmitted={isSubmitted} handleInputChange={handleInputChange} handleInputBlur={handleInputBlur} />
        } else if (ele.group === 'control') {
            return <Control />
        }
    }

    return <div style={{ margin: '0px', marginLeft: '25px' }}>
        {admin ? <h3 style={{ margin: "0px", marginBottom: '10px' }}>Code Preview</h3> : <h3>Code</h3>}
        <Grid container>
            <Grid item xs={12} sm={8}>
                <div>
                    <code>
                        <b>{code.title}</b><br />
                        <b>{code.statement}</b><br />
                    </code>
                    {
                        <div style={{ margin: '5px' }}>
                            <form onSubmit={(e) => { handleSubmitAns(e) }}>
                                {code.hasOwnProperty('snippets') &&
                                    code.snippets.map((ele, i) => {
                                        return <code key={i}>{buildFor(ele)}</code>
                                    })
                                }
                            </form>
                            <br />
                        </div>
                    }
                    {errors.length > 0 && <ul>{
                        errors.map((ele, i) => {
                            return <li style={{ color: 'red' }} key={i}>{ele}</li>
                        })
                    }</ul>}
                    <h3>{string}</h3>
                    {(isSubmitted || !admin) && <button onClick={() => { handleSolution() }}>See Solution</button>}
                    {(isSubmitted || admin) && <Explanations explanations={explanations} />}
                </div>
                <div style={{
                    position: 'sticky', top: 0, padding: '5px', backgroundColor: "#cae8ca", border: '2px solid #4CAF50'
                }}>{(solution || admin) && <ErrorBoundary><CodeSolution codeId={props.codeId} obj={code} handleSolution={handleSolution} admin={admin} /></ErrorBoundary>}</div>
                <div style={{ margin: '50px auto 0px auto', padding: '10px', width: '300px', height: '2000px', color: 'white'
                }}>
                </div>
            </Grid>
            <Grid item xs={12} sm={4}>
                {hints.length > 0 && <Hint hints={hints} />}
            </Grid>
        </Grid>

    </div>
}
export default ShowCode