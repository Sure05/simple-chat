import React from 'react';
import {Box, Button, Container, Grid} from "@mui/material";
import './Loader.css';

function Loader(props) {
	return (
		<Container>
			<Grid container
			      style={{height: window.innerHeight - 50}}
			      alignItems={"center"}
			      justifyContent={"center"}
			>
				<div className="lds-spinner">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</Grid>
		</Container>
	);
}

export default Loader;
