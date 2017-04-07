import IHttpService = ng.IHttpService;

export class ApiService {
  public static $inject = ["$http"];

  private apiUrl = 'http://localhost:8888/api';

  constructor (private $http: IHttpService){

  }

  public getAllTasks = function () {
    return this.$http.get(this.apiUrl + '/tasks').then((response: any) => {
      return this.extractData(response);
    });
  };

  public createTask = (task: ITask) => {
    return this.$http.post(this.apiUrl + '/tasks', task)
  };

  public removeTask = (id: number | string) =>  {
    return this.$http.delete(this.apiUrl + '/tasks/' + id);
  };

  public updateTask = (id: number | string, newTask: ITask) => {
    return this.$http.put(this.apiUrl + '/tasks/' + id, newTask);
  };

  private extractData(response) {
    return response.data.data;
  }
}
