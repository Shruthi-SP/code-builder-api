import { useEffect } from "react"
import { Route, Redirect, withRouter } from "react-router-dom"
import ErrorBoundary from "../ErrorBoundary"
//import { StyledEngineProvider } from '@mui/material/styles'

const AdminRoute = (props) => {
    const { component: Component, path, ...rest } = props
    // useEffect(() => {
    //     if (!props.admin) {
    //         localStorage.removeItem('token')
    //     }
    // }, [])
    return (
        <ErrorBoundary><Route path={path} exact={true} {...rest} render={(props) => {
            return localStorage.getItem('token' && props.admin) ? (
                <Component {...props} {...rest} />
            ) : (
                <Redirect to={{ pathname: '/login' }} />
            )
        }}
        /></ErrorBoundary>
    )
}

export default withRouter(AdminRoute)