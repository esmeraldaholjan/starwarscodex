import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterInfo } from '../common/models';
import { StorageService } from '../common/services/storage.service';

@Component({
  selector: 'app-favorite-characters',
  templateUrl: './favorite-characters.component.html',
  styleUrls: ['./favorite-characters.component.scss']
})
export class FavoriteCharactersComponent implements OnInit {
  favoriteCharacters: CharacterInfo[];

  constructor(
    protected storageService: StorageService,
    protected router: Router
  ) { }

  ngOnInit(): void {
    this.favoriteCharacters = this.storageService.get('favoriteCharacters') || [];
  }

  navigateToCharacterDetails(character) {
    this.router.navigate(['/character-details'], {
      queryParams: {
        characterIDUrl: character.url
      }
    });
  }

}
