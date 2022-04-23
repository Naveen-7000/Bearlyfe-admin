import { connect } from "react-redux"
import { Redirect, Route } from "react-router"
import { checkAuth } from "./extras/utils"


const PrivateRoute = ({ auth, component: Component, ...rest }) => {
    return <Route
        {...rest}
        render={props => {
            if (checkAuth()) {
                return <Component {...props} />
            } else {
                return <Redirect to="/login" />
            }
        }}
    />
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(PrivateRoute)