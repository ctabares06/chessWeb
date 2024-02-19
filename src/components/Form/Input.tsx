import React from "react"

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ ...params }) => {
 return (
    <input {...params} />
 )
}

export default Input