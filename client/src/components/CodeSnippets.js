import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import CodeSnippetForm from "./CodeSnippetForm"
import { buildFor } from "./tools/helper"
import { asyncDeleteCode, asyncGetCode } from "../actions/codesAction"
import EditCode from "./EditCode"
import { Button, ButtonGroup, Typography, Box, Paper, Dialog, DialogActions, DialogContent } from "@mui/material"
import { Delete, Edit, Add } from "@mui/icons-material"
import ErrorBoundary from "./ErrorBoundary"
import { withRouter } from "react-router-dom"
import CodePreview from "./CodePreview"
import CodeView from "./CodeView"

const CodeSnippets = (props) => {
    const user = useSelector(state => {
        return state.user
    })
    const admin = user.role === 'admin' ? true : false
    //console.log('cs admin', admin)
    const _id = props.match.params.id

    const [codeToggle, setCodeToggle] = useState(false)
    const [snippetToggle, setSnippetToggle] = useState(false)
    const [obj, setObj] = useState({})
    const [arraySnippet, setArraySnippet] = useState([])
    const [remove, setRemove] = useState(false)
    const [points, setPoints] = useState(0)

    const getResult = (object) => {
        if (Object.keys(object).length > 0) {
            setObj(object)
            let cs = JSON.parse(localStorage.getItem(_id))
            if (cs && cs.length > 0) {
                setArraySnippet(cs)
                setPoints(cs.filter(ele=>ele.group=='input').length)
            } else {
                setArraySnippet(object.snippets)
                setPoints(object.snippets.filter(ele=>ele.group==='input').length)
            }
        }
        else throw new Error('Code Snippets crashed, couldnt get the obj')
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asyncGetCode(_id, getResult))
    }, [codeToggle, snippetToggle])

    
    const redirect = () => {
        props.history.push('/codes')
    }

    const handleEditSnippets = () => {
        setSnippetToggle(!snippetToggle)
    }
    const handleEditCode = (e) => {
        setCodeToggle(!codeToggle)
    }
    const handleCancelCode = () => {
        setCodeToggle(false)
    }
    const handleRemoveCode = (e) => {
        setRemove(true)
        //dispatch(asyncDeleteCode(_id, redirect))
    }

    const handleYes = () => {
        dispatch(asyncDeleteCode(_id, redirect))
        setRemove(false)
    }
    const handleClose = () => {
        setRemove(false)
    }

    return (
        <div>
            {
                (admin && Object.keys(obj).length > 0) && <div style={{ margin: '5px' }}>
                    <h3>Admin view</h3>
                    <Typography variant="h5" color="primary.dark">Code and Snippets</Typography>
                    {snippetToggle ? <>
                        <ErrorBoundary><CodeSnippetForm admin={admin} codeId={_id} {...props} obj={obj} handleEditSnippets={handleEditSnippets} /></ErrorBoundary>
                    </>
                        : <div>
                            {
                                codeToggle ? <EditCode code={obj} handleEditCode={handleEditCode} handleCancelCode={handleCancelCode} /> : <>
                                    <h3 style={{ margin: '0px' }}><code>Title: {obj.title}</code></h3>
                                    <code><b>Statement: {obj.statement}</b></code><br />
                                    <code><b>Points: {points}</b></code><br />
                                </>
                            }
                            {
                                arraySnippet.length > 0 && <Box sx={{ width: '50%', m: 1 }}>
                                    <h4 style={{ margin: '3px' }}>Code</h4>
                                    <Paper elevation={3} sx={{ p: 1, backgroundColor: '#F8F9F9' }} >
                                        {
                                            arraySnippet.map((ele, i) => {
                                                return <code key={i}>
                                                    {buildFor(ele)}
                                                </code>
                                            })
                                        }
                                    </Paper>
                                </Box>
                            }
                            <br />
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <Button sx={{ mr: 1 }} startIcon={<Edit />} onClick={handleEditCode}>Edit Code</Button>
                                <Button sx={{ mr: 1 }} startIcon={<Delete />} onClick={handleRemoveCode}>Remove Code</Button>
                                <Button startIcon={<><Edit /><Add /></>} onClick={handleEditSnippets}>Snippets</Button>
                            </ButtonGroup><br />
                            {/* <Button onClick={handlePreview}>{preview ? 'Close Preview' : 'Show Preview'}</Button> */}
                            {remove && <Dialog open={remove} onClose={handleClose}>
                                <DialogContent>Are you sure want to delete?</DialogContent>
                                <DialogActions><Button onClick={(e) => { handleYes(e) }}>Yes</Button><Button onClick={handleClose}>No</Button></DialogActions>
                            </Dialog>}
                        </div>
                    }
                </div>
            }
            {admin ? <CodePreview /> : <CodeView/> }
        </div>
    )
}
export default withRouter(CodeSnippets)