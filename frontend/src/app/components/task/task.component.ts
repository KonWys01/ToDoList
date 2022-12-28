import {Component} from '@angular/core';
import {Input} from "@angular/core";

import {Task} from "../../models/task.model";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task: Task;
  @Input() done_category_id: number;

  constructor() {
  }
}
