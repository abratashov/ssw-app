var app = angular.module('todoApp', []);

app.controller('todoAppController', ['ApiService', TodoAppController]);

function Task(id, summary, description, date, status) {
    this.id = id;
    this.summary = summary;
    this.description = description;
    this.date = date;
    this.status = status;
}

function TodoAppController(apiService) {
    var vm = this;
    
    vm.taskLabel = 'SSW'; //SoftServe Workshop
    vm.tasks = [];
    vm.statuses = ['todo', 'doing', 'done'];
    vm.showPreviewForItem = false;
    vm.sidebarExtended = false;
    vm.formAction = ''; // 'create' | 'update'
    vm.itemToPreview = null;
    vm.formTask = null;

    apiService
        .getAllTasks()
        .then(function (tasks) {
            vm.tasks = tasks;
        });

    vm.getTasksByStatus = function(status) {
        return vm.tasks.filter(function (task) {
            return task.status === status;
        })
    };

    vm.showPreview = function(task) {
        vm.showPreviewForItem = true;
        vm.itemToPreview = task;
        vm.sidebarExtended = false;
    };

    vm.submitForm = function (task) {
        switch (vm.formAction) {
            case 'create':
               task.id = Date.now();
               apiService
                   .createTask(task)
                   .then(function (res) {
                       vm.tasks.push(task);
                   });
               break;
            case 'update':
                var index = vm.tasks.findIndex(function (item) {
                    return item.id === task.id;
                });

                apiService
                    .updateTask(task.id, task)
                    .then(function (response) {
                        vm.tasks.splice(index, 1, task);
                    });

            default:
        }

        vm.hideSidebarForm();
    };

    vm.removeTask = function (task) {
        var index = vm.tasks.indexOf(task);

        if (!index < 0 || !window.confirm("Are you sure you want to remove the task " + vm.taskLabel + task.id + "?")) {
            return;
        }

        apiService
            .removeTask(task.id)
            .then(function (response) {
                vm.tasks.splice(index, 1);
                vm.showPreviewForItem = false;
                vm.itemToPreview = null;
            });
    };

    vm.cancelForm = function () {
        this.hideSidebarForm();
    };

    vm.getDateFromTimestamp = function(timestamp, locale) {
        return locale ? (new Date(timestamp)).toLocaleString() : new Date(timestamp);
    };

    vm.showSidebarForm = function (formAction) {
        vm.sidebarExtended = true;
        vm.showPreviewForItem = false;
        vm.formAction = formAction;

        switch (formAction) {
            case 'create':
                vm.formTask = new Task(null, '', '', Date.now(), 'todo');
                break;
            case 'update':
                vm.formTask = angular.copy(vm.itemToPreview);
                break;
        }
    };

    vm.getRemainingStatuses = function (currentStatus) {
        var remainingStatuses = [];

        vm.statuses.forEach(function (status) {
            if (status !== currentStatus) {
                remainingStatuses.push(status);
            }
        });

        return remainingStatuses;
    };

    vm.moveTask = function (task, newStatus) {
        var index = vm.tasks.indexOf(task);
        var updated = angular.copy(task);

        updated.status = newStatus;

        apiService
            .updateTask(task.id, updated)
            .then(function (response) {
                vm.tasks[index].status = newStatus;
            });
    };

    vm.hideSidebarForm = function () {
        vm.sidebarExtended = false;
    }
}