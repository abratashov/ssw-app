import appTemplate from './app.component.html';
import { ApiService } from '../services';
import { Task } from '../models';

class AppComponent {
    public static $inject = ["ApiService"];

    public tasks: ITask[] = [];
    public taskLabel = 'SSW';
    public itemToPreview: ITask = null;
    public showPreviewForItem = false;
    public sidebarExtended = false;
    public formAction: FormAction = null;
    public formTask: ITask = null;
    
    constructor(private apiService: ApiService) {

    }

    public $onInit (): void {
        this.apiService
            .getAllTasks()
            .then((tasks: ITask[]) => {
                this.tasks = tasks;
            });
    }

    public showPreviewFor (task: ITask): void {
        this.itemToPreview = task;
        this.showPreviewForItem = true;
    }

    public cancelForm (): void {
        this.hideSidebarForm();
    }

    public hideSidebarForm (): void {
        this.sidebarExtended = false;
    }

    public moveTask ({task, status}): void {
        const index = this.tasks.findIndex((item: ITask) => item.id === task.id);
        const updated = Object.assign({}, task, {status});

        this.apiService
            .updateTask(task.id, updated)
            .then(() => {
                this.tasks[index].status = status;
            });
    }

    public previewTask(task: Task): void {
        this.itemToPreview = task;
        this.showPreviewForItem = true;
        this.hideSidebarForm();
    }

    public showSidebarForm(formAction: FormAction): void {
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
    }

    public submitForm(task: ITask): void {
        switch (this.formAction) {
            case 'create':
                task.id = Date.now();
                task.date = Date.now();

                this.apiService
                    .createTask(task)
                    .then(() => {
                        this.tasks.push(task);
                    });
                break;
            case 'update':
                const index = this.tasks.findIndex((item: ITask) => item.id === task.id);

                this.apiService
                    .updateTask(task.id, task)
                    .then(() => {
                        this.tasks.splice(index, 1, task);
                    });

            default:
        }

        this.hideSidebarForm();
    }

    public removeTask(task: ITask) {
        const index = this.tasks.findIndex((item: ITask) => item.id === task.id);

        if (index < 0 || !window.confirm("Are you sure you want to remove the task " + this.taskLabel + task.id + "?")) {
            return;
        }

        this.apiService
            .removeTask(task.id)
            .then(() => {
                this.tasks.splice(index, 1);
                this.showPreviewForItem = false;
                this.itemToPreview = null;
            });
    }
}

export const appComponent = {
    bindings: {},
    controller: AppComponent,
    template: appTemplate
};
