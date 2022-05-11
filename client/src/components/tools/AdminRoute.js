import { useEffect } from "react"
import { Route, Redirect, withRouter } from "react-router-dom"
import ErrorBoundary from "../ErrorBoundary"
//import { StyledEngineProvider } from '@mui/material/styles'

const AdminRoute = (props) => {
    const { component: Component, path, ...rest } = props
    //console.log('adminRoute=', props, Component.name, rest, rest.admin )
    
    return (
        <ErrorBoundary>
            <Route path={path} exact={true} {...rest} render={(props) => {
                return (localStorage.getItem('token')) ? (
                    rest.admin ? <Component {...props} {...rest} /> : <Redirect to={{ pathname: '/' }} />
                ) : (
                    <Redirect to={{ pathname: '/login' }} />
                )
            }}
            />
        </ErrorBoundary>
    )
}

export default withRouter(AdminRoute)