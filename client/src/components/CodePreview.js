import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import CodeView from './CodeView';
import { withRouter } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
const CodePreview = (props) => {
    const {state, toggleDrawer} = props
    // const [state, setState] = React.useState({
    //     bottom: false
    // });

    // const toggleDrawer = (anchor, open) => (event) => {
    //     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //         return;
    //     }

    //     setState({ ...state, [anchor]: open });
    // };

    return (
        <div>
            {/* <Button onClick={toggleDrawer('bottom', true)}>preview</Button> */}
            <Drawer anchor='bottom' open={state['bottom']} onClose={toggleDrawer('bottom', false)}>
                <Button sx={{display: 'flex', justifyContent: 'flex-end' }} onClick={toggleDrawer('bottom', false)}> <CloseIcon fontSize='large' /> </Button>
                <CodeView />
            </Drawer>
        </div>
    );
}
export default withRouter(CodePreview)




