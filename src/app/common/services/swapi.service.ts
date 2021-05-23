import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CharacterInfo, FilmInfo } from '../models';
import { ApiService } from './api.service';

@Injectable()
export class SwapiService extends ApiService {
    constructor(protected http: HttpClient) {
        super(http);
    }

    getSWCharacters(
        pageNumber: number
    ) {
        const url =
            environment.swapiBaseUrl + `people/?page=${pageNumber}`;

        return this.get(url).pipe(
            map((response: any) =>
                response.results.map((character) => new CharacterInfo(character))
            ),
            catchError((error: any) =>
                throwError(
                    (error) || 'Unknown Server error'
                )
            )
        ).toPromise();
    }

    getSWCharacter(
        characterIDUrl: string
    ) {
        return this.get(characterIDUrl.replace(/^http/, 'https')).pipe(
            map((response: any) => {
                return new CharacterInfo(response);
            }),
            catchError((error: any) =>
                throwError(
                    (error) || 'Unknown Server error'
                )
            )
        ).toPromise();
    }

    getSWFilm(
        filmIDUrl: string
    ) {
        return this.get(filmIDUrl.replace(/^http/, 'https')).pipe(
            map((response: any) => {
                return new FilmInfo(response);
            }),
            catchError((error: any) =>
                throwError(
                    (error) || 'Unknown Server error'
                )
            )
        ).toPromise();
    }

    getCharactersHomeworld(
        characterHomeworldIDUrl: string
    ) {
        return this.get(characterHomeworldIDUrl.replace(/^http/, 'https')).pipe(
            map((response: any) => {
                return response.name;
            }),
            catchError((error: any) =>
                throwError(
                    (error) || 'Unknown Server error'
                )
            )
        ).toPromise();
    }
}
