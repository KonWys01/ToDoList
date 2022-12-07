import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public appConfig: any;
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
    this.loadAppConfig();
  }


  loadAppConfig() {
    return this.http.get('/assets/config.json').subscribe((response) => this.appConfig = response);
  }

  get apiBaseUrl(): string {
    return this.appConfig.api;
  }

  allUrls(): any {
    return this.appConfig;
  }
}
