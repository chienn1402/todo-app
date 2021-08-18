import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'searchBy'
})
export class SearchByPipe implements PipeTransform {

  transform(tasks: Task[], query: string): Task[] {
    if (!query) {
      return tasks;
    }
    return tasks.filter((task) => task.title.toLowerCase().includes(query.toLowerCase()));
  }

}
