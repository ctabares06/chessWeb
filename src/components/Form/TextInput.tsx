import Input from './Input';
import { color } from '../../types';
import '../../styles/form/text.styl';
import React from 'react';

type TextInputType = React.InputHTMLAttributes<HTMLInputElement> & {
	color: color;
};

const TextInput: React.FC<TextInputType> = ({
	className,
	color = '',
	...params
}) => {
	return (
		<Input
			{...params}
			className={`${className} text text--${color}`}
			type="text"
		/>
	);
};

export default TextInput;
