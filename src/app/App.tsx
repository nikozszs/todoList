import TodoForm from '@/components/TodoForm/TodoForm';
import styles from './App.module.css';
import TodoItem from '@/components/TodoItem/TodoItem';

export default function App() {
    return (
        <div className={styles.app}>
            <h1 className={styles.title}>To do list</h1>
            <TodoForm />
        </div>
    )
}