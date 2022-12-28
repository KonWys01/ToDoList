import {Component, ViewEncapsulation, AfterViewInit, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import {ConfigService} from "../../services/config.service";
import {TaskService} from "../../services/task.service";
import {CategoryService} from "../../services/category.service";
import {Category} from "../../models/category.model";
import {TaskByCategory, Task, TaskOrder, TaskEdit} from "../../models/task.model";


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryComponent implements AfterViewInit, OnInit {
  categories: any = {};
  categoryIDs: string[] = [];
  tasksByCategory: TaskByCategory[] = [];

  constructor(
    public config: ConfigService,
    private http: HttpClient,
    public taskService: TaskService,
    private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.loadCategories();
  }

  ngAfterViewInit(): void {
    this.loadTasks();
  }

  drop2(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.orderInGivenCategory(event.container);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.orderInGivenCategory(event.previousContainer);
      this.moveTask(event.container.data[event.currentIndex], event.container);
    }
  }

  loadTasks(): void {
    this.taskService.getTasksByCategory().subscribe((tasks) => {
      this.tasksByCategory = tasks.data;
    })
  }

  getCorrectTasksFromCategories(category_id: string) {
    return this.tasksByCategory.filter((item) => item.id === Number(category_id))[0]?.tasks;
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.categoryIDs = this.categories.data.map((item: Category) => String(item.id))
    })
  }

  orderInGivenCategory(category: CdkDropList): void {
    const data = category.data;
    let ids: number[] = [];
    data.forEach((task: Task) => {
      ids.push(task.id)
    })

    let body: TaskOrder = {
      category: Number(category.id),
      id: ids
    };

    this.taskService.orderTasks(body).subscribe();
  }

  moveTask(task: Task, category: CdkDropList): void {
    let body: TaskEdit = {
      category: Number(category.id)
    }

    this.taskService.updateTask(task.id, body).subscribe(_ => {
      this.orderInGivenCategory(category)
    });
  }

}
