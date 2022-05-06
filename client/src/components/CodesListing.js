import { Box, Grid, Typography, TextField } from "@mui/material"
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
    const [search, setSearch] = useState('')
    const [list, setList] = useState(codes)

    useEffect(() => {
        if (codes.length > 0) {
            setArray(codes)
            setList(codes)
        }
    }, [codes])

    useEffect(() => {
        props.handleCancelShow()
    })

    const handleSearchChange = (e) => {
        const userInput = e.target.value
        setSearch(userInput)
        const newList = array.filter(ele => ele.title.toLowerCase().includes(userInput) || ele.statement.toLowerCase().includes(userInput))
        setList(newList)
    }

    return (
        <>{
            array.length === 0 ? <div><h2>No array of codes. Create code</h2></div> : <div style={{ marginLeft: '5px' }}>
                <Grid container>
                    <Grid item xs sx={{ display: "flex", justifyContent: "flex-start", pt: 1 }}><Typography variant="h5" sx={{ mt: 2, mb: 1 }}>Listing Codes: {array.length}</Typography></Grid>
                    <Grid item xs sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <TextField
                            variant='filled'
                            sx={{ mb: 2 }}
                            size="small"
                            placeholder="Search title or statement"
                            type='search'
                            name="search"
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </Grid>
                </Grid>
                {list.length > 0 &&
                    list.map((ele, i) => {
                        return <Box sx={{ border: 1, borderColor: 'error.main', borderRadius: 2, mb: 2, p: 2 }} key={i}>
                            <>
                                <Typography variant="h6" >{i + 1}. {ele.title}</Typography>
                                <Typography variant="subtitle1"> {ele.statement}</Typography>
                                {admin && <CodeItem snippets={ele.snippets} />}
                                <br />
                                <Grid container>
                                    <Grid item sx={{ display: "flex", justifyContent: "flex-start" }}><Link to={`/codes/${ele._id}`}>{admin ? 'Show' : 'Solve'}</Link><br /></Grid>
                                    <Grid item xs sx={{ display: "flex", justifyContent: "flex-end" }}>
                                        <Typography>Points: {ele.snippets.filter(ele=>ele.group==='input').length}</Typography>
                                    </Grid>
                                </Grid>
                            </>
                        </Box>
                    })
                }
            </div>
        }</>
    )
}
export default CodesListing