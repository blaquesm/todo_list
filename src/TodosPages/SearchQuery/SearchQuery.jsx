import TextField from '../TextField/TextField';
import { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import style from './SearchQuery.module.css';

const SearchQuery = ({ setIsLoadin, setTodo }) => {
	const [searchQuery, setSearchQueru] = useState('');
	const debounceValue = useDebounce(searchQuery, 1000);
	const [error, setError] = useState({});

	const searchTodos = async () => {
		try {
			const response = await fetch(
				`http://localhost:3005/posts?q=${debounceValue}`,
			);
			const data = await response.json();
			setTodo(data);
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
				const response = await fetch(
					`http://localhost:3005/posts?q=${debounceValue}`,
				);
				const data = await response.json();
				setTodo(data);
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
