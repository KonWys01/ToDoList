import {Component, ViewEncapsulation, AfterViewInit, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import {MatDialog} from '@angular/material/dialog';

import {ConfigService} from "../../services/config.service";
import {TaskService} from "../../services/task.service";
import {CategoryService} from "../../services/category.service";
import {Category} from "../../models/category.model";
import {TaskByCategory, Task, TaskOrder, TaskEdit} from "../../models/task.model";
import {TaskAddComponent} from "../task/task-add/task-add.component";


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryComponent implements AfterViewInit, OnInit {
  categories: any = {};
  categoryIDs: string[] = [];
  categoryNames: string[] = [];
  tasksByCategory: TaskByCategory[] = [];

  constructor(
    public config: ConfigService,
    private http: HttpClient,
    public taskService: TaskService,
    private categoryService: CategoryService,
    public dialog: MatDialog) {
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
      this.orderInsideCategory(event.container);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.orderInsideCategory(event.previousContainer);
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
      this.categoryIDs = this.categories.data.map((item: Category) => String(item.id));
      this.categoryNames = this.categories.data.map((item: Category) => item.name);
    })
  }

  orderInsideCategory(category: CdkDropList): void {
    const body: TaskOrder = this.makeOrderBody(category);
    this.taskService.orderTasks(body).subscribe();
  }

  orderOutsideCategory(category: CdkDropList): void {
    const body: TaskOrder = this.makeOrderBody(category);
    this.taskService.orderTasks(body).subscribe(_ => {
      this.loadTasks();
    });
  }

  makeOrderBody(category: CdkDropList): TaskOrder {
    const data = category.data;
    let ids: number[] = [];
    data.forEach((task: Task) => {
      ids.push(task.id)
    })

    return {
      category: Number(category.id),
      id: ids
    };
  }

  moveTask(task: Task, category: CdkDropList): void {
    let body: TaskEdit = {
      category: Number(category.id)
    }

    this.taskService.updateTask(task.id, body).subscribe(_ => {
      this.orderOutsideCategory(category)
    });
  }

  openAddDialog(): void {
    this.dialog.open(TaskAddComponent, {
      height: '400px',
      width: '600px',
      data: {
        categories: this.categories.data,
        categoryNames: this.categoryNames
      }
    });
  }

}
