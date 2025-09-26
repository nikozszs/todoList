import TodoForm from '@/components/TodoForm/TodoForm';
import styles from './App.module.css';

export default function App() {
    return (
        <div className={styles.app}>
            <h1 className={styles.text}>To do list</h1>
            <TodoForm />
        </div>
    )
}