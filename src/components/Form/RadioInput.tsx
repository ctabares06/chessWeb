import React from "react";
import Input from "./Input";
import "../../styles/form/radio.styl"

const RadioInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { text: string }> = ({ text = '', checked = false, id, ...rest }) => {

    return (
        <label className="radio" htmlFor={id}>
            <Input {...rest} type="radio" id={id} />
            <span className="radio__button radio__button--yellow">
                <div />
            </span>
            <span className="radio__text radio__text--yellow">{text}</span>
        </label>
    )
}

export default RadioInput;