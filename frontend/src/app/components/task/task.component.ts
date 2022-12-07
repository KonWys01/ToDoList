import {Component} from '@angular/core';
import {Input} from "@angular/core";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task: any;

  constructor() {
  }
}
