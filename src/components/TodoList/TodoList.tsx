import { FilterType, ITodo } from "@/types";
import { useState } from "react";
import styles from './TodoList.module.css';
import { Button } from 'antd';
import TodoItem from "../TodoItem/TodoItem";

interface TodoListProps {
    todos: ITodo[];
    onUpdateTodos: (todos: ITodo[]) => void;
}

export default function TodoList({todos, onUpdateTodos}: TodoListProps) {
    const [filter, setFilter] = useState<FilterType>('all');

    const completedCount = todos.filter(todo => todo.completed).length;
    const activeCount = todos.filter(todo => !todo.completed).length;

    const filteredTodos = todos.filter(todo => {
        switch (filter) {
            case 'active':
                return !todo.completed;
            case 'completed':
                return todo.completed;
            default:
                return true;
        }
    })

    const handleToggle = (id: string) => {
        const updatedTodo = todos.map(todo => 
            todo.id === id ? {... todo, completed: !todo.completed} : todo);
        onUpdateTodos(updatedTodo);
    }

    const handleDelete = (id: string) => {
        const updatedTodo = todos.filter(todo => todo.id !== id);
        onUpdateTodos(updatedTodo);
    }

    const handleEdit = (id: string, newText: string) => {
        const updatedTodo = todos.map(todo => todo.id === id ? { ...todo, text: newText} : todo);
        onUpdateTodos(updatedTodo);
    }

    if (todos.length === 0) {
        return (
            <div className={styles.todoListEmpty}>
                <p>Задач нет. Добавьте первую задачу</p>
            </div>
        )
    }

    return (
        <section className={styles.todoList}>
            <div className={styles.todoListHeader}>
                <Button type="dashed" 
                className={`${styles.filterButton} ${filter === 'all' ? "active"  : ''}`}
                onClick={() => setFilter('all')} >
                    Все ({todos.length})
                </Button>
                <Button type="dashed" 
                className={`${styles.filterButton} ${filter === 'active' ? "active" : ''}`}
                onClick={() => setFilter('active')} >
                    Активные ({activeCount})
                </Button>
                <Button type="dashed" 
                className={`${styles.filterButton} ${filter === 'completed' ? "active" : ''}`}
                onClick={() => setFilter('completed')} >
                    Выполненные ({completedCount})
                </Button>
            </div>
            <div className={styles.todoItems}>
                {filteredTodos.map(todo => (
                        <TodoItem key={todo.id} 
                        todo={todo} 
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onToggle={handleToggle} 
                        />
                ))}
            </div>
            <div className={styles.todoListFooter}>
                <p className={styles.text}> Осталось задач: {activeCount} </p>
            </div>
        </section>
    )
}