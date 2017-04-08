import tasksContainerTemplate from './tasks-container.component.html'

class TasksContainerComponent {
    public static $inject = [];

    public tasks: ITask[];
    public previewItem: ITask;
    public statuses: Array<Status> = ['todo', 'doing', 'done'];

    public onPreview: (obj: {task: ITask}) => void;
    public onMove: (obj: {task: ITask, status: Status}) => void;


    public getTasksByStatus (status: Status): Array<ITask> {
        return this.tasks.filter((task: ITask) => {
            return task.status === status;
        })
    }

    public showPreview(task: ITask): void {
        this.onPreview({task});
    }

    public moveTask (obj: any): void {
        this.onMove(<any>{obj});
    }
}

export const tasksContainerComponent = {
    bindings: {
        tasks: "<",
        previewItem: "<",
        onPreview: "&",
        onMove: "&"
    },
    controller: TasksContainerComponent,
    template: tasksContainerTemplate
};
