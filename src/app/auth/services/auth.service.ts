import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
// Interfaces
import { UserInterface } from '../../shared/interfaces/user.interface';
import { RegisterRequestInterface } from '../interfaces/register-request.interface';
import { LoginRequestInterface } from '../interfaces/login-request.interface';
import { AuthTokenInterface } from '../../shared/interfaces/auth-token.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Utilise "apiUrl" qui se trouve dans le folder environments
  private apiBaseUrl: string = environment.apiUrl + '/auth';

  // Ici "null" est la valeur par defaut que je passe à mon "BehaviorSubject" car c'est obbligé de lui passer une valeur par defaut.
  private userToken$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  public user$: BehaviorSubject<UserInterface | null> =
    new BehaviorSubject<UserInterface | null>(null);

  constructor(private http: HttpClient) {
    const token = sessionStorage.getItem('WWA_JWToken');
    if (token) {
      this.userToken$.next(token);
      this.setToken(token); // Décodifie set le token
    }

    // Enregistre dans le BehaviourSubject les données du user en les décodificants depuis le token
    const user = this.getUserFromToken();
    if (user) {
      this.user$.next(user);
    }
  }

  /* Fonction pour sauvegarder le token dans la session storage. On utilise l'interface AuthTokenInterface
  pour gérer le tipo du token */
  public setToken(token: string): void {
    try {
      const decodedAuthTokenInterface = jwtDecode<AuthTokenInterface>(token);
      // Controlle se le role du user est "admin" ou "user"
      if (
        decodedAuthTokenInterface.role === 'admin' ||
        decodedAuthTokenInterface.role === 'user'
      ) {
        this.userToken$.next(token); // MAJ le BehaviorSubject du token
        sessionStorage.setItem('WWA_JWToken', token); // Enregistre le token dans la sessionStorage

        // MAJ les données du user à partir du Token
        const user = this.getUserFromToken();
        if (user) {
          this.user$.next(user); // MAJ le BehaviorSubject du user
        }
      } else {
        console.warn(`Ruole non autorisé: ${decodedAuthTokenInterface.role}`);
        this.logout(); // Rimuovi ogni traccia se il ruolo non è valido
      }
    } catch (error) {
      console.error('Erreur durant la décodification du Token:', error);
      this.logout(); // En cas de token invalide, effectue le logout
    }
  }

  // Methode pour obtenir les données du user en decodificant le token JWT
  private getUserFromToken(): UserInterface | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decodedAuthTokenInterface = jwtDecode<{
        id: number;
        email: string;
        role: string;
        surname: string;
        name: string;
        imagePath: string;
      }>(token);

      return {
        id: decodedAuthTokenInterface.id,
        email: decodedAuthTokenInterface.email,
        role: decodedAuthTokenInterface.role,
        surname: decodedAuthTokenInterface.surname || '',
        name: decodedAuthTokenInterface.name || '',
        password: '', // Vide, car le token ne contient pas la password du user
        imagePath: decodedAuthTokenInterface.imagePath || '',
      };
    } catch (error) {
      console.error('Erreur durant la décodification du Token:', error);
      return null;
    }
  }

  // Methode pour le Login
  public login$(
    email: string,
    password: string
  ): Observable<{ token: string }> {
    // Objet pour la requete de "login" qu'on envoie server. Constitue le body de le requete HTTP de type "post"
    const loginRequest: LoginRequestInterface = { email, password };

    /** "{ withCredentials: true }" pour permettre l'envoie des cookies tra il frontend e le backend */
    return this.http
      .post<{ token: string }>(`${this.apiBaseUrl}/login`, loginRequest, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          // Set le token e decodifit les données reçuent du back-end à travers le token
          this.setToken(response.token);
        }),
        catchError(this.handleError('login'))
      );
  }

  // Methode pour l'enregistrement d'un nouveau user
  public register$(
    surname: string,
    name: string,
    email: string,
    password: string
  ): Observable<UserInterface> {
    // Objet pour la requete de "registrazione" qu'on envoie server. Constitue le body de le requete HTTP de type "post"
    const registerRequest: RegisterRequestInterface = {
      surname,
      name,
      email,
      password,
    };

    return this.http
      .post<UserInterface>(`${this.apiBaseUrl}/register`, registerRequest)
      .pipe(catchError(this.handleError('register')));
  }

  // Methode pour la gestion des erreurs des formulaires de login et registrer
  private handleError(operation: string) {
    return (error: HttpErrorResponse) => {
      let errorMessage = `Erreur durant la fase de ${operation}.`;
      if (error.status === 0) {
        errorMessage = 'Problème de connection au server.';
      } else if (error.status === 401) {
        errorMessage =
          operation === 'login'
            ? 'Email et/ou Password invalides'
            : "L'email inserée est dejà associée à un compte";
      }
      return throwError(() => new Error(errorMessage));
    };
  }

  // Nettoye les BehaviorSubjects "user$" et "userToken$" et la session storage
  public logout(): void {
    this.user$.next(null);
    this.userToken$.next(null);
    sessionStorage.removeItem('WWA_JWToken');
  }

  // Verifie si le user est connecté
  public isAuthenticated(): boolean {
    return !!this.userToken$.value;
  }

  /** Getters et Setters pour récupérer les données du user enregistrées dans la sessionStorage */
  // Obtenir le token token corrente
  public getToken(): string | null {
    return this.userToken$.value;
  }

  // Obtenir l'Id du user connecté
  public getUserId(): number | null {
    return this.user$.value ? Number(this.user$.value.id) : null;
  }

  // Obtenir le nom du user connecté
  public getUserSurname(): string | null | undefined {
    return this.user$.value ? this.user$.value.surname : null;
  }

  // Obtenir le prenom du user connecté
  public getUserName(): string | null | undefined {
    return this.user$.value ? this.user$.value.name : null;
  }

  // Obtenir le role du user connecté
  public getUserRole(): string | null | undefined {
    return this.user$.value ? this.user$.value.role : null;
  }

  // Obtenir l'email du user connecté
  public getUserEmail(): string | null | undefined {
    return this.user$.value ? this.user$.value.email : null;
  }
}
