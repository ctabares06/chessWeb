import React from "react";
import Input from "./Input";
import styles from "../../styles/form/radio.module.styl"

const RadioInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { text: string }> = ({ text = '', checked = false, id, ...rest }) => {

    return (
        <label className={styles.container} htmlFor={id}>
            <Input {...rest} className={styles.input} type="radio" id={id} />
            <span className={styles.button}>
                <div />
            </span>
            <span className={styles.test}>{text}</span>
        </label>
    )
}

export default RadioInput;