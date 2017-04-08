class PreviewComponent {
    public static $inject = [];

    public item: ITask;
    public onRemove: (obj: {task: ITask}) => void;
    public onEdit: (task: {task: ITask}) => void;

    public getDateFromTimestamp(timestamp: number, locale?: boolean): string | Date {
        return locale ? (new Date(timestamp)).toLocaleString() : new Date(timestamp);
    }

    public removeTask(task: ITask): void {
        this.onRemove({task});
    }

    public editTask(): void {
        this.onEdit({task: this.item});
    }
}

export const previewComponent = {
    bindings: {
        item: "<",
        onRemove: "&",
        onEdit: "&"
    },
    controller: PreviewComponent,
    templateUrl: 'app/components/sidebar/preview/preview.component.html'
};
