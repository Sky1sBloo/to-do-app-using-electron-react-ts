
export class Tasks {
    private tasks: string[];
    public constructor() {
        this.tasks = [];
    }

    public addTask(task: string) {
        this.tasks.push(task);
    }

    public removeTask(task: string) {
        const taskIdx: number = this.tasks.indexOf(task);
        this.tasks.splice(taskIdx, 1);
    }

    public getTasks(): string[] {
        return this.tasks;
    }
}
