import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterDetailsComponent } from './character-details-step/character-details.component';
import { DiscoverCharactersComponent } from './discover-characters-step/discover-characters.component';
import { FavoriteCharactersComponent } from './favorite-characters-step/favorite-characters.component';
import { FilmDetailsComponent } from './film-details-step/film-details.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/discover-characters',
    pathMatch: 'full'
  },
  {
    path: 'discover-characters',
    component: DiscoverCharactersComponent
  },
  {
    path: 'character-details',
    component: CharacterDetailsComponent
  },
  {
    path: 'favoriete-characters',
    component: FavoriteCharactersComponent
  },
  {
    path: 'film-details',
    component: FilmDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
