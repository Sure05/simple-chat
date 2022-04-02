import App from './App';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import './index.css';

import {initializeApp} from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {createContext} from "react";

// Initialize Firebase
const app = initializeApp({
	apiKey: "AIzaSyBqpqTTLZw2jWpIH8GS6dRF4nudkhc5UF4",
	authDomain: "smallchatreact.firebaseapp.com",
	projectId: "smallchatreact",
	storageBucket: "smallchatreact.appspot.com",
	messagingSenderId: "799784776943",
	appId: "1:799784776943:web:ae89b7547a6baf9185d71a",
	measurementId: "G-LFRRRCSD2B"
});
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export const Context = createContext(null);

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
	<BrowserRouter>
		<Context.Provider value={{app, auth, firestore}}>
		<   App/>
		</Context.Provider>
	</BrowserRouter>
);
