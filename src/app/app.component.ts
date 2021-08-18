import { Component, OnInit } from '@angular/core';
import { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];

  constructor() { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    const savedTasks = localStorage.getItem('saved-tasks');
    this.tasks = JSON.parse(savedTasks) || [];
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

}
