import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  PriorityEnum,
  PriorityEnumLabel,
} from 'src/app/constants/priority.enum';
import { SelectItem } from 'src/app/models/select-item.model';
import { whiteSpaceValidator } from 'src/app/validators/white-space.validator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task;
  formGroup: FormGroup;
  priorities: SelectItem[];
  isFormEdit = false;
  bsDateConfig = environment.bsDateConfig;
  minDueDate = new Date();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.initPrioritySelectItems();
  }

  initForm() {
    this.formGroup = this.fb.group({
      title: ['', whiteSpaceValidator],
      description: [''],
      dueDate: [new Date()],
      priority: [PriorityEnum.NORMAL],
    });

    if (this.task) {
      this.isFormEdit = true;
      this.formGroup.patchValue(this.task);
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
}
