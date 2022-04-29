import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import CodeItem from "./CodeItem"

const CodesListing = (props) => {
    const user = useSelector(state => {
        return state.user
    })

    const codes = useSelector((state) => {
        return state.codes.data
    })

    const admin = user.role === 'admin' ? true : false

    const [array, setArray] = useState(codes)

    useEffect(() => {
        if(codes.length > 0){
           setArray(codes) 
        }
    }, [codes])

    useEffect(() => {
        props.handleCancelShow()
    })

    return (
        <>{
            array.length === 0 ? <div><h2>No array of codes. Create code</h2></div> : <div style={{ marginLeft: '5px' }}>
                <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>Listing Codes: {array.length}</Typography>
                {array.length > 0 &&
                    array.map((ele, i) => {
                        return <Box width='100%' sx={{ border: 1, borderColor: 'error.main', borderRadius: 2, mb: 2, p: 2 }} key={i}>
                            <>
                                <Typography variant="h6" >{i + 1}. {ele.title}</Typography>
                                <Typography variant="h6"> {ele.statement}</Typography>
                                {admin && <CodeItem snippets={ele.snippets} />}
                                <br /><Link to={`/codes/${ele._id}`}>{admin ? 'Show' : 'Solve'}</Link><br />
                            </>
                        </Box>
                    })
                }
            </div>
        }</>
    )
}
export default CodesListing