class TodoFormController {

}

export function todoFormDirective () {
    return {
        restrict: 'E',
        transclude: false,
        controller: TodoFormController,
        bindToController: {
            item: "=",
            action: "@",
            onCancel: "&",
            onSave: "&"
        },
        controllerAs: 'form',
        templateUrl: 'app/directives/form/form.directive.html'
    }
}