import { useEffect, useState } from 'react';
import style from './App.module.css';

export const App = () => {
	const [todo, setTodo] = useState([]);
	const [isLoadin, setIsLoadin] = useState(true);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos?_limit=40')
			.then((loadedData) => loadedData.json())
			.then((loadedList) => {
				setTimeout(() => {
					setTodo(loadedList);
					setIsLoadin(false);
				}, 1000);
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
				todo.map(({ id, title, completed }) => (
					<ul key={id} className={style.header}>
						<li className={style.li}>
							<span className={completed ? style.done : ''}>
								<input type="checkbox" checked={completed} readOnly />{' '}
								{title}
							</span>
							<button className={style.rm}>&times;</button>
						</li>
					</ul>
				))
			)}
		</div>
	);
};
