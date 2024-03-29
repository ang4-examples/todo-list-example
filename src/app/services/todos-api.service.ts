import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Todo} from '../models/todos/todo.model';
import {TodoMove} from '../models/todos/todo-move.model';


@Injectable()
export class TodosApiService {

  constructor(private http: Http) {
  }

  getTodos(params): Observable<Todo[]> {
    const filters = params.filters.join(',');
    const sorting = `${params.sorting.column},${params.sorting.direction}`;
    const urlParams = [
      filters.length > 0 ? `statuses=${filters}` : '',
      sorting.length > 0 ? `sort=${sorting}` : ''
    ];

    const url = '/api/todos?' + urlParams.filter(Boolean).join('&');

    return this.http.get(url)
      .map((resp: Response) => {
        return resp.json().response;
      });
  }

  saveTodo(todo: Todo): any {
    const url = '/api/todos';

    return this.http.post(url, todo)
      .map((resp: Response) => {
        return resp.json().response;
      });
  }

  deleteTodo(todo: Todo): any {
    const url = '/api/todos?id=' + todo.id;

    return this.http.delete(url)
      .map((resp: Response) => {
        return resp.json().response;
      });
  }

  moveTodo(todoMove: TodoMove): any {
    const url = '/api/move-todo';

    return this.http.post(url, todoMove)
      .map((resp: Response) => {
        return resp.json().response;
      });
  }
}
