import React, {useContext, useEffect, useRef, useState} from 'react';
import {Context} from "../../index";
import {Avatar, Button, Container, Grid, TextField} from "@mui/material";
import {collection, serverTimestamp, addDoc, orderBy, query} from 'firebase/firestore';
import {useCollectionData} from "react-firebase-hooks/firestore";
import Loader from "../components/Loader";
import {useAuthState} from "react-firebase-hooks/auth";

function Chat() {
	const {auth, firestore} = useContext(Context);
	const [user] = useAuthState(auth);
	const [value, setValue] = useState('');
	const lastMessage = useRef();
	const [messages, loading] = useCollectionData(
		query(collection(firestore, 'messages'), orderBy("createdAt", "asc"))
	)
	
	useEffect(() => {
		if (lastMessage.current)
			lastMessage.current.scrollIntoView({behavior: 'smooth'});
	}, [messages])
	
	if (loading) return <Loader/>
	
	const sendMessage = async () => {
		if (value.length > 0)
			await addDoc(collection(firestore, "messages"), {
				uid: user.uid,
				displayName: user.displayName,
				photoUrl: user.photoURL,
				text: value,
				createdAt: serverTimestamp()
			});
		setValue('');
		lastMessage.current.scrollIntoView({behavior: 'smooth'});
	}
	
	return (
		<Container>
			<Grid container
			      style={{height: window.innerHeight - 80, marginTop: 20}}
			      justifyContent={"center"}
			>
				<div style={{
					width: '100%',
					height: '70vh',
					overflowY: 'auto',
					borderRadius: '4px',
					border: '1px solid #0000003b'
				}}>
					{messages.map((message, index) => (
						<div key={index}
						     ref={lastMessage}
						     style={{
							     margin: 10,
							     padding: 10,
							     border: user.uid === message.uid ? '2px solid green' : '2px dashed red',
							     marginLeft: user.uid === message.uid ? 'auto' : '18px',
							     width: 'fit-content'
						     }}>
							<Grid container alignItems={"center"}>
								<Avatar src={message.photoUrl}/>
								<div style={{paddingLeft: 5}}>{message.displayName}</div>
							</Grid>
							<div>{message.text}</div>
						
						</div>
					))}
				</div>
				<Grid
					container
					direction={"row"}
					alignItems={"flex-end"}
					justifyContent={"flex-end"}
				>
					<div style={{
						display: 'flex',
						width: '100%'
					}}>
						<TextField
							onKeyPress={(ev) => {
								if (ev.key === 'Enter') {
									ev.preventDefault();
									sendMessage()
								}
							}}
							value={value}
							onChange={e => setValue(e.target.value)}
							fullWidth
							variant={"outlined"}
							label="Message"
							maxRows={2}/>
						<Button onClick={sendMessage} variant={"outlined"} style={{marginLeft: 5}}>Send</Button>
					</div>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Chat;
