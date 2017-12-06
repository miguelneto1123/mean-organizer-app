import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TasksService {

  constructor(private http: Http) { }

  getUserTasks(userId){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get('tasks/list/' + userId, {headers: headers}).
      map(res => res.json());
  }

  addTask(task){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('tasks/create', task, {headers: headers}).
      map(res => res.json());
  }

  deleteTask(id){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('tasks/remove', id, {headers: headers}).
      map(res => res.json());
  }

}
