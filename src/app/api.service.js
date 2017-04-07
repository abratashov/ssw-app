(function () {
    "use strict";
    
    angular
        .module('todoApp')
        .service('ApiService', ["$http", ApiService]);

    function ApiService($http) {
        this.apiUrl = 'http://localhost:8888/api';

        this.getAllTasks = function () {
            return $http.get(this.apiUrl + '/tasks').then(function (response) {
                return extractData(response);
            });
        };

        this.createTask = function (task) {
            return $http.post(this.apiUrl + '/tasks', task)
        };

        this.removeTask = function (id) {
            return $http.delete(this.apiUrl + '/tasks/' + id);
        };

        this.updateTask = function (id, newTask) {
            return $http.put(this.apiUrl + '/tasks/' + id, newTask);
        };

        function extractData(response) {
            return response.data.data;
        }
    }
}());