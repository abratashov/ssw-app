class TaskComponent {
    public static $inject = [];

    public task: ITask;
    public statuses: Array<Status> = ['todo', 'doing', 'done'];
    public taskLabel = 'SSW'; // Stands for SoftServe Workshop
    public active: boolean;

    public onPreview: (task: ITask) => void;
    public onMove: (obj: {task: ITask, status: Status}) => void;


    public getRemainingStatuses (currentStatus: Status): Array<Status> {
        let remainingStatuses: Array<Status> = [];

        this.statuses.forEach((status: Status) => {
            if (status !== currentStatus) {
                remainingStatuses.push(status);
            }
        });

        return remainingStatuses;
    }

    public showPreview(task: ITask): void {
        this.onPreview(task);
    }

    public moveTask (obj: {task: ITask, status: Status}): void {
        this.onMove(<any>{obj});
    }
}

export const taskComponent = {
    bindings: {
        task: "<",
        active: "<",
        onPreview: "&",
        onMove: "&"
    },
    controller: TaskComponent,
    templateUrl: 'app/components/tasks/task/task.component.html'
};
