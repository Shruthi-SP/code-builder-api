import Break from "./tools/Break"
import Space from "./tools/Space"
import Submit from "./tools/Submit"
import Tab from "./tools/Tab"
import Control from "./tools/Control"
import { Container, Grid } from "@mui/material"
import CodeSolution from "./CodeSolution"

const StudentAnsView = (props) => {
    const { answer, code } = props
    console.log('view ans props', props)
    const buildFor = (ele, solution) => {
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
            return solution ? ele.answer : <input
                style={{ border: (ele.answer === answer.answers.find(e => e.snipId === ele._id).snipAnswer ? '2px solid green' : '2px solid red') }}
                disabled={true}
                value={answer.answers.find(e => e.snipId === ele._id).snipAnswer}
                //size={answer.answers.find(e => e.snipId === ele._id).snipAnswer.length}
                size={ele.answer.length}
            />
        } else if (ele.group === 'control') {
            return <Control />
        }
    }
    return <>
        <Grid container sx={{m:1}}>
            <Grid item xs={12} sm={6} >
                <h3 style={{ margin: '0px' }}><code>Title: {code.title}</code></h3>
                <code><b>Statement: {code.statement}</b></code><br />
                <code><b>Points: {code.snippets.filter(e => e.group === 'input').length}</b></code><br />
                {
                    code.snippets.map((ele, i) => {
                        return <code key={i}>{buildFor(ele)}</code>
                    })
                }
            </Grid>
            {/* <Grid item xs={12} sm={6} >
                <h3><code>Solution</code></h3>
                {
                    code.snippets.map((ele, i)=>{
                        return <code key={i}>{buildFor(ele, 'solution')}</code>
                    })
                }
            </Grid> */}
        </Grid>

    </>
}
export default StudentAnsView