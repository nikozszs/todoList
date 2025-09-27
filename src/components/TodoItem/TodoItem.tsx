import { ITodo } from "@/types";
import { useState } from "react";
import styles from './TodoItem.module.css';
import { Button, Checkbox, Input } from 'antd';

interface TodoItemProps {
    todo: ITodo;
    onEdit: (id: string, newText: string) => void;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}

export default function TodoItem({todo, onEdit, onDelete, onToggle}: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleEdit = () => {
        if (isEditing) {
            const trimText = editText.trim();
            if (trimText) {
                onEdit(todo.id, trimText)
            } else {
                setEditText(todo.text);
            }
        }
        setIsEditing(!isEditing);
    }

    const handleSave = () => {
        handleEdit();
    }

    const handleCancel = () => {
        setEditText(todo.text);
        setIsEditing(false);
    }

    return (
        <div className={`${styles.todoItem} ${todo.completed ? 'completed': ''}`}>
            <div className={styles.todoContent}>
                <Checkbox className={styles.checkbox} checked={todo.completed} onChange={() => onToggle(todo.id)} />
                {isEditing ? (
                    <div className={styles.editContainer}>
                        <Input className={`${styles.editInput} ${styles.todoText}`}
                        type="text" 
                        value={editText} 
                        onChange={(e) => setEditText(e.target.value)}/>
                        <div className={styles.editButtons}>
                            <Button className={styles.button} onClick={handleSave}>✓</Button>
                            <Button className={styles.button} onClick={handleCancel}>✕</Button>
                        </div>
                    </div>
                ) : (
                    <>
                        <span className={styles.todoText} onClick={() => setIsEditing(true)}>
                            {todo.text}
                        </span>
                    </>
                )}
            </div>
            {!isEditing && (
                <div className={styles.todoActions} >
                    <Button className={styles.button} title="Редактировать" onClick={() => setIsEditing(true)}>✏️</Button>
                    <Button className={styles.button} title="Удалить" onClick={() => onDelete(todo.id)}>🗑️</Button>
                </div>
            )}
        </div>
    )
}
