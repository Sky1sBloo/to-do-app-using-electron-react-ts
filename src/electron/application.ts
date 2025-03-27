import { ipcMainHandle } from "./ipcMainHandler.js"
import { Tasks } from "./Tasks.js";

export const runApplication = () => {
    const tasks = new Tasks();
    ipcMainHandle('addTaskEvent', (newTask: string) => {
        tasks.addTask(newTask);
        return tasks.getTasks();
    });

    ipcMainHandle('removeTaskEvent', (taskToRemove: string) => {
        tasks.removeTask(taskToRemove);
        return tasks.getTasks();
    })
};
