import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, public config: ConfigService) {
  }

  getCategories(): Observable<any> {
    return this.http.get(this.config.appConfig.api + this.config.appConfig.categories)
  }
}
