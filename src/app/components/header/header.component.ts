import headerTemplate from './header.component.html'

class HeaderComponent {
    public onAdd: () => void;
    public static $inject = [];

    public addNewTask(): void {
        this.onAdd();
    }
}

export const headerComponent = {
    bindings: {
        onAdd: "&"
    },
    controller: HeaderComponent,
    template: headerTemplate
};
