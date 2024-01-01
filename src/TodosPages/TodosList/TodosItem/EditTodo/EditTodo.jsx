import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { parseYupError } from '../../../TextField/utils/parsYupError';
import TextField from '../../../TextField/TextField';

const EditTodo = ({ editTodo, handleEdit, itemId, ...props }) => {
	const [value, setValue] = useState({ ...props });
	const [error, setError] = useState({});

	const isValid = Object.keys(error).length === 0;

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValue((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			if (isValid) {
				await editTodo(itemId, value);
				handleEdit();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const validateSchema = yup.object().shape({});

	useEffect(() => {
		validateSchema
			.validate(value, { abortEarly: false })
			.then(() => {
				setError({});
			})
			.catch((yupError) => {
				const error = parseYupError(yupError);
				setError(error);
			});
	}, [value]);
	return (
		<form onSubmit={handleSubmit}>
			<TextField
				id="title"
				name="title"
				type="text"
				placeholder="title"
				value={value.title || ''}
				onChange={handleChange}
				error={error.title}
			/>
			<button type="submit">Save</button>
		</form>
	);
};

export default EditTodo;
