import React from "react"
import "../../styles/form/button.styl"

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {text: string}> = ({ text='', ...rest }) => {
    return (
        <button {...rest} className="button button--yellow">
            <span className="button__text button__text--yellow">{ text }</span>
        </button>
    )
}

export default Button