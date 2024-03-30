import React, { useState } from 'react';
import { Color, ColorWithWhite } from '../../types';
import TextInput from './TextInput';
import RadioInput from './RadioInput';
import Button from './Button';

type FormType = {
	title: string;
	buttonText: string;
	color: ColorWithWhite;
	disabledColors: Record<Color, boolean>;
	onSubmit: (name: string, color: Color) => void;
	onChangeColor: (color: Color) => void;
};

const Form: React.FC<FormType> = ({
	title,
	buttonText,
	color,
	disabledColors,
	onSubmit,
	onChangeColor,
}) => {
	const [name, setName] = useState<string>('');
	const [chessColor, setChessColor] = useState<Color | null>(null);
	const [noName, setNoName] = useState<boolean>(false);
	const [noChessColor, setNoChessColor] = useState<boolean>(false);

	const handleName = (event: React.FormEvent<HTMLInputElement>) => {
		if (noName && event.currentTarget.value.length >= 3) {
			setNoName(false);
		}
		setName(event.currentTarget.value);
	};

	const handleChessColor = (event: React.FormEvent<HTMLInputElement>) => {
		if (noChessColor) {
			setNoChessColor(false);
		}
		setChessColor(event.currentTarget.value as Color);
		onChangeColor(event.currentTarget.value as Color);
	};

	const sendForm: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		let cancel = false;
		if (!name || name.length < 3) {
			setNoName(true);
			cancel = true;
		}

		if (chessColor === null) {
			setNoChessColor(true);
			cancel = true;
		}

		if (cancel) {
			return;
		}

		onSubmit(name, chessColor as Color);
	};

	return (
		<form className="form" onSubmit={sendForm}>
			<h3 className={`form__title form__title--${color}`}>{title}</h3>
			<div className="form__input">
				<TextInput
					placeholder="Player name"
					value={name}
					onChange={handleName}
					color={color}
				/>
				{noName && <span className="form__error">Provide a name</span>}
			</div>
			<div className="form__input">
				<div className="form__radios">
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
				{noChessColor && (
					<span className="form__error">Choose a color</span>
				)}
			</div>
			<Button color={color} type="submit" text={buttonText} />
		</form>
	);
};

export default Form;
