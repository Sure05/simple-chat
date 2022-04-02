import React, {useContext} from 'react';
import {Navigate, Routes, Route} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../routes";
import {CHAT_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "../../index";

function AppRouter(props) {
	const {auth} = useContext(Context)
	const [user] = useAuthState(auth);
	
	return user ? (
		<Routes>
			{privateRoutes.map(({path, Component}, index) => {
					return <Route key={index} path={path} exact element={<Component />}  />
				}
			)}
			<Route path="*" element={<Navigate to={CHAT_ROUTE} />} />
		</Routes>
	) : (
		<Routes>
			{publicRoutes.map(({path, Component}, index) =>
				<Route key={index} path={path} exact element={<Component />}  />
			)}
			<Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
		</Routes>
	);
}

export default AppRouter;
