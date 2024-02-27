import React from 'react';
import Input from './Input';
import '../../styles/form/radio.styl';
import { color } from '../../types';

type RadioInputType = React.InputHTMLAttributes<HTMLInputElement> & {
	text: string;
	color: color;
};

const RadioInput: React.FC<RadioInputType> = ({
	text = '',
	className = '',
	color = '',
	checked = false,
	id,
	...rest
}) => {
	return (
		<label className={`${className} radio`} htmlFor={id}>
			<Input {...rest} type="radio" id={id} />
			<span className={`radio__button radio__button--${color}`}>
				<div />
			</span>
			<span className={`radio__text radio__text--${color}`}>{text}</span>
		</label>
	);
};

export default RadioInput;
