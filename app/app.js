var app = angular.module('todoApp', []);

app.controller('todoAppController', ['$scope', 'ApiService', TodoAppController]);

function Task(id, summary, description, date, status) {
    this.id = id;
    this.summary = summary;
    this.description = description;
    this.date = date;
    this.status = status;
}

function TodoAppController($scope, apiService) {
    $scope.taskLabel = 'SSW'; //SoftServe Workshop
    $scope.tasks = [];
    $scope.statuses = ['todo', 'doing', 'done'];
    $scope.showPreviewForItem = false;
    $scope.sidebarExtended = false;
    $scope.formAction = ''; // 'create' | 'update'
    $scope.itemToPreview = null;
    $scope.formTask = null;

    apiService
        .getAllTasks()
        .then(function (tasks) {
            $scope.tasks = tasks;
        });

    $scope.getTasksByStatus = function(status) {
        return $scope.tasks.filter(function (task) {
            return task.status === status;
        })
    };

    $scope.showPreview = function(task) {
        $scope.showPreviewForItem = true;
        $scope.itemToPreview = task;
        $scope.sidebarExtended = false;
    };

    $scope.submitForm = function (task) {
        switch ($scope.formAction) {
            case 'create':
               task.id = Date.now();
               apiService
                   .createTask(task)
                   .then(function (res) {
                       $scope.tasks.push(task);
                   });
               break;
            case 'update':
                var index = $scope.tasks.findIndex(function (item) {
                    return item.id === task.id;
                });

                apiService
                    .updateTask(task.id, task)
                    .then(function (response) {
                        $scope.tasks.splice(index, 1, task);
                    });

            default:
        }

        $scope.hideSidebarForm();
    };

    $scope.removeTask = function (task) {
        var index = $scope.tasks.indexOf(task);

        if (!index < 0 || !window.confirm("Are you sure you want to remove the task " + $scope.taskLabel + task.id + "?")) {
            return;
        }

        apiService
            .removeTask(task.id)
            .then(function (response) {
                $scope.tasks.splice(index, 1);
                $scope.showPreviewForItem = false;
                $scope.itemToPreview = null;
            });
    };

    $scope.cancelForm = function () {
        this.hideSidebarForm();
    };

    $scope.getDateFromTimestamp = function(timestamp, locale) {
        return locale ? (new Date(timestamp)).toLocaleString() : new Date(timestamp);
    };

    $scope.showSidebarForm = function (formAction) {
        $scope.sidebarExtended = true;
        $scope.showPreviewForItem = false;
        $scope.formAction = formAction;

        switch (formAction) {
            case 'create':
                $scope.formTask = new Task(null, '', '', Date.now(), 'todo');
                break;
            case 'update':
                $scope.formTask = angular.copy($scope.itemToPreview);
                break;
        }
    };

    $scope.getRemainingStatuses = function (currentStatus) {
        var remainingStatuses = [];

        $scope.statuses.forEach(function (status) {
            if (status !== currentStatus) {
                remainingStatuses.push(status);
            }
        });

        return remainingStatuses;
    };

    $scope.moveTask = function (task, newStatus) {
        var index = $scope.tasks.indexOf(task);
        var updated = angular.copy(task);

        updated.status = newStatus;

        apiService
            .updateTask(task.id, updated)
            .then(function (response) {
                $scope.tasks[index].status = newStatus;
            });
    };

    $scope.hideSidebarForm = function () {
        $scope.sidebarExtended = false;
    }
}