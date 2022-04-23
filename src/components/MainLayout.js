import { Backdrop, CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { checkAuth, getToken } from "../../extras/utils";
import { LOGIN_USER } from "../../redux/actions/types";
import DefaultLayout from "./DefaultLayout";
// import { useEffect } from "react";

const MainLayout = ({ auth, getCurrentUser }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		if (checkAuth())
			dispatch({
				type: LOGIN_USER,
				payload: getToken(),
			});
	}, [dispatch]);

	if (auth.loggedIn) {
		return (
			<>
				<DefaultLayout />
			</>
		);
	}
	return (
		<Backdrop open={true}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps)(MainLayout);
