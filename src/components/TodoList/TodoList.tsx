import { FilterType, ITodo } from "@/types";
import { useState } from "react";
import './TodoList.module.css';
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
            <div className="todo-list_empty">
                <p>Задач нет. Добавьте первую задачу</p>
            </div>
        )
    }

    return (
        <section className="todo-list">
            <div className="todo-list_header">
                <div className="filters">
                    <Button type="dashed" 
                    className={`filter-button ${filter === 'all' ? "active" : ''}`}
                    onClick={() => setFilter('all')} >
                        Все ({todos.length})
                    </Button>
                    <Button type="dashed" 
                    className={`filter-button ${filter === 'active' ? "active" : ''}`}
                    onClick={() => setFilter('active')} >
                        Активные ({activeCount})
                    </Button>
                    <Button type="dashed" 
                    className={`filter-button ${filter === 'completed' ? "active" : ''}`}
                    onClick={() => setFilter('completed')} >
                        Выполненные ({completedCount})
                    </Button>
                </div>
            </div>
            <div className="todo-items">
                {filteredTodos.length === 0 ? (
                    <div className="no-tasks">
                        {filter === 'active' && 'Все задачи выполнены'}
                        {filter === 'completed' && 'Задач нет'}
                    </div>
                ) : (
                    filteredTodos.map(todo => (
                        <TodoItem key={todo.id} 
                        todo={todo} 
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onToggle={handleToggle} 
                        />
                    ))
                )}
            </div>
            <div className="todo-list_footer">
                <p> Осталось {activeCount} задач </p>
                {completedCount > 0 && (
                    <p> Выполненных задач: {completedCount} </p>
                )}
            </div>
        </section>
    )
}