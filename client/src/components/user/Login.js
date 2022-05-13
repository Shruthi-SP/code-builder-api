import { useState } from "react"
import { withRouter } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { asyncSetUser } from "../../actions/userAction"
import validator from 'validator'
import { Typography, TextField, Button, Container, Box, CssBaseline, InputAdornment, IconButton } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from "@mui/icons-material"

const theme = createTheme();

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErr, setFormErr] = useState({})
    const [icon, setIcon] = useState(false)
    const err = {}
    const dispatch = useDispatch()

    const runValidation = () => {
        if (email.trim().length === 0) {
            err.email = 'Please enter your email id!'
        }
        else if (!validator.isEmail(email)) {
            err.email = 'Please enter valid email id!'
        }
        if (password.trim().length === 0) {
            err.password = 'Please enter your password!'
        }
    }

    const handleChange = (e) => {
        const attr = e.target.name
        const value = e.target.value
        if (attr === 'email') {
            setEmail(value)
        }
        if (attr === 'password') {
            setPassword(value)
        }
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        runValidation()
        const redirect = (obj) => {
            // props.handleLoggedIn()
            // if(obj.role==='admin'){
            //     props.handleAdmin()
            // }
            props.history.push('/dashboard')
        }
        if (Object.keys(err).length === 0) {
            const formData = {
                email: email,
                password: password
            }
            dispatch(asyncSetUser(formData, redirect))
        }
        else {
            setFormErr(err)
        }
    }

    const handleIcons = () => {
        setIcon(!icon)
    }

    return <div>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleLoginSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={handleChange}
                        />{formErr.email && <span style={{ color: 'red' }}>{formErr.email}</span>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton onClick={handleIcons}>{icon ? <VisibilityOff /> : <Visibility />}</IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            name="password"
                            label="Password"
                            type={icon ? "text" : "password"}
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={handleChange}
                        />{formErr.password && <span style={{ color: 'red' }}>{formErr.password}</span>}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ m: 2, ml: 0 }}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    </div>
}
export default withRouter(Login)