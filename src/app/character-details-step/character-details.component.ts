import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from '../common/components/loader/loader.component';
import { CharacterInfo } from '../common/models';
import { StorageService } from '../common/services/storage.service';
import { SwapiService } from '../common/services/swapi.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  character: CharacterInfo;
  characterFilms: any;
  ascending = true;
  isFavoriteCharacter = false;

  @ViewChild('characterLoader', { static: true })
  characterLoader: LoaderComponent;

  constructor(
    protected swapiService: SwapiService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getCharacterInfo(params.characterIDUrl);
    });
  }

  async getCharacterInfo(characterIDUrl) {
    try {
      this.characterLoader.show();
      this.character = await this.swapiService.getSWCharacter(characterIDUrl);
      this.character.homeworld = await this.swapiService.getCharactersHomeworld(this.character.homeworld);
      this.getCharacterFilmsInfo(this.character.films);
      this.checkIfFavorite();
    } catch (error) {
      this.characterLoader.hide();
      console.error('Error getting Star Wars character!');
    }
  }

  async getCharacterFilmsInfo(characterFilmIDUrls) {
    const promises: Promise<any>[] = [];
    characterFilmIDUrls.forEach(filmIDUrl => {
      promises.push(this.swapiService.getSWFilm(filmIDUrl));
    });

    try {
      this.characterFilms = await Promise.all(promises);
    } catch (error) {
      this.characterLoader.hide();
      console.error('Error getting Characters films!');
    }
    this.characterLoader.hide();
  }

  checkIfFavorite() {
    // Since there is no some unique ID in the API, I'm using url like some kind of unique identifier
    this.isFavoriteCharacter = this.storageService.get('favoriteCharacters') &&
      !!this.storageService.get('favoriteCharacters').find(character => character.url === this.character.url);
  }

  makeFavorite() {
    // It would be best to have some kind of API that will handle user and user's favorite characters
    const favoriteCharacters = this.storageService.get('favoriteCharacters') || [];
    favoriteCharacters.push(this.character);
    this.storageService.set('favoriteCharacters', favoriteCharacters);
    this.isFavoriteCharacter = true;
  }

  navigateToFilmDetails(film) {
    this.router.navigate(['/film-details'], {
      queryParams: {
        filmIDUrl: film.url
      }
    });
  }
}
