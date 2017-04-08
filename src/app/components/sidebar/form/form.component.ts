import formTemplate from './form.component.html';

class FormComponent {
    public static $inject = [];

    public formItem: ITask;
    public action: FormAction;

    public onCancel: () => void;
    public onSave: (task: {task: ITask}) => void;

    public saveForm(task: ITask): void {
        this.onSave({task});
    }

    public cancelForm(): void {
        this.onCancel();
    }
}

export const formComponent = {
    bindings: {
        item: "<",
        action: "<",
        onCancel: "&",
        onSave: "&"
    },
    controller: FormComponent,
    template: formTemplate
};
