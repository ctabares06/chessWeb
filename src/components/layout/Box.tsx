import React from 'react';
import '../../styles/layout/box.styl';
import { color } from '../../types';

type BoxType = React.HtmlHTMLAttributes<HTMLDivElement> & {
	children: JSX.Element;
	color: color;
};

const Box: React.FC<BoxType> = ({ children, className = '', color = '' }) => {
	return <div className={`${className} box box--${color}`}>{children}</div>;
};

export default Box;
