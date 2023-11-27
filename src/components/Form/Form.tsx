import React, { useState } from 'react';
import { Sides } from '../../types';

const Form: React.FC<{
	title: string;
	buttonText: string;
	defaultSide: Sides;
	updatePlayer: (name: string, side: Sides) => void;
}> = ({ title, buttonText, defaultSide, updatePlayer }) => {
	const [name, setName] = useState('');
	const [side, setSide] = useState<Sides>(defaultSide);

	const handleName = (event: React.FormEvent<HTMLInputElement>) => {
		setName(event.currentTarget.value);
	};

	const handleSide = (event: React.FormEvent<HTMLInputElement>) => {
		setSide(event.currentTarget.value as Sides);
	};

	const sendForm: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		updatePlayer(name, side);
	};

	return (
		<div>
			<form action="" onSubmit={sendForm}>
				<h3>{title}</h3>
				<input
					type="text"
					placeholder="name"
					value={name}
					onChange={handleName}
				/>
				<span>white</span>
				<input
					type="radio"
					name="side"
					checked={side === Sides.white}
					value={Sides.white}
					onChange={handleSide}
				/>
				<span>black</span>
				<input
					type="radio"
					name="side"
					checked={side === Sides.black}
					value={Sides.black}
					onChange={handleSide}
				/>
				<button type="submit">{buttonText}</button>
			</form>
		</div>
	);
};

export default Form;
