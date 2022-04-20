import { Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
//import { array } from "../actions/userAction"

const StudentsListing = (props) => {

    const members = useSelector(state=>{
        return state.members
    })

    const [students, setStudents] = useState([])

    useEffect(() => {
        props.handleCancelShow()
        const s = members.filter(ele => ele.role === 'student')
        //console.log('students pg=', s)
        setStudents(s)
    }, [members])

    return (
        <>{
            students.length === 0 ? <div><h2>StudentsListing crashed! No array of students</h2></div> : <div style={{ marginLeft: '5px' }}>
                <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>Listing Students: {students.length}</Typography>
                <ol>
                    {students.map((ele, i) => {
                        return < li key={i}>
                            <Link to={`/students/${ele.id}`}>{ele.user_name}</Link>
                        </li>
                    })}
                </ol>
            </div>
        }</>
    )
}
export default StudentsListing