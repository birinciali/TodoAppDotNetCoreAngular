import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Todo } from './models/Todo';
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root" //global olması için
})
export class TodoListService {
  constructor(private httpClient: HttpClient,
    private router:Router) {}

  path="http://localhost:49846/api/";

  getTodos(): Observable<Todo[]>
  {
    return this.httpClient.get<Todo[]>(this.path + "todos");
  }

  //todo:Todo
  addTodo(todo)
  {
    console.log(todo)
    return this.httpClient.post(this.path +"todos" , {text:todo.text, state:todo.state})
  }

  updateTodo(obj)
  {
    console.log(obj)
    return this.httpClient.put(this.path+"todos", obj)
  }

  deleteTodo(id)
  {
    console.log(id)
    return this.httpClient.delete(this.path+"todos/" + id)
  }
}


