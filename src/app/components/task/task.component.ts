import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnChanges {

  @Input() task: Task;
  @Input() selected: boolean = false;
  @Input() unselectTrigger = false;

  @Output() updateTask = new EventEmitter<Task>()
  @Output() removeTask = new EventEmitter();
  @Output() toggleSelect = new EventEmitter()

  collapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.unselectTrigger) {
      this.selected = false;
    }
  }

  toggleShowFormEdit() {
    this.collapsed = !this.collapsed;
  }

  onUpdateTask(task: Task) {
    this.task = { ...this.task, ...task };
    this.updateTask.emit(this.task);
  }

  onRemoveTask() {
    this.removeTask.emit();
  }

  onToggleSelect() {
    this.selected = !this.selected;
    this.toggleSelect.emit();
  }

}
