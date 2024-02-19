import React, { useState } from 'react';
import { Sides } from '../../types';
import styles from '../../styles/board/form.module.styl'
import TextInput from './TextInput';
import RadioInput from './RadioInput';
import Button from './Button';

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
		<form className={styles.content} action="" onSubmit={sendForm}>
			<div className={styles.input}>
				<h3 className={styles.title}>{title}</h3>
			</div>
			<div className={styles.input}>
				<TextInput
					placeholder="Player name"
					value={name}
					onChange={handleName}
				/>
			</div>
			<div className={styles.input}>
				<div style={{ display: 'flex', justifyContent: 'center', paddingTop: "5px", paddingBottom: "5px" }}>
					<RadioInput
						name="side"
						id='radio1'
						checked={side === Sides.white}
						value={Sides.white}
						onChange={handleSide}
						text='white'
					/>
					<RadioInput
						name="side"
						id='radio2'
						checked={side === Sides.black}
						value={Sides.black}
						onChange={handleSide}
						text="black"
					/>
				</div>
			</div>
			<Button type="submit" text={buttonText} />
		</form>
	);
};

export default Form;
