import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from "rxjs";

import {Task} from "../models/task.model";
import {ConfigService} from "./config.service";


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, public config: ConfigService) {
  }

  getTasksByCategory(): Observable<any> {
    return this.http.get(this.config.appConfig.api + this.config.appConfig.all)
  }
}