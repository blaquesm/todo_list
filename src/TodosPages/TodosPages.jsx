import React, { useEffect, useState } from 'react';
import style from './TodosPages.module.css';
import TodosList from './TodosList/TodosList';
import SearchQuery from './SearchQuery/SearchQuery';
import CreateTodo from './CreateTodo/CreateTodo';

const TodoPage = () => {
	const [todo, setTodo] = useState([]);
	const [isLoadin, setIsLoadin] = useState(false);
	const [sortTodos, setSortTodos] = useState(false);

	const loadTodos = async () => {
		try {
			const response = await fetch(`http://localhost:3005/posts`);
			const data = await response.json();
			const sortedData = sortTodos
				? data.slice().sort((a, b) => a.title.localeCompare(b.title))
				: data;
			setTodo(sortedData);
			setIsLoadin(false);
		} catch (error) {}
	};

	const createTodo = async (newTodo) => {
		try {
			const response = await fetch('http://localhost:3005/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newTodo),
			});

			const createdTodo = await response.json();
			setTodo((prevTodo) => [...prevTodo, createdTodo]);
		} catch (error) {
			console.error(error);
		}
	};

	const editTodo = async (id, payload) => {
		const response = await fetch(`http://localhost:3005/posts/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...payload }),
		});

		const todoIndex = todo.findIndex((prod) => prod.id === id);
		const updateTodo = await response.json();
		const copyData = todo.slice();
		copyData[todoIndex] = updateTodo;
		setTodo(copyData);
		console.log('updateTodo', updateTodo);
	};

	const deleteTodo = async (id) => {
		try {
			await fetch(`http://localhost:3005/posts/${id}`, {
				method: 'DELETE',
			});
			setTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
		} catch (error) {
			console.error('Error deleting todo:', error);
		}
	};

	useEffect(() => {
		setIsLoadin(true);
		loadTodos();
	}, [sortTodos, setTodo]);

	return (
		<div className={style.App}>
			<div className={style.header}>
				<h1 className={style.title}>Todo list</h1>
				<hr />
				<div className={style.createTodo}>
					<CreateTodo createTodo={createTodo} />
				</div>
				<div className={style.actions}>
					<SearchQuery setTodo={setTodo} setIsLoadin={setIsLoadin} />
					<button
						className={sortTodos ? style.sortButtonOff : style.sortButtonOn}
						onClick={() => setSortTodos(!sortTodos)}
					>
						{sortTodos ? 'Sort off' : 'Sort on'}
					</button>
				</div>
			</div>
			{isLoadin ? (
				<div className={style.loader}></div>
			) : (
				<>
					<TodosList data={todo} editTodo={editTodo} deleteTodo={deleteTodo} />
				</>
			)}
		</div>
	);
};
export default TodoPage;
