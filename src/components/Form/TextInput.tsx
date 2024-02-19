import Input from './Input';
import '../../styles/form/text.styl'

const TextInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ ...params }) => {
    return (
        <Input {...params} className="input-text yellow" type="text" />
    )
}

export default TextInput;