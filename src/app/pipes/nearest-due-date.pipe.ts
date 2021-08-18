import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'nearestDueDate',
  pure: false
})
export class NearestDueDatePipe implements PipeTransform {
  transform(tasks: Task[]): Task[] {
    return tasks.sort((task1, task2) => {
      return new Date(task1.dueDate).getTime() - new Date(task2.dueDate).getTime()
    });
  }
}
