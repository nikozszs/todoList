import { useState } from 'react';
import styles from './TodoForm.module.css';
import { Input, Button } from 'antd';

interface TodoFormProps {
    onAddTodo: (text: string) => void;
}

export default function TodoForm({onAddTodo}: TodoFormProps){
    const [value, setValue] = useState('');

    const addTodo = () => {
        const trimValue = value.trim();

        if (trimValue) {
            onAddTodo(trimValue);
            setValue('');
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addTodo();
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
                <Input className={styles.input} 
                placeholder='Напишите задание' 
                size="middle" 
                onChange={handleInputChange}/>
                <Button type="primary" onClick={addTodo}>Добавить</Button>
            </div>
        </form>
    )
}