import TodoForm from '@/components/TodoForm/TodoForm';
import styles from './App.module.css';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ITodo } from '@/types';
import TodoList from '@/components/TodoList/TodoList';

export default function App() {
    const [todos, setTodos] = useLocalStorage<ITodo[]>('todos', [])

    const handleAdd = (text: string) => {
        const newTodo: ITodo = {
            id: Date.now().toString(),
            text,
            completed: false
        }
        setTodos(prev => [ ...prev, newTodo]);
    }

    return (
        <div className={styles.app}>
            <header className={styles.header} >
                <h1 className={styles.title}>To do list</h1>
            </header>
            <main className={styles.main}>
                <TodoForm addTodo={handleAdd} />
                <TodoList todos={todos} onUpdateTodos={setTodos} />
            </main>
            <footer className={styles.footer}>
                <p>Всего задач: {todos.length} </p>
            </footer>
        </div>
    )
}