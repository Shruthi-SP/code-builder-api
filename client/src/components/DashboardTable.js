import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Typography, Drawer, Grid, Button } from '@mui/material';
//import { array } from '../actions/userAction';
import { useSelector } from 'react-redux';
import PreviewIcon from '@mui/icons-material/Preview';
import StudentAnsView from './StudentAnsView';
import CloseIcon from '@mui/icons-material/Close';

const DashboardTable = (props) => {
  const { heading, tableData } = props
  //console.log('DT props=', heading, tableData)

  const members = useSelector(state => {
    return state.members
  })

  const codes = useSelector(state => {
    return state.codes
  })

  const user = useSelector(state => {
    return state.user
  })

  const [state, setState] = useState({ bottom: false });
  const [answer, setAnswer] = useState(null)
  const [code, setCode] = useState(null)

  const toggleDrawer = (event, anchor, open, obj) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if (obj) {
      const code = codes.data.find(ele => ele._id === obj.codeId)
      setCode(code)
    }
    setState({ ...state, [anchor]: open });
    setAnswer(obj)
  };

  function createData(name, question, score, view, id) {
    return { name, question, score, view, id };
  }

  // const rows = tableData.map(ele => {
  //   return createData(ele.studentId, ele.codeId, ele.answers, ele.score, ele._id)
  // })

  const getStudentName = (id) => {
    const student = members.find(ele => ele.id == id)
    //console.log('get student name=',student)
    return student ? student.user_name : 'anonymous'
  }
  const getCodeTitle = (id) => {
    const code = codes.data.find(ele => ele._id == id)
    //console.log('get code', code)
    return code ? code.statement : 'This code no longer exist.'
  }
  const rows = tableData.map(ele => {
    return createData(user.role === 'admin' ? getStudentName(ele.studentId) : user.user_name, getCodeTitle(ele.codeId), ele.score, <IconButton variant="outlined" color="primary" size="small" disabled={!(codes.data.find(e => e._id === ele.codeId))} onClick={(e) => { toggleDrawer(e, 'bottom', true, ele) }}><PreviewIcon /></IconButton>, ele._id)
  })

  function BasicTable() {
    return (
      <TableContainer component={Paper}>
        <Typography variant='h6'>{heading}</Typography>
        <Table sx={{ maxWidth: 850 }}>
          <TableHead>
            <TableRow>
              <TableCell >Student Name</TableCell>
              <TableCell >Statement</TableCell>
              <TableCell >Score</TableCell>
              <TableCell >View your answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell >{row.name}</TableCell>
                <TableCell >{row.question}</TableCell>
                <TableCell >{row.score}</TableCell>
                <TableCell >{row.view}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return <>
    <BasicTable />
    {(state.bottom && answer && code) && <Drawer anchor='bottom' open={state['bottom']} onClose={(e) => toggleDrawer(e, 'bottom', false, null)}>
      <Button sx={{ display: 'flex', justifyContent: 'flex-end' }} onClick={(e) => { toggleDrawer(e, 'bottom', false, null) }}> <CloseIcon /> </Button>
      <StudentAnsView answer={answer} code={code} />
      {/* <StudentAnsView answer={answer} code={code} /> */}
    </Drawer>}
  </>
}
export default DashboardTable