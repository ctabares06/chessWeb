import React from 'react';
import { ColorWithWhite } from '../../types';

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	text: string;
	color: ColorWithWhite;
};

const Button: React.FC<ButtonType> = ({
	text = '',
	className = '',
	color = '',
	...rest
}) => {
	return (
		<button {...rest} className={`${className} button button--${color}`}>
			<span className={`button__text button__text--${color}`}>
				{text}
			</span>
		</button>
	);
};

export default Button;
