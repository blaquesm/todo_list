import { useEffect, useState } from 'react';
import style from './App.module.css';

export const App = () => {
	const [todo, setTodo] = useState([]);
	const [isLoadin, setIsLoadin] = useState(false);

	useEffect(() => {
		setIsLoadin(true);

		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedList) => {
				setTodo(loadedList);
			})
			.finally(() => setIsLoadin(false));
	}, []);
	return (
		<div className={style.App}>
			{isLoadin ? (
				<div className={style.loader}></div>
			) : (
				todo.map(({ id, title, text }) => (
					<div key={id} className={style.header}>
						{id} : {title}
					</div>
				))
			)}
		</div>
	);
};
