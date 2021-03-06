import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Route, withRouter } from "react-router-dom"
import { removeUser } from "../actions/userAction"
import Login from "./user/Login"
import Register from "./user/Register"
import AddCode from "./AddCode"
import CodesListing from "./CodesListing"
import StudentsListing from "./StudentsListing"
import CodeSnippets from "./CodeSnippets"
//import ErrorBoundary from "./ErrorBoundary"
import PrivateRoute from "./tools/PrivateRoute"
import { Box, Grid } from "@mui/material"
import CodeDashboard from "./CodeDashboard"
import Swal from 'sweetalert2'
import StudentProfile from "./StudentProfile"
import Demo from "./Demo"
import AdminRoute from "./tools/AdminRoute"
import Home from "./user/Home"

const CodesContainer = (props) => {
    const [show, setShow] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    const dispatch = useDispatch()
    const handleLoggedIn = () => {
        setUserLoggedIn(!userLoggedIn)
    }
    const handleAdmin = () => {
        setAdmin(!admin)
    }
    const members = useSelector(state => {
        return state.members.filter(ele => ele.role === 'student')
    })
    const user = useSelector(state => {
        return state.user
    })

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            setUserLoggedIn(true)
            if (user.role === 'admin') {
                setAdmin(true)
            }
        }
    }, [user])

    const handleLogout = () => {
        localStorage.clear()
        //localStorage.removeItem('user')
        dispatch(removeUser())
        setAdmin(false)
        setUserLoggedIn(false)
        props.history.push('/')
        //alert('successfully logged out')
        Swal.fire({
            icon: 'success',
            title: 'Logget Out',
            text: 'successfully logged out',
            footer: ''
        })
    }

    const handleShow = () => {
        setShow(true)
    }
    const handleCancelShow = () => {
        setShow(false)
    }

    return (
        <>{
            members.length > 0 && <Box>
                {
                    (userLoggedIn) ?
                        <div style={{ marginTop: '5px', maxWidth: "100%" }}>
                            <Grid container direction="row" sx={{ mt: 1, mb: 1, borderRadius: '2px', width: '100%', backgroundColor: '#0288d1' }}>
                                <Grid item xs sx={{ display: "flex", justifyContent: "flex-start", }}>
                                    <Link style={{ margin: '5px', padding: '5px', justifyContent: 'end', textDecoration: 'none', fontSize: '18px', color: 'white' }} to='/dashboard' >Dashboard</Link>
                                    <Link style={{ margin: '5px', padding: '5px', justifyContent: 'end', textDecoration: 'none', fontSize: '18px', color: 'white' }} to='/codes' >Codes List</Link>
                                    {admin && <Link style={{ margin: '5px', padding: '5px', justifyContent: 'end', textDecoration: 'none', fontSize: '18px', color: 'white' }} to='/create-code'>Create Code </Link>}
                                    {admin && <Link style={{ margin: '5px', padding: '5px', justifyContent: 'end', textDecoration: 'none', fontSize: '18px', color: 'white' }} to='/students'>Students List </Link>}
                                    {show && <Link style={{ margin: '5px', padding: '5px', justifyContent: 'end', textDecoration: 'none', fontSize: '18px', color: 'white' }} to='/codes/:id'>Snippet </Link>}
                                    {!admin && <Link style={{ margin: '5px', padding: '5px', justifyContent: 'end', textDecoration: 'none', fontSize: '18px', color: 'white' }} to='/students/:id'>My-Profile </Link>}
                                    <Link style={{ margin: '5px', padding: '5px', justifyContent: 'end', textDecoration: 'none', fontSize: '18px', color: 'white' }} to='/demo' >Demo</Link>
                                </Grid>
                                <Grid item xs sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Link style={{ margin: '5px', padding: '5px', justifyContent: 'end', textDecoration: 'none', fontSize: '18px', color: 'white' }} to='#' onClick={handleLogout}>Logout</Link>
                                </Grid>
                            </Grid>
                        </div>
                        :
                        // <div>
                        //     <Link style={{ margin: '5px' }} to='/register'> Register</Link>
                        //     <Link style={{ margin: '5px' }} to='/login'>Login</Link>
                        // </div>
                        <>
                            <Grid container direction="row" sx={{ mt: 1, mb: 1, mr: 0, borderRadius: '2px', width: '100%', backgroundColor: '#0288d1' }} >
                                <Grid item xs sx={{ display: "flex", justifyContent: "flex-start", }}>
                                    <Link style={{ margin: '5px', padding: '5px', justifyContent: 'end', textDecoration: 'none', fontSize: '20px', color: 'white' }} to='/'></Link>
                                </Grid>

                                <Grid item sx={{ display: "flex", justifyContent: "flex-end" }}>

                                    {/* <Link style={{ margin: '5px', padding: '5px', justifyContent: 'end', textDecoration: 'none', fontSize: '20px', color: 'white' }} to='/register'> Register</Link> */}

                                    <Link style={{ margin: '5px', padding: '5px', justifyContent: 'end', textDecoration: 'none', fontSize: '20px', color: 'white' }} to='/login'>Login</Link>
                                </Grid>

                            </Grid>

                        </>
                }
                {/* <Divider sx={{m:2, ml:0, mr:0}} /> */}
                <Route path='/' exact component={Home}></Route>
                <Route path='/register' component={Register}></Route>
                <Route path='/login' render={(props) => {
                    return <Login {...props} handleLoggedIn={handleLoggedIn} handleCancelShow={handleLoggedIn} handleAdmin={handleAdmin} />
                }}></Route>

                <PrivateRoute path='/codes' admin={admin} component={CodesListing} handleShow={handleShow} handleCancelShow={handleCancelShow} />
                <AdminRoute path='/students' admin={admin} component={StudentsListing} handleShow={handleShow} handleCancelShow={handleCancelShow} />
                <AdminRoute path='/create-code' admin={admin} component={AddCode} handleShow={handleShow} handleCancelShow={handleCancelShow} />
                <PrivateRoute path='/codes/:id' admin={admin} component={CodeSnippets} />
                <PrivateRoute path='/students/:id' admin={admin} component={StudentProfile} />
                <PrivateRoute path='/dashboard' admin={admin} component={CodeDashboard} />
                <PrivateRoute path='/demo' admin={admin} component={Demo} />
            </Box>
        }</>
    )
}
export default withRouter(CodesContainer)