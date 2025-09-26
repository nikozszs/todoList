import { useState } from 'react';
import styles from './TodoForm.module.css';
import { Input, Button } from 'antd';

interface TodoFormProps {
    addTodo: (text: string) => void;
}

export default function TodoForm({addTodo}: TodoFormProps){
    const [value, setValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const trimValue = value.trim();

        if (trimValue) {
            addTodo(trimValue);
            setValue('');
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
                <Input placeholder='Напишите задание' size="middle" />
                <Button type="default">Добавить</Button>
            </div>
        </form>
    )
}