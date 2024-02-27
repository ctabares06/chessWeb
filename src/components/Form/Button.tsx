import React from 'react';
import '../../styles/form/button.styl';
import { color } from '../../types';

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	text: string;
	color: color;
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
