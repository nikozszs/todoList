import { ITodo } from "@/types";
import { useState } from "react";
import './TodoItem.module.css';
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
        <div className={`todo-item ${todo.completed ? 'completed': ''}`}>
            <div className="todo-content">
                <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />
                {isEditing ? (
                    <div className="edit-container">
                        <Input type="text" 
                        value={editText} 
                        onChange={(e) => setEditText(e.target.value)}/>
                        <div className="edit-buttons">
                            <Button className="save-button" onClick={handleSave}>✓</Button>
                            <Button className="cancel-button" onClick={handleCancel}>✕</Button>
                        </div>
                    </div>
                ) : (
                    <>
                        <span className="todo-text" onClick={() => setIsEditing(true)}>
                            {todo.text}
                        </span>
                    </>
                )}
            </div>
            {!isEditing && (
                <div className="todo-actions">
                    <Button title="Редактировать" onClick={() => setIsEditing(true)} />
                    <Button title="Удалить" onClick={() => onDelete(todo.id)} />
                </div>
            )}
        </div>
    )
}
