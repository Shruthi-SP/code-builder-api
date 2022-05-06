import { Typography, TextField, InputAdornment } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import { PersonSearch } from "@mui/icons-material";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
//import { array } from "../actions/userAction"

const StudentsListing = (props) => {

    const members = useSelector(state=>{
        return state.members.filter(ele=>ele.role==='student')
    })

    const [students, setStudents] = useState(members)
    const [search, setSearch] = useState('')
    const [tableData, setTableData] = useState(members)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // useEffect(() => {
    //     props.handleCancelShow()
    //     //const s = members.filter(ele => ele.role === 'student')
    //     //console.log('students pg=', s)
    //     if(members.length > 0){
    //       setStudents(members)
    //     }
    // }, [members])

    function TablePaginationActions(props) {
        const theme = useTheme();
        const { count, page, rowsPerPage, onPageChange } = props;
    
        const handleFirstPageButtonClick = (event) => {
          onPageChange(event, 0);
        };
    
        const handleBackButtonClick = (event) => {
          onPageChange(event, page - 1);
        };
    
        const handleNextButtonClick = (event) => {
          onPageChange(event, page + 1);
        };
    
        const handleLastPageButtonClick = (event) => {
          onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };
    
        return (
          <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
              onClick={handleFirstPageButtonClick}
              disabled={page === 0}
              aria-label="first page"
            >
              {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
              onClick={handleBackButtonClick}
              disabled={page === 0}
              aria-label="previous page"
            >
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
              onClick={handleNextButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="next page"
            >
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
              onClick={handleLastPageButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="last page"
            >
              {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
          </Box>
        );
      }
    
      TablePaginationActions.propTypes = {
        count: PropTypes.number.isRequired,
        onPageChange: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
      };
    
      function createData(sl, name, email, mobile, id) {
        return { sl, name, email, mobile, id };
      }
    
      const rows = tableData.map((ele, i) => {
        return createData(i+1, ele.user_name, ele.email, ele.mobile, ele.id)
      })
      const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

      const handleSearchChange = (e) => {
        const userInput = e.target.value
        setSearch(userInput)
        const newList = students.filter(ele => ele.user_name.toLowerCase().includes(userInput) || ele.email.toLowerCase().includes(userInput)||(ele.mobile && ele.mobile.includes(userInput)))
        setTableData(newList)
      }

    return (
          members.length === 0 ? <div><h2>No students</h2></div> : <div style={{ marginLeft: '5px' }}>
                <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>Listing Students: {students.length}</Typography>
                {students.length > 0 && <>
         <TextField
          variant='filled'
          sx={{ mb: 2 }}
          size="small"
          placeholder="Search Students"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonSearch />
              </InputAdornment>
            ),
          }}
          type='search'
          name="search"
          value={search}
          onChange={handleSearchChange}
        />
        <TableContainer component={Paper}>
          <Table sx={{ mixWidth: 500 }} size='small' aria-label="custom pagination table">
            <TableHead>
              <TableRow >
                <TableCell style={{ width: '20%', fontSize: '16px' }} ><b>Sl.No</b></TableCell>
                <TableCell style={{ width: '20%', fontSize: '16px' }} ><b>Student Name</b></TableCell>
                <TableCell style={{ width: '23%', fontSize: '16px' }} ><b>Email</b></TableCell>
                <TableCell style={{ width: '15%', fontSize: '16px' }} ><b>Mobile</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row, i) => (
                <TableRow key={i}>
                  <TableCell style={{ fontSize: '16px' }} >{i+1}</TableCell>
                  <TableCell style={{ fontSize: '16px' }} ><Link to={`/students/${row.id}`}>{row.name}</Link></TableCell>
                  <TableCell style={{ fontSize: '16px' }} >{row.email}</TableCell>
                  <TableCell style={{ fontSize: '16px' }} >{row.mobile}</TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </>}
    </div>
                // <ol>
                //     {students.map((ele, i) => {
                //         return < li key={i}>
                //             <Link to={`/students/${ele.id}`}>{ele.user_name}</Link>
                //         </li>
                //     })}
                // </ol> 
            
        
    )
}
export default StudentsListing