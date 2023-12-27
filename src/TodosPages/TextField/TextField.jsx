import React from 'react';
import style from './TextField.module.css';

const TextField = (props) => {
	const { error, type, ...rest } = props;

	return (
		<div className={style.TextField}>
			<label className={style.TextFieldLabel}>{props.name}</label>
			<input type={type} {...rest} className={style.Input} />
		</div>
	);
};

export default TextField;
