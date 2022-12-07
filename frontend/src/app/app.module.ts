import {NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {MatButtonModule} from "@angular/material/button";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CategoryComponent} from './components/category/category.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {TaskComponent} from './components/task/task.component';
import {HttpClientModule} from "@angular/common/http";
import {ConfigService} from "./services/config.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    DragDropModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: (configService: ConfigService) => () => configService.loadAppConfig()
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
