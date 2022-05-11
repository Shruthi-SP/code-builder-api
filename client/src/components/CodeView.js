import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncGetCode } from "../actions/codesAction"
import { Button, Grid, Box, Paper, Container, Dialog, DialogContent, DialogActions } from "@mui/material"
import ErrorBoundary from "./ErrorBoundary"
import axios from "../config/axios-config"
import CodeSolution from "./CodeSolution"
import Input from "./tools/Input"
import Break from "./tools/Break"
import Space from "./tools/Space"
import Submit from "./tools/Submit"
import Tab from "./tools/Tab"
import Explanations from "./Explanations"
import Hint from "./Hints"
import { withRouter } from "react-router-dom"
import Swal from 'sweetalert2'
import Control from "./tools/Control"

const CodeView = (props) => {
    const user = useSelector(state => {
        return state.user
    })
    const admin = user.role === 'admin' ? true : false
    //console.log('cs admin', admin)
    const _id = props.match.params.id

    // const [codeToggle, setCodeToggle] = useState(false)
    // const [snippetToggle, setSnippetToggle] = useState(false)
    const [obj, setObj] = useState({})
    const [arraySnippet, setArraySnippet] = useState([])
    const [solution, setSolution] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [string, setString] = useState('')
    const [errors, setErrors] = useState([])
    //const [hints, setHints] = useState([])
    const [explanations, setExplanations] = useState([])
    const [start, setStart] = useState(true)
    const [prev, setPrev] = useState(false)
    const [nxt, setNxt] = useState(false)
    const [count, setCount] = useState(0)
    const [studHints, setStudHints] = useState([])
    const [isFocused, setIsFocused] = useState(false)
    const [arrHints, setArrHints] = useState([])
    const [hintFocus, setHintFocus] = useState(false)
    const [focusedObj, setFocusedObj] = useState({})
    const [points, setPoints] = useState(0)
    const [hintNum, setHintNum] = useState(0)
    const [errOpen, setErrOpen] = useState(false)

    const handleErrClose = () => {
        setErrOpen(false)
    }

    const getResult = (object) => {
        if (Object.keys(object).length > 0) {
            setObj(object)
            let cs = JSON.parse(localStorage.getItem(_id))
            if (cs && cs.length > 0) {
                setArraySnippet(cs)
                setPoints(cs.filter(ele => ele.group == 'input').length)
            } else {
                setArraySnippet(object.snippets)
                setPoints(object.snippets.filter(ele => ele.group === 'input').length)
            }
            const h = getHints(object.snippets)
            //setHints(h)
            const ex = getExplanations(object.snippets)
            setExplanations(ex)
        }
        else throw new Error('Code Snippets crashed, couldnt get the obj')
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asyncGetCode(_id, getResult))
    }, [])

    useEffect(() => {
        return () => {
            if (localStorage.user_inputs) {
                localStorage.setItem(_id, localStorage.user_inputs)
                localStorage.removeItem('user_inputs')
            }
        }
    }, [])

    window.onload = (e) => {
        if (localStorage.user_inputs) {
            setArraySnippet(JSON.parse(localStorage.getItem('user_inputs')))
        }
    }

    const handleHintFocusEnter = (e, hint) => {
        setHintFocus(true)
        //console.log('hint enter=')
        const obj = arraySnippet.find(ele => ele.hints.find(e => e.hint === hint))
        //console.log(obj)
        if (obj) {
            setFocusedObj(obj)
            const hintInd = studHints.findIndex(ele => ele === hint)
            setHintNum(hintInd + 1)
        }
    }
    const handleHintFocusLeave = (e, hint) => {
        setHintFocus(false)
        setFocusedObj({})
        setHintNum(0)
        //console.log('hint leave=', hint)
    }
    const handleInputFocusEnter = (e, ele) => {
        setIsFocused(true)
        //console.log('focus enter=', ele)
        const arrHin = []
        ele.hints.forEach(e => {
            if (studHints.includes(e.hint)) {
                arrHin.push(e.hint)
                setHintNum(studHints.indexOf(e.hint) + 1)
            }
        })
        //console.log(arrHin)
        setArrHints(arrHin)
    }
    const handleInputFocusLeave = (e, ele) => {
        setIsFocused(false)
        setHintNum(0)
        //console.log('focus leave=', ele)
    }

    const handleInputChange = (e, ele) => {
        const arr = [...arraySnippet]
        const result = arr.find(element => element._id === ele._id)
        result.value = e.target.value.trim()
        localStorage.setItem('user_inputs', JSON.stringify(arr))
        setArraySnippet(arr)
    }
    const handleInputBlur = (e, ele) => {
        const arr = [...arraySnippet]
        const result = arr.find(element => element._id === ele._id)
        result.isDisable = true
        localStorage.setItem('user_inputs', JSON.stringify(arr))
        setArraySnippet(arr)
    }
    const handleIsSubmit = () => {
        setIsSubmitted(false)
    }
    const handleSubmitAns = (e) => {
        e.preventDefault()
        const arr = arraySnippet.filter(ele => ele.group === 'input')
        let n = arr.length
        let err = []
        let answers = []
        arr.forEach(ele => {
            answers.push({ snipId: ele._id, snipAnswer: ele.value })
            if (ele.answer !== ele.value) {
                n--
                ele.value.trim() === '' ? err.push(`Expected ${ele.answer} instead Received empty`) :
                    err.push(`Expected ${ele.answer} instead Received ${ele.value}`)
            }
        })
        const studentId = user.id
        const str = `Score ${n}/${arr.length}`
        const formData = {
            codeId: _id,
            studentId: studentId,
            answers: answers,
            score: str
        }
        if (!admin) {
            axios.post('/answers', formData)
                .then(response => {
                    if (response.hasOwnProperty('errors')) {
                        //alert(errors.message)
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: response.errors,
                            footer: ''
                        })
                    }
                    else {
                        //alert('answer submitted')
                        Swal.fire({
                            icon: 'success',
                            title: 'Submitted',
                            text: 'answer submitted',
                            footer: ''
                        })
                    }

                })
                .catch(err => {
                    //alert(err.message)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.message,
                        footer: ''
                    })
                })
        }
        setIsSubmitted(true)
        setErrors(err)
        setString(str)
        setErrOpen(true)
        //localStorage.removeItem('user_inputs')
        localStorage.removeItem(_id)
    }
    const handleStart = (e) => {
        e.preventDefault()
        setStart(!start)
        setPrev(true)
        const a = obj.snippets.find(ele => ele.group === 'control')
        const index = obj.snippets.findIndex(ele => ele.group === 'control')
        const h = getHints(obj.snippets.slice(0, index + 1))
        setStudHints(h)
        setCount(index + 1)
    }

    const handleNext = (e) => {
        e.preventDefault()
        setPrev(false)
        //console.log('count=', count)
        if (count + 1 < obj.snippets.length) {
            const ob = obj.snippets[count + 1]
            if (ob.displayOrder < ob.id) {
                //console.log('inside handle nxt', obj.snippets[count])
                const sortA = [...obj.snippets].sort((a, b) => a.displayOrder - b.displayOrder)
                //console.log('sortA', sortA)
                setArraySnippet(sortA)
                setCount(count + 1)
                const h = getHints(sortA.slice(0, count + 1))
                setStudHints(h)
                setCount(count + 1)
            }
        }
        if (count < obj.snippets.length) {
            const o = obj.snippets.slice(count).find(ele => ele.group === 'control')
            if (o) {
                //let index = a.id + 1
                const a = obj.snippets.findIndex(ele => ele._id === o._id)
                let index = a + 1
                const h = getHints(obj.snippets.slice(0, index))
                setStudHints(h)
                setCount(index)
            } else {
                setCount(obj.snippets.length)
                const h = getHints(obj.snippets)
                setStudHints(h)
                setNxt(true)
            }
        } else {
            setCount(obj.snippets.length)
            const h = getHints(obj.snippets)
            setStudHints(h)
            setNxt(true)
        }
    }
    const handlePrevious = (e) => {
        e.preventDefault()
        setNxt(false)
        const arr = [...obj.snippets].reverse()
        if (count > 0) {
            //const a = arr.slice((arr.length) - (count - 1)).find(ele => ele.group === 'input')
            const o = arr.slice((arr.length) - (count - 1)).find(ele => ele.group === 'control')
            if (o) {
                //let index = a.id + 1
                const a = obj.snippets.findIndex(ele => ele._id === o._id)
                let index = a + 1
                const h = getHints(obj.snippets.slice(0, index))
                setStudHints(h)
                setCount(index)
            } else {
                setCount(count)
                setPrev(true)
            }
        } else {
            setCount(count)
            setPrev(true)
        }
    }

    const handleSolution = () => {
        //handleIsSubmit()
        setSolution(!solution)
    }

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
    const buildForStudent = (ele) => {
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
            return <Submit isSubmitted={isSubmitted} />
        } else if (ele.group === 'input') {
            return <Input ele={ele} isSubmitted={isSubmitted} handleInputChange={handleInputChange} handleInputBlur={handleInputBlur} handleInputFocusEnter={handleInputFocusEnter} handleInputFocusLeave={handleInputFocusLeave} hintFocus={hintFocus} focusedObj={focusedObj} num={hintNum} />
        } else if (ele.group === 'control') {
            return <Control />
        }
    }

    return <Container>
        <h3>{admin ? 'Student view' : 'Solve'}</h3>
        {/* <h2>Sibling of CodeSnippetForm component</h2> */}
        {Object.keys(obj).length > 0 && <Grid container>
            <Grid item xs={12} sm={6}>
                <div>
                    <h3 style={{ margin: '0px' }}><code>Title: {obj.title}</code></h3>
                    <h4 style={{ margin: '0px' }}><code>Statement: {obj.statement}</code></h4>
                    <h5 style={{ margin: '0px' }}><code>Points: {points}</code></h5>

                    {errors.length > 0 && <>
                        {/* <Dialog open={errOpen} onClose={handleErrClose}>
                            <DialogContent> */}
                        <h3 style={{marginBottom:'0px'}} >{string}</h3>
                        <ul style={{margin:'0px'}} >{
                            errors.map((ele, i) => {
                                return <li style={{ color: 'red' }} key={i}>{ele}</li>
                            })
                        }</ul>
                        {/* </DialogContent> */}
                        {/* <DialogActions><Button onClick={handleErrClose}>No</Button></DialogActions> */}
                        {/* </Dialog> */}
                    </>}

                    <Box sx={{ m: 1, ml: 0 }}>
                        <Paper elevation={3} sx={{ p: 1, backgroundColor: '#F8F9F9' }}>
                            {start && <Button variant="contained" size="small" onClick={(e) => { handleStart(e) }}>start</Button>}
                            {
                                <div style={{ margin: '5px' }}>
                                    <form onSubmit={(e) => { handleSubmitAns(e) }}>
                                        {obj.hasOwnProperty('snippets') &&

                                            arraySnippet.slice(0, count).map((ele, i) => {
                                                return <code key={i}>{buildForStudent(ele)}</code>
                                            })
                                        }
                                        <br /><br />
                                        {!start && <><Button sx={{ mr: 1 }} variant="contained" size="small" disabled={prev} onClick={(e) => { handlePrevious(e) }}>Previous</Button>
                                            <Button variant="contained" size="small" disabled={nxt} onClick={(e) => { handleNext(e) }}>Next</Button></>}
                                    </form>
                                    <br />
                                </div>
                            }
                        </Paper>
                    </Box>
                </div>

                {(isSubmitted || admin) && <Button variant="contained" size="small" onClick={handleSolution}>See Solution</Button>}

                {(solution) && <Dialog open={solution} onClose={handleSolution}>
                    <DialogContent>
                        <ErrorBoundary><CodeSolution codeId={props.codeId} obj={obj} handleSolution={handleSolution} admin={admin} /></ErrorBoundary>
                    </DialogContent>
                    <DialogActions><Button size="small" onClick={handleSolution}>Close</Button></DialogActions>
                </Dialog>}

                {((isSubmitted || admin) && (explanations.length > 0)) && <Explanations explanations={explanations} />}
            </Grid>
            <Grid item xs={12} sm={6}>
                {studHints.length > 0 && <Hint hints={studHints} arrHints={arrHints} isFocused={isFocused} handleHintFocusEnter={handleHintFocusEnter} handleHintFocusLeave={handleHintFocusLeave} />}
            </Grid>
        </Grid>}
    </Container>
}
export default withRouter(CodeView)