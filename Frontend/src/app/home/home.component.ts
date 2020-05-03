import { Component, OnInit } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { Key } from "protractor";
import { Todo } from "../models/Todo";
import { TodoListService } from "../todoList.service";
import { doesNotThrow } from "assert";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  tarih = "06-11-2019";
  constructor(private todoService: TodoListService) {}

  todos: Todo[];

  count = 0;

  data = {
    pendings: [],

    inprogress: [],

    done: []
  };

  ngOnInit() {
    this.parseToDate();
    this.getTodos();
  }

  //tarih:number;
  cevirilecekTarih: string;
  deneme: String;
  date: Date = new Date();

  settings = {
    bigBanner: true,
    timePicker: false,
    format: "dd-MM-yyyy",
    defaultOpen: false
  };

  onDateSelect() {}

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      //console.log(event.currentIndex) //aynı yerde kaçıncı index oldugu
      //console.log(event.container.data) //dizin içindeki sıralama bilgisi
      //console.log(event.previousIndex)//aynı sırada daha önce kaçıncı index oldugu
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      //console.log(event.previousContainer.data) //nerden çekildiyse onun bilgisi
      //console.log(event.container.data) //nereye çekildiyse onun bilgisi
      //console.log(event.previousIndex)//geldiği yerde kaçıncı index oldugu
      //console.log(event.currentIndex) //gittiği yerde kaçıncı index oldugu
    }
    this.updateTodo();
  }

  sliced = "";

  parseToDate() {
    this.cevirilecekTarih = this.date.toString();
    this.sliced = this.cevirilecekTarih.slice(4, 15);
    //console.log(this.sliced);
  }

  getTodos() {
    this.todoService.getTodos().subscribe(
      res => {
        Object.keys(res).forEach(key => {
          this.data[key] = res[key];
          console.table(this.data[key])
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  getTodos2() {
    this.todoService.getTodos().subscribe(res => {
      console.log(res);
    });
  }

  //add2Todo.text=addTodoText.value
  //this.add2Todo = Object.assign({})
  // this.add2Todo{}
  //add2Todo:Todo

  addTodo(addTodoText) {
    var add2Todo = { state: 0, text: addTodoText.value };
    if (add2Todo.text != "") {
      this.todoService.addTodo(add2Todo).subscribe(
        res => {
          this.getTodos();
          addTodoText.value = "";
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  updateTodo() {
    this.todoService.updateTodo(this.data).subscribe(
      res => {
        this.getTodos();
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteTodo(id) {
    this.todoService.deleteTodo(id).subscribe(
      res => {
        console.log(res);
        this.getTodos();
      },
      err => {
        console.log(err);
      }
    );
    //console.log(id)
  }
}
