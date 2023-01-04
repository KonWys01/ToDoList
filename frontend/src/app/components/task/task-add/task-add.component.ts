import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms'
import {Inject} from '@angular/core';
import {ViewEncapsulation} from "@angular/core";

import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Category, MatDataCategory} from "../../../models/category.model";


@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskAddComponent {
  form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl()
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MatDataCategory,
  ) {
  }

  test(): void {
    console.log(this.data)
    console.log(this.data)
  }
}
