import { useState } from "react"
import { withRouter } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { asyncRegister} from "../../actions/userAction"
import validator from 'validator'
import { Typography, TextField, Button} from "@mui/material"

const Register = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [formErr, setFormErr] = useState({})
    const err = {}
    const dispatch = useDispatch()

    const resetForm = () => {
        setEmail('')
        setPassword('')
        setUserName('')
        setFormErr({})
    }
    const redirect = () => {
        props.history.push('/login')
    }
    
    // const getData = (obj) => {
    //     if(obj.role==='admin'){
    //         props.handleAdmin(true)
    //     }
    //     props.handleLoggedIn()
    //     props.history.push('/codes')
    //     resetForm()
    // }

    const runValidation = () => {
        if(email.trim().length === 0){
            err.email = 'email required'
        }
        else if(!validator.isEmail(email)){
            err.email = 'email format is not valid'
        }
        if(password.trim().length === 0){
            err.password = 'password required'
        }
        if(userName.trim().length === 0){
            err.userName = 'name required'
        }
    }

    const handleChange = (e) =>{
        const attr = e.target.name
        const value = e.target.value
        if(attr==='email'){
            setEmail(value)
        }
        if(attr==='password'){
            setPassword(value)
        }
        if(attr==='userName'){
            setUserName(value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidation()
        if(Object.keys(err).length === 0){
            const formData = {
                id: new Date().getTime(),
                user_name: userName,
                email: email,
                password: password,
                role: 'student',
                account_type: 'self'
            }
            dispatch(asyncRegister(formData, resetForm, redirect))
        }
        else {
            setFormErr(err)
        }
    }

    return <div>
        <Typography variant="h5" mb={1}>Register</Typography>
        <form onSubmit={handleSubmit}>

            <TextField label='Enter your name' variant='outlined' type='text' name='userName' value={userName} onChange={handleChange}></TextField><br />
            {formErr.userName && <span style={{color:'red'}}>{formErr.userName}</span>}<br />

            <TextField label='Enter your email' variant='outlined' type='text' name='email' value={email} onChange={handleChange}></TextField><br />
            {formErr.email && <span style={{color:'red'}}>{formErr.email}</span>}<br />

            <TextField label='Enter password' variant='outlined' type='password' name='password' value={password} onChange={handleChange} ></TextField> <br />
            {formErr.password && <span style={{color:'red'}}>{formErr.password}</span>}<br />

            <Button sx={{ mr: 1 }} type="submit" variant="contained" color="primary" size="small">Submit</Button>

        </form>
    </div>

}
export default withRouter(Register)