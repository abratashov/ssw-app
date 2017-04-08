class SidebarComponent {
    public static $inject = [];

    public item: ITask;
    public action: FormAction;
    public extended: boolean;
    public preview: boolean;

    public onRemove: (obj: {task: ITask}) => void;
    public onCancel: () => void;
    public onSave: (obj: {task: ITask}) => void;
    public onEdit: (task: {task: ITask}) => void;

    public removeTask(task: ITask): void {
        this.onRemove({task});
    }

    public cancelForm(): void {
        this.onCancel();
    }

    public saveForm(task: ITask): void {
        this.onSave({task});
    }

    public editTask(): void {
        this.onEdit({task: this.item});
    }
}

export const sidebarComponent = {
    bindings: {
        previewItem: "<",
        formItem: "<",
        action: "<",
        extended: "<",
        preview: "<",
        onRemove: "&",
        onCancel: "&",
        onSave: "&",
        onEdit: "&"
    },
    controller: SidebarComponent,
    templateUrl: 'app/components/sidebar/sidebar.component.html'
};
