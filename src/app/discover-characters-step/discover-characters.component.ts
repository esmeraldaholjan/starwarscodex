import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { LoaderComponent } from '../common/components/loader/loader.component';
import { CharacterInfo } from '../common/models';
import { SwapiService } from '../common/services/swapi.service';

@Component({
  selector: 'app-discover-characters',
  templateUrl: './discover-characters.component.html',
  styleUrls: ['./discover-characters.component.scss']
})
export class DiscoverCharactersComponent implements OnInit {
  currentPageNumber = 1;
  ascending = true;
  characters: CharacterInfo[];
  filteredCharacters: CharacterInfo[];
  formGroup: FormGroup;
  sortType: string;

  characterNameFilterChange$: Subject<string> = new Subject<string>();
  observablesDispose$: Subject<void> = new Subject<void>();

  @ViewChild('characterTableLoader', { static: true })
  characterTableLoader: LoaderComponent;

  constructor(
    protected swapiService: SwapiService,
    protected formBuilder: FormBuilder,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.initializeSeacrhForm();
    this.populateSWCharacters(this.currentPageNumber);
    this.characterNameFilterSubscription();
  }

  initializeSeacrhForm(): void {
    this.formGroup = this.formBuilder.group({
      nameFilter: ['']
    });
  }

  async populateSWCharacters(currentPageNumber) {
    try {
      this.characterTableLoader.show();

      this.characters = this.filteredCharacters = await this.swapiService.getSWCharacters(currentPageNumber);
      this.updatePageState();
      this.updateTableState();

      this.characterTableLoader.hide();
    } catch (error) {
      this.characterTableLoader.hide();
      console.error('Error getting Star Wars characters occured!');
    }
  }

  onFilterChange(): void {
    this.characterNameFilterChange$.next(this.formGroup.controls.nameFilter.value);
  }

  characterNameFilterSubscription(): void {
    this.characterNameFilterChange$
      .pipe(takeUntil(this.observablesDispose$), debounceTime(100))
      .subscribe((value: string) => {
        this.filteredCharacters = this.characters.filter(
          character => character.name.toLocaleLowerCase().includes(value));
      });
  }

  getFilterValue() {
    return this.formGroup.controls.nameFilter.value;
  }

  onSort(sortType, isOnLoadSorting) {
    if (!isOnLoadSorting) {
      this.ascending = !this.ascending;
    }
    this.sortType = sortType;
    this.filteredCharacters = this.filteredCharacters.sort((character1, character2) =>
      this.ascending ?
        character1[sortType].localeCompare(character2[sortType]) :
        character2[sortType].localeCompare(character1[sortType])
    );
    this.changeDetectorRef.detectChanges();
  }

  updatePageState() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        sortAscending: this.ascending,
        sortType: this.sortType,
        filter: this.getFilterValue(),
      },
    });
  }

  updateTableState() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.sortType && params.sortAscending) {
        this.ascending = JSON.parse(params.sortAscending);
        this.sortType = params.sortType;
        this.onSort(this.sortType, true);
      }

      this.formGroup.controls.nameFilter.setValue(params.filter || '');
      this.onFilterChange();
    });
  }

  navigateToCharacter(character) {
    this.router.navigate(['/character-details'], {
      queryParams: {
        characterIDUrl: character.url
      }
    });
  }
}
