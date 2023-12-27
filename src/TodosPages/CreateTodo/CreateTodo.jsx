import React, { useState } from 'react';
import * as yup from 'yup';
import style from './CreateTodo.module.css';
import TextField from '../TextField/TextField';
import { parseYupError } from '../TextField/utils/parsYupError';

const CreateTodo = ({ createTodo }) => {
	const [newTodo, setNewTodo] = useState({ title: '' });
	const [error, setError] = useState({});

	const isValid = Object.keys(error).length === 0;

	const handleChange = (event) => {
		const { name, value } = event.target;
		setNewTodo((prevTodo) => ({ ...prevTodo, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			if (isValid) {
				await createTodo(newTodo);
				setNewTodo({ title: '' });
			}
		} catch (error) {
			console.error(error);
		}
	};

	const validateSchema = yup.object().shape({
		title: yup.string().required('Title is required'),
	});

	const handleBlur = async () => {
		try {
			await validateSchema.validate(newTodo, { abortEarly: false });
			setError({});
		} catch (yupError) {
			const error = parseYupError(yupError);
			setError(error);
		}
	};

	return (
		<div className={style.createTodoForm}>
			<form onSubmit={handleSubmit}>
				<TextField
					className={style.createTodoInput}
					id="title"
					name="title"
					type="text"
					placeholder="New Todo Title"
					value={newTodo.title}
					onChange={handleChange}
					onBlur={handleBlur}
					error={error.title}
				/>
				<button className={style.createTodoButton} type="submit">
					Add Todo
				</button>
			</form>
		</div>
	);
};

export default CreateTodo;
