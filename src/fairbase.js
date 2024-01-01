import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyBizJ2LBtC0kbsQlUjCfLZJ5wiT-2rGJuo',
	authDomain: 'todolist-5c023.firebaseapp.com',
	projectId: 'todolist-5c023',
	storageBucket: 'todolist-5c023.appspot.com',
	messagingSenderId: '2337912609',
	appId: '1:2337912609:web:e2aecf8644d26fdd6c3060',
	databaseURL: 'https://todolist-5c023-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
