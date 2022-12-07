import {Component, ViewEncapsulation} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import {ConfigService} from "../../services/config.service";


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryComponent {
  testData_to_do = {
    "data": [
      {
        "id": 1,
        "name": "Test Task",
        "status": "To Do"
      },
      {
        "id": 2,
        "name": "Test Task v2",
        "status": "To Do v2"
      },
      {
        "id": 1,
        "name": "Test Task v3",
        "status": "To Do v3"
      },
      {
        "id": 1,
        "name": "Test Task v4",
        "status": "To Do v4"
      },
      {
        "id": 1,
        "name": "Test Task v5",
        "status": "To Do v5"
      },
    ]
  }
  testData_done = {
    "data": [
      {
        "id": 4,
        "name": "Test Task v4",
        "status": "To Do v4"
      },
    ]
  }

  constructor(public config: ConfigService, private http: HttpClient) {
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

  getTasks(): void {
    console.log(this.config.appConfig.api + this.config.appConfig.tasks);
    console.log(this.http.get(this.config.appConfig.api + this.config.appConfig.tasks).subscribe(data => {
      console.log(data);
    }))
  }
}
