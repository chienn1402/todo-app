import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() tasks: Task[] = [];

  query = '';
  selectedIndexes = [];
  unselectTrigger = false;

  @HostListener('window:beforeunload')
  saveTasksToLocalStorage() {
    localStorage.setItem('saved-tasks', JSON.stringify(this.tasks));
  }

  constructor() {}

  ngOnInit(): void {}

  onUpdateTask(task: Task, index: number) {
    this.tasks.splice(index, 1, task);
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
    if (this.selectedIndexes.includes(index)) {
      this.selectedIndexes = this.selectedIndexes.filter((selectedIndex) => selectedIndex !== index);
    }
  }

  onToggleSelect(index: number) {
    if (this.selectedIndexes.includes(index)) {
      this.selectedIndexes = this.selectedIndexes.filter((selectedIndex) => selectedIndex !== index);
      return;
    }

    this.selectedIndexes.push(index);
  }

  onSearchChange(query: string) {
    this.query = query;
  }

  bulkDoneAction() {
    this.tasks.forEach((task, index) => {
      if (this.selectedIndexes.includes(index))  {
        task.isCompleted = true;
      }
    });
    this.selectedIndexes = [];
    this.unselectTrigger = !this.unselectTrigger;
  }

  bulkRemoveAction() {
    this.tasks = this.tasks.filter((task, index) => !this.selectedIndexes.includes(index));
    this.selectedIndexes = [];
  }
}
