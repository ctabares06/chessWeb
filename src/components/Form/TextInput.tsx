import Input from './Input';
import styles from '../../styles/form/text.module.styl'

const TextInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ ...params }) => {
    return (
        <Input {...params} className={styles.main} type="text" />
    )
}

export default TextInput;