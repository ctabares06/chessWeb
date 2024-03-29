import React from 'react';
import { ColorWithWhite } from '../../types';

type BoxType = React.HtmlHTMLAttributes<HTMLDivElement> & {
	children: JSX.Element | JSX.Element[];
	color: ColorWithWhite;
};

const Box: React.FC<BoxType> = ({ children, className = '', color = '' }) => {
	return <div className={`${className} box box--${color}`}>{children}</div>;
};

export default Box;
