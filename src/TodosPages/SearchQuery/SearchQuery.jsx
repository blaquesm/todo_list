import TextField from '../TextField/TextField';
import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import useDebounce from '../hooks/useDebounce';
import { db } from '../../fairbase';
import style from './SearchQuery.module.css';

const SearchQuery = ({ setIsLoadin, setTodo }) => {
	const [searchQuery, setSearchQueru] = useState('');
	const debounceValue = useDebounce(searchQuery, 1500);
	const [error, setError] = useState({});

	const searchTodos = async () => {
		try {
			const todosRef = ref(db, 'posts');
			const snapshot = await get(todosRef);
			if (snapshot.exists()) {
				const data = snapshot.val();
				const filteredTodos = Object.values(data).filter((todo) =>
					todo.title.toLowerCase().includes(debounceValue.toLowerCase()),
				);
				setTodo(filteredTodos);
			} else {
				setTodo([]);
			}
			setIsLoadin(false);
		} catch (error) {}
	};
	const handleChange = (e) => {
		setSearchQueru(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		searchTodos();
	};

	useEffect(() => {
		const fetchTodos = async () => {
			try {
				setIsLoadin(true);
				const todosRef = ref(db, 'posts');
				const snapshot = await get(todosRef);

				if (snapshot.exists()) {
					const data = snapshot.val();
					setTodo(Object.values(data));
				} else {
					setTodo([]);
				}
			} catch (error) {
			} finally {
				setIsLoadin(false);
			}
		};

		if (debounceValue.trim() !== '') {
			fetchTodos();
		}
	}, [debounceValue, setIsLoadin, setTodo]);

	return (
		<div className={style.searchContainer}>
			<form onSubmit={handleSubmit}>
				<TextField
					className={style.searchInput}
					id="search"
					name="search"
					type="text"
					placeholder="search"
					value={searchQuery}
					onChange={handleChange}
					error={error.search}
				/>
				<button type="submit">Search</button>
			</form>
		</div>
	);
};
export default SearchQuery;
