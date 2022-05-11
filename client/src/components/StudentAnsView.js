import Break from "./tools/Break"
import Space from "./tools/Space"
import Submit from "./tools/Submit"
import Tab from "./tools/Tab"
import Control from "./tools/Control"
import { Button, Container, Grid, Tooltip, Typography } from "@mui/material"
import CodeSolution from "./CodeSolution"
import { useState } from "react"
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

const StudentAnsView = (props) => {
    const { answer, code } = props
    const [soln, setSoln] = useState(false)

    const errArr = []
    const getErrors = (obj) => {
        const ans = answer.answers.find(ele => ele.snipId === obj._id)
        if (ans.snipAnswer !== obj.answer) {
            errArr.push(`Expected ${obj.answer} instead received ${ans.snipAnswer}`)
        }
    }

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
            getErrors(ele)
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
        <Grid container>
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
            <Grid item xs={12} sm={6}>
                <Grid container direction="row">
                    {<Grid item xs sx={{ display: "flex", justifyContent: "flex-start" }}>
                        <h3 style={{ margin: '0px', marginLeft: '10px' }}><code>{soln ? 'View' : 'Errors :'}</code></h3>
                    </Grid>}
                    <Grid item xs sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button sx={{ p: 0, pr: 1, display: "flex", justifyContent: "flex-end" }} onClick={() => setSoln(!soln)}><Tooltip title={soln ? "Close solution" : "View solution"}><HistoryEduIcon /></Tooltip></Button>
                    </Grid>
                </Grid>
                {soln ? <CodeSolution obj={code} /> : <>
                    {errArr.length > 0 && <ul style={{ marginTop: '0px' }}>
                        {
                            errArr.map((ele, i) => {
                                return <li style={{ color: 'red' }} key={i}>{ele}</li>
                            })
                        }
                    </ul>}
                </>}
            </Grid>
        </Grid>
    </>
}
export default StudentAnsView