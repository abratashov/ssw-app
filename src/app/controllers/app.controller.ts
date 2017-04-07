import { ApiService } from '../services';
import { Task } from '../models';
import "angular";

export class TodoAppController {
    
    public static $inject = ["ApiService"];

    public taskLabel = 'SSW'; //SoftServe Workshop
    public tasks = [];
    public statuses = ['todo', 'doing', 'done'];
    public showPreviewForItem = false;
    public sidebarExtended = false;
    public formAction = ''; // 'create' | 'update'
    public itemToPreview = null;
    public formTask = null;

    constructor (private apiService: ApiService) {
        this.apiService
            .getAllTasks()
            .then((tasks: ITask[]) => {
                this.tasks = tasks;
            });
    }

    public getTasksByStatus = (status: Status) => {
        return this.tasks.filter((task: ITask) => {
            return task.status === status;
        })
    };

    public showPreview = (task: ITask) => {
        this.showPreviewForItem = true;
        this.itemToPreview = task;
        this.sidebarExtended = false;
    };

    public submitForm = (task: ITask) => {
        switch (this.formAction) {
            case 'create':
                task.id = Date.now();
                this.apiService
                    .createTask(task)
                    .then((res: any) => {
                        this.tasks.push(task);
                    });
                break;
            case 'update':
                var index = this.tasks.findIndex((item: ITask) => {
                    return item.id === task.id;
                });
    
                this.apiService
                    .updateTask(task.id, task)
                    .then((response: any) => {
                        this.tasks.splice(index, 1, task);
                    });
    
            default:
        }

        this.hideSidebarForm();
    };

    public removeTask = (task: ITask) => {
        const index = this.tasks.indexOf(task);

        if (index < 0 || !window.confirm("Are you sure you want to remove the task " + this.taskLabel + task.id + "?")) {
            return;
        }

        this.apiService
            .removeTask(task.id)
            .then((response: any) => {
                this.tasks.splice(index, 1);
                this.showPreviewForItem = false;
                this.itemToPreview = null;
            });
    };

    public cancelForm = () => {
        this.hideSidebarForm();
    };

    public getDateFromTimestamp = (timestamp: number, locale: boolean) => {
        return locale ? (new Date(timestamp)).toLocaleString() : new Date(timestamp);
    };

    public showSidebarForm = (formAction: FormAction) => {
        this.sidebarExtended = true;
        this.showPreviewForItem = false;
        this.formAction = formAction;

        switch (formAction) {
            case 'create':
                this.formTask = new Task(null, '', '', Date.now(), 'todo');
                break;
            case 'update':
                this.formTask = Object.assign({}, this.itemToPreview);
                break;
        }
    };

    public getRemainingStatuses = (currentStatus: Status) => {
        let remainingStatuses = [];

        this.statuses.forEach((status: Status) => {
            if (status !== currentStatus) {
                remainingStatuses.push(status);
            }
        });

        return remainingStatuses;
    };

    public moveTask = (task, newStatus): void => {
        let index = this.tasks.indexOf(task);
        let updated = Object.assign({}, task);

        updated.status = newStatus;

        this.apiService
            .updateTask(task.id, updated)
            .then((response: any) => {
                this.tasks[index].status = newStatus;
            });
    };

    public hideSidebarForm = () => {
        this.sidebarExtended = false;
    }
}
