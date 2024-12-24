import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  private apiBaseUrl: string = environment.apiUrl + '/auth';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  changePassword$(
    email: string,
    oldPassword: string,
    newPassword: string
  ): Observable<any> {
    // Recupera il token CSRF dai cookie
    const csrfToken = this.cookieService.get('p2s_tde_csrf_token');

    // Se il CSRF Token è mancante, gestisci l'errore
    if (!csrfToken) {
      return throwError(() => new Error('CSRF token missing.'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken, // Invia il CSRF token
    });

    const body = {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    return this.http
      .post<any>(`${this.apiBaseUrl}/password-change`, body, { headers })
      .pipe(catchError(this.handleError('changePassword')));
  }

  // Gestione errori
  private handleError(operation: string) {
    return (error: HttpErrorResponse) => {
      let errorMessage = `Errore durante l'operazione di ${operation}.`;

      console.error('Error Response:', error);

      if (error.status === 0) {
        errorMessage = 'Problema di connessione al server.';
      } else if (error.status === 400) {
        // Aggiungi logica per gestire errori personalizzati
        errorMessage =
          error.error?.error ||
          'Errore sconosciuto durante il cambio password.';
      } else if (error.status === 403) {
        errorMessage = error.error?.error || 'Token CSRF o JWT non valido';
      }

      console.error('Error Message:', errorMessage);
      return throwError(() => new Error(errorMessage));
    };
  }
}
