import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  PriorityEnum,
  PriorityEnumLabel,
} from 'src/app/constants/priority.enum';
import { SelectItem } from 'src/app/models/select-item.model';
import { Task } from 'src/app/models/task.model';
import { whiteSpaceValidator } from 'src/app/validators/white-space.validator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task;

  @Output() addTask = new EventEmitter<Task>();
  @Output() updateTask = new EventEmitter();

  formGroup: FormGroup;
  priorities: SelectItem[];

  isFormEdit = false;
  bsDateConfig = environment.bsDateConfig;
  minDueDate = new Date();

  readonly DEFAULT_DUE_DATE = new Date();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.initPrioritySelectItems();
  }

  initForm() {
    this.formGroup = this.fb.group({
      title: ['', whiteSpaceValidator],
      description: [''],
      dueDate: [this.DEFAULT_DUE_DATE],
      priority: [PriorityEnum.NORMAL],
    });

    if (this.task) {
      this.isFormEdit = true;
      this.formGroup.patchValue({
        ...this.task,
        dueDate: new Date(this.task.dueDate)
      });
    }
  }

  initPrioritySelectItems() {
    this.priorities = Object.keys(PriorityEnum).map((key) => {
      return {
        value: PriorityEnum[key],
        label: PriorityEnumLabel[PriorityEnum[key]],
      };
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const formValue = this.formGroup.value;
    formValue.dueDate = this.formatDate(formValue.dueDate);
    if (!this.isFormEdit) {
      this.addTask.emit({ ...formValue, isCompleted: false });
      this.resetForm();
      return;
    }

    this.updateTask.emit(formValue);
  }

  resetForm() {
    this.formGroup.reset();
    this.formGroup.get('dueDate').setValue(this.DEFAULT_DUE_DATE);
    this.formGroup.get('priority').setValue(PriorityEnum.NORMAL);
  }

  formatDate(dateStr: string) {
    if (!dateStr || dateStr === 'Invalid Date') {
      return '';
    }

    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
}
