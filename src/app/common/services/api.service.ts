import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

export abstract class ApiService {
    constructor(protected http: HttpClient) { }

    private formatErrors(error: any) {
        return throwError(error.error);
    }

    private addDefaultOptions(opts: any): void {
        opts.headers = opts.headers || new HttpHeaders();
        opts.headers = opts.headers.append('Accept-Language', 'en-US');
        if (!opts.headers.has('Content-Type')) {
            opts.headers = opts.headers.append('Content-Type', 'application/json');
        }
        if (!opts.headers.has('Accept')) {
            opts.headers = opts.headers.append('Accept', 'application/json');
        }
    }

    // tslint:disable-next-line:ban-types
    protected get<T>(path: string, opts: Object = {}): Observable<T> {
        this.addDefaultOptions(opts);

        return this.http
            .get<T>(`${path}`, opts)
            .pipe(catchError(this.formatErrors));
    }

    protected put<T>(
        path: string,
        // tslint:disable-next-line:ban-types
        body: Object = {},
        // tslint:disable-next-line:ban-types
        opts: Object = {}
    ): Observable<T> {
        this.addDefaultOptions(opts);

        return this.http
            .put<T>(`${path}`, JSON.stringify(body), opts)
            .pipe(catchError(this.formatErrors));
    }

    protected post<T>(
        path: string,
        // tslint:disable-next-line:ban-types
        body: Object = {},
        // tslint:disable-next-line:ban-types
        opts: Object = {}
    ): Observable<T> {
        this.addDefaultOptions(opts);

        return this.http
            .post<T>(`${path}`, JSON.stringify(body), opts)
            .pipe(catchError(this.formatErrors));
    }

    // tslint:disable-next-line:ban-types
    protected delete<T>(path: string, opts: Object = {}): Observable<T> {
        this.addDefaultOptions(opts);

        return this.http
            .delete<T>(`${path}`, opts)
            .pipe(catchError(this.formatErrors));
    }
}
