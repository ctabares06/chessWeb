import React, { useState } from 'react';
import { Sides } from '../../types';
import TextInput from './TextInput';
import RadioInput from './RadioInput';
import Button from './Button';
import '../../styles/form/form.styl';

type FormType = {
	title: string;
	buttonText: string;
	defaultSide: Sides;
	updatePlayer: (name: string, side: Sides) => void;
}

const Form: React.FC<FormType> = ({ title, buttonText, defaultSide, updatePlayer }) => {
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
		<form className="form" action="" onSubmit={sendForm}>
			<h3 className="form__title">{title}</h3>
			<TextInput
				className="form__input"
				placeholder="Player name"
				value={name}
				onChange={handleName}
				color="yellow"
			/>
			<div className="form__input">
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						paddingTop: '5px',
						paddingBottom: '5px',
					}}
				>
					<RadioInput
						name="side"
						id="radio1"
						checked={side === Sides.white}
						value={Sides.white}
						onChange={handleSide}
						text="white"
						color="yellow"
					/>
					<RadioInput
						name="side"
						id="radio2"
						checked={side === Sides.black}
						value={Sides.black}
						onChange={handleSide}
						text="black"
						color="yellow"
					/>
				</div>
			</div>
			<Button color="yellow" type="submit" text={buttonText} />
		</form>
	);
};

export default Form;
