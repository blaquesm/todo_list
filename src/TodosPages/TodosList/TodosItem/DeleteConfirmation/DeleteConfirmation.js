import React from 'react';
import ReactDOM from 'react-dom';
import style from './DeleteConfirmation.module.css';

const modalRoot = document.getElementById('modal-root');
const DeleteConfirmation = ({ onCancel, onConfirm }) => {
	const modal = (
		<div className={style.modal}>
			<p>Are you sure you want to delete this item?</p>
			<button onClick={onConfirm}>Yes</button>
			<button onClick={onCancel}>No</button>
		</div>
	);
	return ReactDOM.createPortal(modal, modalRoot);
};

export default DeleteConfirmation;
