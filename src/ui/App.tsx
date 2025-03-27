import { useState } from 'react';
import './App.css'
import Task from './Task';

export const App = () => {
    const [newTask, setNewTask] = useState<string>('');
    const [tasks, setTasks] = useState<string[]>([]);

    const handleAddTask = async (event: React.FormEvent) => {
        event.preventDefault();
        setTasks(await window.electron.addTask(newTask));
    }

    const handleRemoveTask = async (taskToRemove: string) => {
        setTasks(await window.electron.removeTask(taskToRemove));
    }

    return (
        <>
            <h1><span>Todo</span> App</h1>
            <form onSubmit={(event) => handleAddTask(event)}>
                <input type='text'
                    placeholder='Task today...'
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <input type='submit' value='+' />
            </form>
            <article id='task-list'>
                {
                    tasks.map((task: string, index: number) =>
                        <Task key={index} taskName={task} deleteCallback={handleRemoveTask} />)
                }
            </article>
        </>
    )
}

export default App;
