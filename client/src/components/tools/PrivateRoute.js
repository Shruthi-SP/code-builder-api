import { Route, Redirect, withRouter } from "react-router-dom"
import ErrorBoundary from "../ErrorBoundary"
//import { StyledEngineProvider } from '@mui/material/styles'

const PrivateRoute = (props) => {
    const {component:Component, path, ...rest} = props
    return (
        <ErrorBoundary><Route path={path} exact={true} {...rest} render={(props)=>{
            return localStorage.getItem('token') ? (
                <Component {...props} {...rest} />
            ) : (
                <Redirect to={{pathname: '/login'}} />
            )
        }}
        /></ErrorBoundary>
    )
}

export default withRouter(PrivateRoute)