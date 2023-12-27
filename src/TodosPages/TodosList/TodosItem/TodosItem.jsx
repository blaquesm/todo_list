import React, { useState, useEffect } from 'react';
import style from './TodosItem.module.css';
import EditTodo from './EditTodo/EditTodo';
import DeleteConfirmation from './DeleteConfirmation/DeleteConfirmation';

const TodoItem = ({ data, editTodo, deleteTodo, ...props }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [isDone, setIsDone] = useState(false);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

	const handleEdit = () => {
		setIsEdit((prevState) => !prevState);
	};

	const handleCheckboxChange = () => {
		setIsDone((prevState) => !prevState);
	};

	const handleDeleteClick = () => {
		setShowDeleteConfirmation(true);
	};

	const handleDeleteCancel = () => {
		setShowDeleteConfirmation(false);
	};

	const handleDeleteConfirm = () => {
		deleteTodo(props.id); // Передайте идентификатор для удаления
		setShowDeleteConfirmation(false);
	};

	useEffect(() => {
		if (data && data.length) {
			setIsDone(new Array(data.length).fill(false));
		}
	}, [data]);

	return (
		<>
			{isEdit ? (
				<EditTodo {...props} handleEdit={handleEdit} editTodo={editTodo} />
			) : (
				<li className={style.li}>
					<span className={isDone ? style.done : ''}>
						<input
							type="checkbox"
							checked={isDone}
							onChange={handleCheckboxChange}
						/>
						{props.title}
					</span>
					<button className={style.buttonEdit} onClick={handleEdit}>
						Edit
					</button>
					<button className={style.rm} onClick={handleDeleteClick}>
						&times;
					</button>
					{showDeleteConfirmation && (
						<DeleteConfirmation
							onCancel={handleDeleteCancel}
							onConfirm={handleDeleteConfirm}
						/>
					)}
				</li>
			)}
		</>
	);
};
export default TodoItem;
