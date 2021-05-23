import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from './common/common.module';
import { TranslateModule } from '@ngx-translate/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DiscoverCharactersComponent } from './discover-characters-step/discover-characters.component';
import { CharacterDetailsComponent } from './character-details-step/character-details.component';
import { FavoriteCharactersComponent } from './favorite-characters-step/favorite-characters.component';
import { FilmDetailsComponent } from './film-details-step/film-details.component';

@NgModule({
  declarations: [
    AppComponent,
    DiscoverCharactersComponent,
    CharacterDetailsComponent,
    FavoriteCharactersComponent,
    FilmDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot(),
    CommonModule,
    NgbModule,
    NgbAlertModule
  ],
  exports: [TranslateModule],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
