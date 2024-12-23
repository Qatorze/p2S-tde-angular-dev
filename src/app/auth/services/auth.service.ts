import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
// Interfaces
import { UserInterface } from '../../shared/interfaces/user.interface';
import { RegisterRequestInterface } from '../interfaces/register-request.interface';
import { LoginRequestInterface } from '../interfaces/login-request.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiBaseUrl: string = environment.apiUrl + '/auth';

  public user$: BehaviorSubject<UserInterface | null> =
    new BehaviorSubject<UserInterface | null>(null);

  constructor(private http: HttpClient) {
    this.restoreSession(); // Ripristina la sessione all'avvio
  }

  // Metodo per il login
  public login$(email: string, password: string): Observable<UserInterface> {
    const loginRequest: LoginRequestInterface = { email, password };
    return this.http
      .post<UserInterface>(`${this.apiBaseUrl}/login`, loginRequest, {
        withCredentials: true, // Necessario per inviare i cookie HttpOnly
      })
      .pipe(
        tap((user) => {
          // Aggiorna il BehaviorSubject con i dati dell'utente
          this.user$.next(user);

          // Salva i dati dell'utente in sessionStorage
          sessionStorage.setItem('user', JSON.stringify(user));
        }),
        catchError(this.handleError('login'))
      );
  }

  // Metodo per la registrazione di un nuovo utente
  public register$(
    surname: string,
    name: string,
    email: string,
    password: string
  ): Observable<UserInterface> {
    const registerRequest: RegisterRequestInterface = {
      surname,
      name,
      email,
      password,
    };

    return this.http
      .post<UserInterface>(`${this.apiBaseUrl}/register`, registerRequest, {
        withCredentials: true, // Necessario per inviare i cookie HttpOnly
      })
      .pipe(
        tap((user) => {
          // Aggiorna il BehaviorSubject con i dati dell'utente
          this.user$.next(user);

          // Salva i dati dell'utente in sessionStorage
          sessionStorage.setItem('user', JSON.stringify(user));
        }),
        catchError(this.handleError('register'))
      );
  }

  // Metodo per effettuare il logout
  public logout(): void {
    this.user$.next(null); // Rimuove l'utente dalla sessione
    sessionStorage.removeItem('user'); // Rimuovi i dati dell'utente da sessionStorage
  }

  // Metodo per verificare se l'utente è autenticato
  public isAuthenticated(): boolean {
    return !!this.user$.value; // Verifica se i dati dell'utente sono presenti nel BehaviorSubject
  }

  // Metodo per ripristinare la sessione
  private restoreSession(): void {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.user$.next(JSON.parse(user)); // Ripristina i dati dell'utente dal sessionStorage
    }
  }

  // Metodo per gestire gli errori durante le operazioni di login o registrazione
  private handleError(operation: string) {
    return (error: HttpErrorResponse) => {
      console.log(error.status);
      let errorMessage = `Errore durante la fase di ${operation}.`;

      if (error.status === 0) {
        errorMessage = 'Problema di connessione al server.';
      } else if (error.status === 401) {
        errorMessage =
          operation === 'login'
            ? 'Email e/o password non validi.'
            : "L'email inserita è già associata a un account.";
      } else if (error.status >= 400 && error.status < 500) {
        errorMessage = `Errore client: ${error.message}`;
      } else if (error.status >= 500) {
        errorMessage = `Errore server: ${error.message}`;
      }

      // Verifica se la risposta contiene un corpo che non può essere parsato come JSON
      if (error.error instanceof Blob) {
        errorMessage =
          'Errore nella risposta dal server. La risposta non è un JSON valido.';
      }

      return throwError(() => new Error(errorMessage));
    };
  }

  // Metodo per il reset della password
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>(
      'http://localhost:8082/api/password-reset/reset',
      {
        token,
        newPassword,
      }
    );
  }

  public requestPasswordReset$(email: string): Observable<any> {
    const payload = { email };
    return this.http
      .post<any>(
        'http://localhost:8082/api/password-reset/request',
        payload,
        { responseType: 'json' } // Mantieni la risposta come JSON
      )
      .pipe(catchError(this.handleError('requestPasswordReset')));
  }

  /** Getters per accedere ai dati dell'utente */
  public getUserId(): number | null {
    return this.user$.value ? Number(this.user$.value.id) : null;
  }

  public getUserSurname(): string | null | undefined {
    return this.user$.value ? this.user$.value.surname : null;
  }

  public getUserName(): string | null | undefined {
    return this.user$.value ? this.user$.value.name : null;
  }

  public getUserRole(): string | null | undefined {
    return this.user$.value ? this.user$.value.role : null;
  }

  public getUserEmail(): string | null | undefined {
    return this.user$.value ? this.user$.value.email : null;
  }
}
