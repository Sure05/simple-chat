import React from 'react';
import {Form} from "react-bootstrap";

function Field(props) {
	const {
		touched,
		errors,
		value,
		name
	} = props;
	return (
		<>
			<Form.Control
				{...props}
				value={value[name]}
				isValid={touched[name] && !errors[name]}
				isInvalid={touched[name] && !!errors[name]}
			/>
			<Form.Control.Feedback type="invalid">
				{errors[name]}
			</Form.Control.Feedback>
		</>
	);
}

export default Field;
