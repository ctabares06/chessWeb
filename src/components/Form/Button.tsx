import React from "react"
import styles from "../../styles/form/button.module.styl"

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {text: string}> = ({ text='', ...rest }) => {
    return (
        <button {...rest} className={styles.default}>
            <span className={styles.test}>{ text }</span>
        </button>
    )
}

export default Button