import React from 'react';
import style from './TodosList.module.css';
import TodoItem from './TodosItem/TodosItem';

const TodosList = ({ editTodo, data, deleteTodo }) => {
	return (
		<ul className={style.Ul}>
			{data.length === 0 ? (
				<p className={style.noNotes}>Todo List is empty </p>
			) : (
				Object.entries(data).map(([key, todo]) => (
					<TodoItem
						key={key}
						itemId={key}
						{...todo}
						editTodo={editTodo}
						deleteTodo={deleteTodo}
					/>
				))
			)}
		</ul>
	);
};
export default TodosList;
