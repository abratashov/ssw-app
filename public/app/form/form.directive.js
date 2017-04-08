(function () {
    "use strict";

    angular
        .module('todoApp')
        .directive('todoForm', TodoFormDirective);


    function TodoFormDirective() {
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
            templateUrl: 'app/form/form.directive.html'
        }
    }

    function TodoFormController() {

    }
}());