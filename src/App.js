import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./app/components/Navbar";
import AppRouter from "./app/components/AppRouter";

import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useContext} from "react";
import {Context} from "./index";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "./app/components/Loader";

const theme = createTheme({
	palette: {
		primary: {
			light: '#757ce8',
			main: '#3f50b5',
			dark: '#002884',
			contrastText: '#fff',
		},
		secondary: {
			light: '#ff7961',
			main: '#f44336',
			dark: '#ba000d',
			contrastText: '#000',
		},
	},
});

function App() {
	const {auth} = useContext(Context)
	const [user, loading, error] = useAuthState(auth);
	
	if(loading) return <Loader />
	
	return (
		<ThemeProvider theme={theme}>
			<Navbar/>
			<AppRouter/>
		</ThemeProvider>
	);
}

export default App;
