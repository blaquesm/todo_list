import { useEffect, useState } from 'react';
import style from './App.module.css';

export const App = () => {
	const [todo, setTodo] = useState([]);
	const [isLoadin, setIsLoadin] = useState(true);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos?_limit=20')
			.then((loadedData) => loadedData.json())
			.then((loadedList) => {
				setTimeout(() => {
					setTodo(loadedList);
					setIsLoadin(false);
				}, 2000);
			});
	}, []);
	return (
		<div className={style.App}>
			<div>
				<h1>Todo list</h1>
				<hr />
			</div>
			{isLoadin ? (
				<div className={style.loader}></div>
			) : (
				todo.map(({ id, title }) => (
					<ul key={id} className={style.header}>
						<li className={style.li}>
							<input type="checkbox" /> {id} {title}
							<span className={style.rm}>&times;</span>
						</li>
					</ul>
				))
			)}
		</div>
	);
};
