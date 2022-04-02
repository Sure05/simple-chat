import React from 'react';
import * as yup from 'yup';
import {Button, Form} from "react-bootstrap";
import {Formik} from "formik";
import Field from "../components/Field";

const style = {
	maxWidth: 250, margin: "auto", paddingTop: '15%'
}
const buttonStyle = {
	width: '100%'
}

const validationSchema = yup.object({
	userName: yup.string().required('User name is required'), chatId: yup.string().required('Chat id is required')
})

function Auth(props) {
	const onSubmit = (values) => {
		console.log(values)
	}
	const initialValues = {
		userName: 'Tempest', chatId: 3328
	}
	return (<>
		
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{({
				  handleSubmit,
				  handleChange,
				  handleBlur,
				  values,
				  touched,
				  isValid,
				  errors,
			  }) => (<Form noValidate
			               onSubmit={handleSubmit}
			               className="authForm"
			               style={style}>
					<h1 style={{textAlign: "center", paddingBottom: 25}}>Small chat</h1>
					<Form.Group className="mb-3" controlId="formBasicUserName">
						
						<Field
							onChange={handleChange}
							value={values}
							touched={touched}
							errors={errors}
							name="userName"
							required
							placeholder="User name"
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicChatId">
						<Field
							onChange={handleChange}
							value={values}
							touched={touched}
							errors={errors}
							name="chatId"
							required
							placeholder="Chat ID"
						/>
					</Form.Group>
					<Button style={buttonStyle} variant={!isValid ? 'danger' : 'primary'} type="submit">
						Submit
					</Button>
				</Form>
			)}
		</Formik>
	</>);
}

export default Auth;
