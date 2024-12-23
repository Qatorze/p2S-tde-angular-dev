import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  private apiBaseUrl: string = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) {}

  changePassword$(
    email: string,
    oldPassword: string,
    newPassword: string,
    csrfToken: string
  ): Observable<any> {
    // Cambiato da Observable<string> a Observable<any>
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken, // Passa il CSRF token come header
    });

    const body = {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    return this.http
      .post<any>(`${this.apiBaseUrl}/password-change`, body, { headers })
      .pipe(
        catchError(this.handleError('changePassword')) // Gestione degli errori
      );
  }

  // Gestione errori
  private handleError(operation: string) {
    return (error: HttpErrorResponse) => {
      let errorMessage = `Errore durante l'operazione di ${operation}.`;

      if (error.status === 0) {
        errorMessage = 'Problema di connessione al server.';
      } else if (error.status === 400) {
        // Aggiungi logica per gestire errori personalizzati
        errorMessage =
          error.error?.error ||
          'Errore sconosciuto durante il cambio password.';
      } else if (error.status === 403) {
        errorMessage = error.error?.error || 'Token CSRF non valido';
      }

      return throwError(() => new Error(errorMessage));
    };
  }
}
