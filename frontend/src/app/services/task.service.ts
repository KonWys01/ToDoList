import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Task} from "../models/task.model";
import {ConfigService} from "./config.service";


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, public config: ConfigService) {
  }

}
