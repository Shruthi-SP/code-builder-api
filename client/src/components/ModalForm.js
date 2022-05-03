import { useState } from 'react';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from "react-redux"
import { asyncUpdateSnippet } from '../actions/codesAction'
import FromInput from "./FormInput"
import FormText from './FormText'

const ModalForm = (props) => {
    const {length, open,handleClose, codeId, snippet, handleCancelEdit} = props
    const dispatch = useDispatch()

    //const [editLimit, setEditLimit] = useState('')
    const [editDisplayOrder, setEditDisplayOrder] = useState(snippet.displayOrder)

    const formSubmission = (formData) => {
        dispatch(asyncUpdateSnippet(codeId, snippet._id, formData))
        handleCancelEdit()
    }
    // const handleSetLimit = (e) => {
    //     e.preventDefault()
    //     const formData = {
    //         limit: editLimit
    //     }
    //     formSubmission(formData)
    // }
    const handleSetDisplayOrder = (e) => {
        e.preventDefault()
        const formData = {
            displayOrder: editDisplayOrder
        }
        formSubmission(formData)
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Snippet</DialogTitle>
                <DialogContent>
                    {snippet.group === 'texts' && <FormText length={length} {...snippet} formSubmission={formSubmission} handleCancelEdit={handleCancelEdit} />}

                    {snippet.group === 'input' && <FromInput length={length} {...snippet} formSubmission={formSubmission} handleCancelEdit={handleCancelEdit} />}

                    {(snippet.group === 'break' || snippet.group === 'space' || snippet.group === 'tab' || snippet.group === 'doubleTab' || snippet.group === 'submit' || snippet.group === 'control') && <><TextField label='Enter display order here' variant='outlined' type='text' value={editDisplayOrder} placeholder="Change display order" onChange={(e) => { setEditDisplayOrder(e.target.value) }} /><br /><br />
                        <Button sx={{ mr: 1 }} variant="contained" size="small" onClick={handleSetDisplayOrder}>Set</Button>
                        <Button variant="contained" size="small" onClick={() => { handleCancelEdit() }}>Cancel</Button></>}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default ModalForm