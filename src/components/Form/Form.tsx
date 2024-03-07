import React, { useState } from 'react';
import { Color, ColorWithWhite } from '../../types';
import TextInput from './TextInput';
import RadioInput from './RadioInput';
import Button from './Button';
import '../../styles/form/form.styl';

type FormType = {
	title: string;
	buttonText: string;
	color: ColorWithWhite;
	disabledColors: Record<Color, boolean>
	onSubmit: (name: string, color: Color) => void;
	onChangeColor: (color: Color) => void;
}

const Form: React.FC<FormType> = ({ title, buttonText, color, disabledColors, onSubmit, onChangeColor }) => {
	const [name, setName] = useState('');
	const [chessColor, setChessColor] = useState<Color | null>(null);

	const handleName = (event: React.FormEvent<HTMLInputElement>) => {
		setName(event.currentTarget.value);
	};

	const handleChessColor = (event: React.FormEvent<HTMLInputElement>) => {
		setChessColor(event.currentTarget.value as Color)
		onChangeColor(event.currentTarget.value as Color)
	}

	const sendForm: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		onSubmit(name, chessColor as Color);
	};

	return (
		<form className="form" action="" onSubmit={sendForm}>
			<h3 className="form__title">{title}</h3>
			<TextInput
				className="form__input"
				placeholder="Player name"
				value={name}
				onChange={handleName}
				color={color}
			/>
			<div className="form__input">
				<div className='form__radios'>
					<RadioInput
						name="chessColor"
						id="pink"
						value="pink"
						text="pink"
						color="pink"
						checked={chessColor === 'pink'}
						onChange={handleChessColor}
						disabled={disabledColors.pink}
					/>
					<RadioInput
						name="chessColor"
						id="navy"
						value="navy"
						text="navy"
						color="navy"
						checked={chessColor === 'navy'}
						onChange={handleChessColor}
						disabled={disabledColors.navy}
					/>
					<RadioInput
						name="chessColor"
						id="yellow"
						value="yellow"
						text="yellow"
						color="yellow"
						checked={chessColor === 'yellow'}
						onChange={handleChessColor}
						disabled={disabledColors.yellow}
					/>
				</div>
			</div>
			<Button color={color} type="submit" text={buttonText} />
		</form>
	);
};

export default Form;
