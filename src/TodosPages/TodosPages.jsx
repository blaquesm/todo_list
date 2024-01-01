import React, { useEffect, useState } from 'react';
import style from './TodosPages.module.css';
import TodosList from './TodosList/TodosList';
import SearchQuery from './SearchQuery/SearchQuery';
import CreateTodo from './CreateTodo/CreateTodo';
import { ref, onValue, push, get, set, update, remove } from 'firebase/database';
import { db } from '../fairbase';

const TodoPage = () => {
	const [todo, setTodo] = useState([]);
	const [isLoadin, setIsLoadin] = useState(true);
	const [sortTodos, setSortTodos] = useState(false);
	const [selectedItemId, setSelectedItemId] = useState(null);
	const [istDeleting, setIsDeleting] = useState(false);
	const todoDbRef = ref(db, 'posts');

	const loadTodos = () => {
		try {
			onValue(todoDbRef, (snapshot) => {
				const data = snapshot.val() || {};
				console.log(data);
				const dataArray = Object.keys(data).map((key) => ({
					id: key,
					...data[key],
				}));

				const sortedData = sortTodos
					? dataArray.slice().sort((a, b) => a.title.localeCompare(b.title))
					: dataArray;

				setTodo(sortedData);
				setIsLoadin(false);
			});
		} catch (error) {
			console.error(error);
		}
	};

	const createTodo = async (newTodo) => {
		try {
			const newTodoRef = push(todoDbRef);
			await set(newTodoRef, newTodo);
		} catch (error) {
			console.error(error);
		}
	};

	const editTodo = async (itemId, payload) => {
		const updateTodoDbRef = ref(db, `posts/${itemId}`);

		try {
			await update(updateTodoDbRef, {
				...payload,
			});

			setTodo((prevTodo) => {
				const updatedTodo = { ...prevTodo };
				if (updatedTodo[itemId]) {
					updatedTodo[itemId] = {
						...updatedTodo[itemId],
						...payload,
					};
				} else {
					updatedTodo[itemId] = {
						...payload,
					};
				}
				return updatedTodo;
			});

			console.log('Todo успешно обновлен');
		} catch (error) {
			console.error('Ошибка при обновлении todo:', error);
		}
	};

	const deleteTodo = async (itemId) => {
		try {
			setIsDeleting(true);
			const deleteTodoDbRef = ref(db, `posts/${itemId}`);
			await remove(deleteTodoDbRef);
			const snapshot = await get(deleteTodoDbRef);
			if (!snapshot.exists()) {
				console.log('Todo успешно удален');
				setTodo((prevTodo) => {
					const updatedTodo = { ...prevTodo };
					delete updatedTodo[itemId];
					return updatedTodo;
				});
			} else {
				console.error('Ошибка: Элемент не удален');
			}
		} catch (error) {
			console.error('Ошибка при удалении todo:', error);
		} finally {
			setIsDeleting(false);
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
