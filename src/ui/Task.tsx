import './Task.css';

type TaskProps = {
    taskName: string
    deleteCallback: (taskName: string) => void
}
export const Task = ({ taskName, deleteCallback }: TaskProps) => {
    const handleDelete = (event: React.FormEvent) => {
        event.preventDefault();
        deleteCallback(taskName);
    }

    return (
        <div className='taskCard'>
            <p>{taskName}</p>
            <button onClick={handleDelete}>-</button>
        </div>
    );
}

export default Task;
