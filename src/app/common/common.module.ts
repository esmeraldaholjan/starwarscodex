import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { SwapiService } from './services/swapi.service';
import { LoaderComponent } from './components/loader/loader.component';
import { StorageService } from './services/storage.service';

@NgModule({
  imports: [
    AngularCommonModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TranslateModule
  ],
  exports: [
    AngularCommonModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TranslateModule,
    HeaderComponent,
    LoaderComponent
  ],
  declarations: [
    HeaderComponent,
    LoaderComponent
  ],
  providers: [
    SwapiService,
    StorageService
  ],
})
export class CommonModule {}
