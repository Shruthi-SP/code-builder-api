//import axios from "axios"
import axios from "../config/axios-config";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Grid, Button, Typography, Divider } from "@mui/material";
//import { array } from "../actions/userAction";
import DashboardTable from "./DashboardTable";
import DashboardCard from "./DashboardCard";
import { FastForward } from "@mui/icons-material";
import DashboardChart from "./DashboardChart";
import Swal from 'sweetalert2'

const CodeDashboard = (props) => {
    const members = useSelector(state => {
        return state.members
    })
    const codesR = useSelector(state => {
        return state.codes
    })
    const user = useSelector(state => {
        return state.user
    })
    const admin = user.role === 'admin' ? true : false

    const getArray = (a) => {
        const r = a.map(ele => {
            return { ...ele, label: ele.statement }
        })
        return r
    }

    const [array1, setArray1] = useState([])
    const [answers, setAnswers] = useState([])
    const [codes, setCodes] = useState([])
    const [auto, setAuto] = useState([])
    const [statement, setStatement] = useState(null)
    const [student, setStudent] = useState(null)
    const [chartData, setChartData] = useState([])
    const [score, setScore] = useState({})
    const [studentsAll, setStudentsAll] = useState([])
    const [studentSpec, setStudentSpec] = useState([])
    const [go, setGo] = useState(false)

    useEffect(() => {
        const a = members.filter(ele => ele.role === 'student')
        setArray1(a)
    }, [members])

    const getAllSubmitted = (id) => {
        axios.get(`/answers/students/${id}`)
            .then(response => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    //console.log('error', result.errors)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: result.errors,
                        footer: ''
                    })
                } else {
                    //console.log('student ans for all questions=',result)
                    const obj = {}
                    obj['Correct'] = result.obtainedPoints
                    obj['Incorrect'] = result.totalPoints - result.obtainedPoints
                    const arr = Object.entries(obj)
                    setChartData(arr)
                    setScore(result)
                    setStudentSpec(result.allAnswers)
                    setStudentsAll([])
                }
            })
            .catch(err => {
                //console.log(err.message)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                    footer: ''
                })
            })
    }

    useEffect(() => {
        let result
        axios.get('/answers')
            .then((response) => {
                result = response.data
                if (result.hasOwnProperty('errors')) {
                    //console.log(result.errors)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: result.errors,
                        footer: ''
                    })
                }
                else {
                    setAnswers(result)
                }
            }).catch((err) => {
                //console.log(err.message)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                    footer: ''
                })
            })
        setCodes(codesR.data)
        setAuto(getArray(codesR.data))
        if (!admin) {
            setStudent(user)
            getAllSubmitted(user.id)
        }
    }, [codesR])

    const defaultProps = {
        options: array1,
        getOptionLabel: (option) => option.user_name,
    };

    const handleGo = () => {
        //console.log('event go triggered')
        setGo(true)
        if (statement && student) {
            axios.get(`/answers/codes/${statement._id}/students/${student.id}`)
                .then(response => {
                    const result = response.data
                    //console.log('go both', result)
                    if (result.hasOwnProperty('errors')) {
                        //console.log('error', result.errors)
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: result.errors,
                            footer: ''
                        })
                    } else {
                        setStudentSpec(result)
                    }
                })
                .catch(err => {
                    //console.log(err.message)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.message,
                        footer: ''
                    })
                })

        }
        if (student && !statement) {
            getAllSubmitted(student.id)
        }
        if (statement) {
            axios.get(`/answers/codes/${statement._id}`)
                .then(response => {
                    const result = response.data
                    if (result.hasOwnProperty('errors')) {
                        //console.log('error', result.errors)
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: result.errors,
                            footer: ''
                        })
                    } else {
                        setStudentsAll(result)
                    }
                })
                .catch(err => {
                    //console.log(err.message)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.message,
                        footer: ''
                    })
                })
        }
    }

    return <div>
        <Typography variant="h4">{props.admin ? 'Admin ' : 'Student '}Dashboard</Typography>
        <Grid container direction='row' >
            <DashboardCard heading='Total Codes' number={codes.length} />
            {admin && <><DashboardCard heading='Total Students' number={array1.length} />
                <DashboardCard heading='Total Answers' number={answers.length} /></>}
        </Grid>
        <Divider sx={{ m: 2, ml: 0 }} />
        {chartData.length > 0 && <>
            <Grid container direction='row'>
                <Grid item><DashboardChart data={chartData} /></Grid>
                <Grid item style={{ margin: 'auto 0px', display: 'block' }}>
                    <Typography variant="h6">Total Questions Attempted - {score.totalQuestions}</Typography>
                    <Typography variant="h6">Total Points - {score.totalPoints}</Typography>
                    <Typography variant="h6">Score - {score.obtainedPoints}</Typography>
                </Grid>
            </Grid>
        </>}
        <Grid container direction='row'>
            <Grid item>
                <Autocomplete
                    options={auto}
                    //{...defaultProps}
                    sx={{ width: 300, m: 2, ml: 0 }}
                    value={statement}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    onChange={(event, newValue) => {
                        setStatement(newValue);
                    }}
                    // renderInput={(params) => (
                    //   <TextField {...params} label="Codes" variant="standard" />
                    // )}
                    //onChange={(e)=>{setValue(e.target.value)}}
                    renderInput={(params) => <TextField {...params} label="Select the Code" />}
                />
            </Grid>
            {admin && <Grid>
                <Autocomplete
                    {...defaultProps}
                    sx={{ width: 300, m: 2 }}
                    value={student}
                    onChange={(event, newValue) => {
                        setStudent(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Select the Student" />}
                />
            </Grid>}
            <Button variant="contained" size="small" endIcon={<FastForward />} sx={{ mt: 2, ml: 2, p: 0, maxHeight: 52 }} onClick={handleGo}>Go</Button>
        </Grid>
        {(go && student) && <>{(studentSpec.length > 0) ? <DashboardTable heading={`${student.user_name} attempt to ${statement ? `"${statement.statement}"` : 'all'} question`} tableData={studentSpec} /> : <p>No answers yet from {student.user_name}</p>}</>}
        {(go && admin && statement) && <>{(studentsAll.length > 0) ? <DashboardTable heading={`All student's answer to "${statement.statement}" question`} tableData={studentsAll} /> : <p>No answers yet from all students</p>}</>}
    </div>
}
export default CodeDashboard