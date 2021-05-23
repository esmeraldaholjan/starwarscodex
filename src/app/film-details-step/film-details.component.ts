import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from '../common/components/loader/loader.component';
import { CharacterInfo, FilmInfo } from '../common/models';
import { SwapiService } from '../common/services/swapi.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss']
})
export class FilmDetailsComponent implements OnInit {
  film: FilmInfo;
  characters: CharacterInfo[];
  ascending = true;

  @ViewChild('filmLoader', { static: true })
  filmLoader: LoaderComponent;

  constructor(
    protected swapiService: SwapiService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getFilmInfo(params.filmIDUrl);
    });
  }

  async getFilmInfo(filmIDUrl) {
    try {
      this.filmLoader.show();
      this.film = await this.swapiService.getSWFilm(filmIDUrl);
      this.getCharactersInfo(this.film.characters);
    } catch (error) {
      this.filmLoader.hide();
      console.error('Error getting Films!');
    }
  }

  async getCharactersInfo(charactersIDUrls) {
    const promises: Promise<any>[] = [];
    charactersIDUrls.forEach(characterIDUrl => {
      promises.push(this.swapiService.getSWCharacter(characterIDUrl));
    });

    try {
      this.characters = await Promise.all(promises);
    } catch (error) {
      this.filmLoader.hide();
      console.error('Error getting Characters!');
    }
    this.filmLoader.hide();
  }

  navigateToCharacterDetails(character) {
    this.router.navigate(['/character-details'], {
      queryParams: {
        characterIDUrl: character.url
      }
    });
  }

}
