import {Component, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import {ConfigService} from "../../services/config.service";
import {TaskService} from "../../services/task.service";


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryComponent implements AfterViewInit {
  data_to_do: any = {};
  data_done: any = {};

  constructor(public config: ConfigService, private http: HttpClient, public taskService: TaskService) {
  }

  ngAfterViewInit(): void {
    this.loadTasks();
  }

  drop2(event: CdkDragDrop<{ id: number, name: string, status: string }[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  loadTasks(): void {
    this.taskService.getTasksByCategory(1).subscribe((tasks) => {
      this.data_to_do = tasks
    });
    this.taskService.getTasksByCategory(2).subscribe((tasks) => {
      this.data_done = tasks
    });
  }

}
